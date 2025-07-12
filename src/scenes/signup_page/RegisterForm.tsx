import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import UploadImage from "components/image_cropper/UploadImage";
import { Formik, FormikHelpers } from "formik";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state";
import { RegisterValues } from "types/Form";
import { BaseUrl } from "types/Index";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  profileImage: yup.string(),
});

const initialValuesRegister: RegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  profileImage: "",
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const palette = theme.palette;
  const isNonMobile = useMediaQuery("(min-width:600px)");

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

  const handleRegister = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    const formData = new FormData();
    (Object.keys(values) as Array<keyof RegisterValues>).forEach((key) => {
      const value = values[key];
      formData.append(key, value instanceof File ? value : String(value));
    });

    if (image instanceof File) {
      formData.append("profileImage", image);
    }

    const response = await fetch(`${BaseUrl}/register`, {
      method: "POST",
      body: formData,
    });

    const savedUser = await response.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      dispatch(setLogin({ user: savedUser.user, token: savedUser.token }));
      navigate('/');
    }
  };
  return (
    <Formik
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
      onSubmit={handleRegister}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
               "& label.Mui-focused": {
                  color: "#1c1c1c",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#1c1c1c",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1c1c1c",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1c1c1c",
                  },
                },
            }}
          >
            <TextField
              label="First Name"
              name="firstName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{
                gridColumn: "span 2"
               
              }}
            />
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            <input type="password" name="fake_password" style={{ display: 'none' }} autoComplete="new-password" />
            <Box
              gridColumn="span 4"
              borderRadius="5px"
              p="1rem"
              sx={{
                border: `1px solid ${theme.palette.grey[400]}`, // fallback from palette.neutral.medium
                "& label.Mui-focused": {
                  color: "#1c1c1c",
                },
              }}
            >
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
          </Box>

          <Button
            fullWidth
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: '#ff2216',
              color: '#ffffff',
            }}
          >
            REGISTER
          </Button>
          <Typography
            onClick={() => {
              resetForm();
              navigate('/login');
            }}
            sx={{
              textDecoration: "underline",
              color: "#ff2216",
              "&:hover": { cursor: "pointer", color: '#ff2216' },
            }}
          >
            Already have an account? Login here.
          </Typography>
        </form>
      )}
    </Formik>
  )
}

export default RegisterForm;