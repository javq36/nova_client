import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@mui/material/Modal";
import { Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectEditTicket } from "../../features/ticketSlice";
import { Text } from "src/components/shared/text/Text";
import Button from "@mui/material/Button";
import { useEditTicketMutation } from "src/services/ticketApi";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "90%", md: "50%", xl: "30%" },
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

const SubTitleModalstyle = {
  mt: 2,
  fontWeight: 900,
  mb: 4,
};

export const EditTicketModal = ({ isopen, closemodal }) => {
  const editTicket = useSelector(selectEditTicket);
  const [editTicketMutation] = useEditTicketMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      subject: editTicket.subject,
      description: editTicket.description,
    },
    validationSchema: Yup.object({
      subject: Yup.string().max(255).required("El tema es requerido"),
      description: Yup.string().required("La descripcion es requerida"),
    }),
    onSubmit: () => {
      let body = {
        subject: formik.values.subject,
        description: formik.values.description,
      };

      const editTiketPromise = async () => {
        try {
          const token = localStorage.getItem("token");
          let query = {
            body,
            token,
            id: editTicket.id,
          };
          const { data } = await editTicketMutation(query);
          if (data) {
            MySwal.fire(
              "Ticket modificado exitosamente!",
              `Su ticket ha sido modificado exitosamente.`,
              "success"
            ).then(() => {window.location.reload()});
          }
        } catch (error) {
          console.log(error);
        }
      };

      editTiketPromise();

      formik.resetForm();
    },
  });

  return (
    <Modal
      open={isopen}
      onClose={closemodal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={Modalstyle}>
        <Text variant={"h3"} align={"center"} sx={SubTitleModalstyle}>
          Editar Ticket
        </Text>
        <Box
          sx={{
            borderTop: "1.5px solid #000",
            width: "100%",
            mt: "5%",
            mb: "10%",
          }}
        />
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
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{ borderRadius: 25, mt: 2 }}
            onClick={() => {
              formik.handleSubmit();
              closemodal();
            }}
          >
            Editar ticket
          </Button>
          <Button
            variant="contained"
            size="large"
            color={"error"}
            sx={{ borderRadius: 25, mt: 2 }}
            onClick={() => {
              closemodal();
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTicketModal;
