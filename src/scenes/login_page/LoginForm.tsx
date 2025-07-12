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
import { BaseUrl } from "types/Index";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin: LoginValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const palette = theme.palette;
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleLogin = async (
    values: LoginValues,
    onSubmitProps: FormikHelpers<LoginValues>
  ) => {
    const response = await fetch(`${BaseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const loggedIn = await response.json();
    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
      navigate('/');
    }
  };

  return (
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
              sx={{
                gridColumn: "span 4",
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
              sx={{
                gridColumn: "span 4", "& label.Mui-focused": {
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
            />
            {/* <input type="password" name="fake_password" style={{ display: 'none' }} autoComplete="new-password" /> */}
          </Box>

          <Button
            fullWidth
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: "#ff2216",
              color: "#ffffff",
              "&:hover": { color: "#ffffff" },
            }}
          >
            LOGIN
          </Button>
          <Typography
            onClick={() => {
              resetForm();
              navigate('/signup');
            }}
            sx={{
              textDecoration: "underline",
              color: "#ff2216",
              "&:hover": { cursor: "pointer", color: "#ff2216" },
            }}
          >
            Don&apos;t have an account? Sign Up here.
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
