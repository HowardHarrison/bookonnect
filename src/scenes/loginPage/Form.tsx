import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state";
import { LoginValues, RegisterValues } from "types/Form";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  picture: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister: RegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
};

const initialValuesLogin: LoginValues = {
  email: "",
  password: "",
};

const AuthForm = () => {
  const [pageType, setPageType] = useState<"login" | "register">("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const palette = theme.palette;
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleRegister = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    const formData = new FormData();
    (Object.keys(values) as Array<keyof RegisterValues>).forEach((key) => {
      const value = values[key];
      formData.append(key, value instanceof File ? value : String(value));
    });

    if (values.picture instanceof File) {
      formData.append("picturePath", values.picture.name);
    }

    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: formData,
    });

    const savedUser = await response.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const handleLogin = async (
    values: LoginValues,
    onSubmitProps: FormikHelpers<LoginValues>
  ) => {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const loggedIn = await response.json();
    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
      navigate("/home");
    }
  };

  const RegisterForm = () => (
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
            }}
          >
            <TextField
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
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
            <Box
              gridColumn="span 4"
              borderRadius="5px"
              p="1rem"
              sx={{
                border: `1px solid ${theme.palette.grey[400]}`, // fallback from palette.neutral.medium
              }}
            >
              {/* Dropzone logic could go here */}
              {/* Skipped for now since you commented it out */}
            </Box>
          </Box>

          <Button
            fullWidth
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
            REGISTER
          </Button>
          <Typography
            onClick={() => {
              setPageType("login");
              resetForm();
            }}
            sx={{
              textDecoration: "underline",
              color: palette.primary.main,
              "&:hover": { cursor: "pointer", color: palette.primary.light },
            }}
          >
            Already have an account? Login here.
          </Typography>
        </form>
      )}
    </Formik>
  );

  const LoginForm = () => (
    <Formik
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
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
            }}
          >
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
          </Box>

          <Button
            fullWidth
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
            LOGIN
          </Button>
          <Typography
            onClick={() => {
              setPageType("register");
              resetForm();
            }}
            sx={{
              textDecoration: "underline",
              color: palette.primary.main,
              "&:hover": { cursor: "pointer", color: palette.primary.light },
            }}
          >
            Don&apos;t have an account? Sign Up here.
          </Typography>
        </form>
      )}
    </Formik>
  );

  return <>{isLogin ? <LoginForm /> : <RegisterForm />}</>;
};

export default AuthForm;
