import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import Loading from 'components/common/Loading';
import UploadImage from 'components/image_cropper/UploadImage';
import NavBar from 'components/nav_bar/NavBar';
import { RootState } from 'main';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from 'state/userApi';

const ProfilePage = () => {
  const [previewImage, setPreviewImage] = useState<string | null>("");
  const [image, setImage] = useState<File | null>(null);
  const editImage = false;
  const maxBytes = 3145728;
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const { data: user, isLoading, error } = useGetUserProfileQuery(userId ?? '', { skip: !userId });
  console.log('user', user);
  console.log('error', error);

  useEffect(() => {
    if (user) {
      setFormValues({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '', // don't autofill password
      });

      if (user.profileImage) {
        setPreviewImage(`/uploads/${user.profileImage}`); // adjust path if needed
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted:', formValues);
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
                  file={image}
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
                  marginY: {md: '16px'}
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
                  <Button type="submit" variant="contained" color="error" fullWidth sx={{height:'45px'}}>
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>

          </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ProfilePage;
