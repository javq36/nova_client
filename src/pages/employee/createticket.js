import React from "react";
import Head from "next/head";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

import { useCreateTicketMutation, useCreateTicketImageMutation } from "src/services/ticketApi";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Input = styled("input")({
  display: "none",
});

const MySwal = withReactContent(Swal);

const CreateTicket = () => {
  const [imageUrl, setImageUrl] = React.useState("");
  const [filename, setFileName] = React.useState("");

  /* Redux Toolkit allows you to create a custom hook for accessing the store.
  Asi se llama la data de un get */
  /* const { data, isFetching, error } = useGetTicketQuery(); */
  const [createTicket] = useCreateTicketMutation();
  const [createTicketImage] = useCreateTicketImageMutation();

  /* Asi se asigna la data de redux toolkit a una variable */
  /* const users = data?.usuarios; */

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      subject: "",
      description: "",
    },
    validationSchema: Yup.object({
      subject: Yup.string().max(255).required("Last name is required"),
      description: Yup.string().required("Password is required"),
    }),
    onSubmit: () => {
      formik.values.img = imageUrl;

      let body = {
        subject: formik.values.subject,
        description: formik.values.description,
      };

      const createTiketPromise = async () => {
        try {
          const token = localStorage.getItem("token");
          let query = {
            body,
            token,
          };
          const { data } = await createTicket(query);
          createTiketImagePromise(data._id);
          if (data) {
            MySwal.fire(
              "Ticket creado exitosamente!",
              `Se ha notificado satisfactoriamente al departamento encargado su solicitud sera atendida en breve.`,
              "success"
            );
          }
        } catch (error) {
          console.log(error);
        }
      };

      const createTiketImagePromise = async (id) => {
        try {
          const blob = await (await fetch(formik.values.img)).blob();
          const myFile = new File([blob], `${filename}`, {
            type: blob.type,
          });

          const file = new FormData();
          file.append("file", myFile);

          let body = {
            id,
            file,
          };

          const { data } = await createTicketImage(body);
          if (data) {
            setImageUrl("");
          }
        } catch (error) {
          console.log(error);
        }
      };

      createTiketPromise();

      formik.resetForm();

      /* router.push('/'); */
    },
  });

  const onChange = (e) => {
    const file = e.target.files[0];

    setFileName(file.name);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageUrl(reader.result);
      };
    } else {
      return;
    }
  };

  return (
    <>
      <Head>
        <title>Crear Ticket | Nova</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          backgroundColor: "#2c3265",
        }}
      >
        <Container
          maxWidth="md"
          style={{
            borderRadius: "25px",
            backgroundColor: "white",
            padding: "5%",
            borderColor: "black",
            boxShadow: "0px 0px 30px #5568fe",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
              <Typography color="textPrimary" variant="h4">
                Crear nuevo ticket
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.subject && formik.errors.subject)}
              fullWidth
              helperText={formik.touched.subject && formik.errors.subject}
              label="Asunto"
              margin="normal"
              name="subject"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.subject}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.subject && formik.errors.subject)}
              fullWidth
              helperText={formik.touched.subject && formik.errors.subject}
              label="Descripción del problema"
              margin="normal"
              name="description"
              multiline
              maxRows={5}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              variant="outlined"
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <img
                src={imageUrl ? imageUrl : null}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  display: imageUrl !== "" ? "flex" : "none",
                }}
              />
            </Box>
            <Box sx={{ py: 2, mt: 2 }}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={onChange}
                />
                <Button variant="contained" component="span" fullWidth>
                  Subir Evidencia
                </Button>
              </label>
            </Box>
            <Box sx={{ py: 2 }}>
              <Button
                color="success"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Crear Ticket
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default CreateTicket;
