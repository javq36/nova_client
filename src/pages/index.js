import React, { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { Google as GoogleIcon } from "../icons/google";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";

import { useAuthLoginMutation, useAuthGoogleLoginMutation } from "src/services/authApi";
import { setUser } from "../features/authSlice";
import { switchCaseRedirect } from "src/helpers/functions";

const MySwal = withReactContent(Swal);

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [counter, setCounter] = React.useState(1);

  const [authLogin] = useAuthLoginMutation();
  const [authGoogleLogin] = useAuthGoogleLoginMutation();
  const { data: session } = useSession();

  /* useEffect(() => {
    googleLogin();
  }, [signIn()]); */

  const loginPromise = async (body) => {
    try {
      const res = await authLogin(body);
      if (res.data) {
        formik.resetForm();
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.usuario));
        dispatch(setUser({ token: res.data.token, user: res.data.usuario }));
        MySwal.fire("Login exitoso!", `Bienvenidos a NOVA!.`, "success").then(() => {
          switch (res.data.usuario.rol) {
            case "USER_ROLE":
              router.push("/employee");
              break;
            case "ADMIN_ROLE":
              router.push("/home");
              break;
            default:
              break;
          }
        });
      }

      if (res.error) {
        console.log(res.error);
        formik.resetForm();
        MySwal.fire(
          "¡Ah ocurrido un error!",
          `Lo sentimos ha ocurrido el siguiente error con tu peticion :
        ${res.error.data.msg}`,
          "error"
        );
      }
    } catch (error) {
      formik.resetForm();
      MySwal.fire(
        "¡Ah ocurrido un error!",
        `En este momento estamos presentando inconvenientes por favor intente luego.`,
        "error"
      );
    }
  };

  const googleLogin = async () => {
    try {
      setCounter((currCount) => currCount + 1);
      const id_token = {
        id_token: session.token.token.account.id_token,
      };
      const { data } = await authGoogleLogin(id_token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.usuario));
      switch (data.usuario.rol) {
        case "USER_ROLE":
          router.push("/employee");
          break;
        case "ADMIN_ROLE":
          router.push("/home");
          break;
        default:
          break;
      }
      /* switchCaseRedirect(data.usuario.rol, router); */
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "isistemas@automarcol.com",
      password: "Automarcol+2022,.*",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string()
        .max(255)
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Debe contener mas de 8 caracteres, Una mayuscula, Una minuscula, Un numero y un caracter especial"
        ),
    }),
    onSubmit: () => {
      let body = {
        correo: formik.values.email,
        password: formik.values.password,
      };

      loginPromise(body);
    },
  });

  if (session?.token?.token?.account?.id_token && counter === 1) {
    googleLogin();
  }

  return (
    <>
      <Head>
        <title>Login | NOVA</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in on the NOVA platform
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Button
                  fullWidth
                  color="info"
                  startIcon={<GoogleIcon />}
                  onClick={() => {
                    signIn();
                  }}
                  size="large"
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                or login with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Ingresar a la plataforma
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
