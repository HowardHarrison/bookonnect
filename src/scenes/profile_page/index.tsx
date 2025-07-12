import { X } from '@mui/icons-material';
import { Avatar, Box, Button, CircularProgress, Container, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography } from '@mui/material';
import Loading from 'components/common/Loading';
import UploadImage from 'components/image_cropper/UploadImage';
import NavBar from 'components/nav_bar/NavBar';
import { RootState } from 'main';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetSavedBooksQuery } from 'state/bookAPI';
import { useGetUserProfileQuery, useHandleSavedBookMutation, useUpdateUserMutation } from 'state/userApi';
import { BaseUrl } from 'types/Index';

const ProfilePage = () => {
  const [previewImage, setPreviewImage] = useState<string | null>("");
  const [image, setImage] = useState<File | null>(null);
  const [editImage, setEditImage] = useState(false);
  const maxBytes = 3145728;
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const { data: user, isLoading, error, refetch: refetchUserProfile } = useGetUserProfileQuery(userId ?? '', { skip: !userId });
  console.log('user', user);
  const [handleSavedBook] = useHandleSavedBookMutation();
  const [savedBookIds, setSavedBookIds] = useState<string[]>([]);
  const shouldFetch = Array.isArray(savedBookIds) && savedBookIds.length > 0;
  const { data: savedBooks, isLoading: booksLoading, refetch: refetchBooksByIds } = useGetSavedBooksQuery(savedBookIds,{skip: !shouldFetch});
  const [updateUser] = useUpdateUserMutation();
  useEffect(() => {
    if (user) {
      setFormValues({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '',
      });
      if (user?.savedBooks) {
        setSavedBookIds(user.savedBooks);
      }
      if (user.profileImage) {
        setPreviewImage(user.profileImage);
        setEditImage(true);
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleImageDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }, []);

  const cancelImage = () => {
    setImage(null);
    setPreviewImage("");
  };

  const reuploadImage = (file: File) => {
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', formValues.firstName);
    formData.append('lastName', formValues.lastName);
    formData.append('email', formValues.email);
    formData.append('password', formValues.password);
    if (image) formData.append('profileImage', image);

    try {
      await updateUser({ userId, data: formData }).unwrap();
      refetchUserProfile();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <Box>
      <NavBar />
      <Container maxWidth="lg">
        <Typography variant="h5" sx={{ mt: 10, mb: 2, fontSize: 20, textAlign: 'center' }}>
          Profile Details
        </Typography>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Typography color="error" textAlign="center">{error && `${error}`}</Typography>
        ) : (
          <>
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 2fr' },
                  gap: 4,
                  alignItems: 'flex-start',
                  backgroundColor: '#e6e6e6',
                  paddingX: 2,
                  borderRadius: 2
                }}
              >
                {/* Upload Image - Left */}
                <Box>
                  <UploadImage
                    label="Image"
                    maxSize={maxBytes}
                    accept={{ "image/*": [] }}
                    file={previewImage}
                    setImage={(file) => setImage(file)}
                    onDrop={handleImageDrop}
                    cancelImage={cancelImage}
                    aspectRatio={1 / 1}
                    reuploadImage={reuploadImage}
                    editImage={editImage}
                  />
                </Box>

                {/* Form Fields - Right */}
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    marginY: { md: '16px' }
                  }}
                >
                  {/* First Name */}
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />

                  {/* Last Name */}
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />

                  {/* Email */}
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />

                  {/* Password */}
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formValues.password}
                    onChange={handleChange}
                    fullWidth
                    required
                  />

                  {/* Submit Button (spans full row) */}
                  <Box sx={{ gridColumn: 'span 2' }}>
                    <Button type="submit" variant="contained" color="error" fullWidth sx={{ height: '45px' }}>
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography variant="h5" sx={{ mx: 2, mt: 3, fontSize: 20, textAlign: 'start' }}>
                Saved Books
              </Typography>
              <List>
                {Array.isArray(savedBooks) && savedBooks.length > 0 ? 
                savedBooks?.map((book) => {
                  const handleRemove = async (event: React.MouseEvent) => {
                    event.stopPropagation();
                    try {
                      await handleSavedBook({ userId: user?._id, bookId: book._id }).unwrap();
                      // Refetch profile, then update state
                      const result = await refetchUserProfile();
                      const updatedUser = result.data;
                      console.log('result', result);
                      console.log('updatedUser', updatedUser?.savedBooks);
                      // Update local savedBookIds
                      if (!updatedUser?.savedBooks || updatedUser.savedBooks.length === 0) {
                        setSavedBookIds([]);
                      } else {
                        setSavedBookIds(updatedUser.savedBooks);
                      }
                      await refetchBooksByIds();
                    } catch (err) {
                      console.error('Failed to remove saved book', err);
                    }
                  };

                  return (
                    <Box key={book._id}>
                      <ListItem key={book._id} secondaryAction={
                        <IconButton edge="end" onClick={handleRemove} sx={{ color: 'white', backgroundColor: '#ff2216', width: '30px', height: '30px', marginX: 1 }}>
                          X
                        </IconButton>
                      }
                        onClick={() => navigate(`/books/${book._id}`)}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#d7d7d7',
                          },
                        }}
                      >
                        {isLoading ? (
                          <Loading />
                        ) : (
                          <Box
                            sx={{
                              display: 'flex',
                            }}>
                            <ListItemAvatar>
                              <Avatar
                                variant="square"
                                src={book?.coverImage ? `${BaseUrl}/assets/${book?.coverImage}` : ''}
                                alt={book?.title}
                                sx={{ width: 60, height: 90, borderRadius: 1 }}
                              />
                            </ListItemAvatar>
                            <ListItemText primary={book?.title} secondary={book?.writer.name} sx={{ paddingX: 1 }} />
                          </Box>
                        )}
                      </ListItem>
                      <Divider />
                    </Box>
                  );
                })
                 : (
                  <Typography textAlign={'center'}>No saved books found</Typography>
                )}
              </List>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ProfilePage;
