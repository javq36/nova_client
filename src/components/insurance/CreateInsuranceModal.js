import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@mui/material/Modal";
import { Box, TextField } from "@mui/material";
import { Text } from "src/components/shared/text/Text";
import Button from "@mui/material/Button";
import { useAddInsuranceMutation } from "src/store/apis";

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

const CreateInsuranceModal = ({ isopen, handleOpen }) => {
  const [addInsurance] = useAddInsuranceMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      insurance: Yup.string().max(255).required("El nombre es requerido"),
    }),
    onSubmit: async () => {
      let body = {
        nombre: formik.values.insurance,
      };

      try {
        const aseguradora = await addInsurance(body);
        if (aseguradora.data.nombre) {
          MySwal.fire(
            "Aseguradora creada!",
            `La aseguradora ${aseguradora.data.nombre} ha sido creada exitosamente.`,
            "success"
          );
        }
        /* if (aseguradora.errors) {
          MySwal.fire(
            "Error!",
            `La aseguradora no ha sido creada, ${aseguradora.error.data.errors[0].msg} .`,
            "error"
          );
        } */
      } catch (error) {
        MySwal.fire(
          "Error!",
          `La aseguradora no ha sido creada, ${aseguradora.error.data.errors[0].msg} .`,
          "error"
        );
      }

      formik.resetForm();
    },
  });

  return (
    <Modal
      open={isopen}
      onClose={handleOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={Modalstyle}>
        <Text variant={"h3"} align={"center"} sx={SubTitleModalstyle}>
          Crear Aseguradora
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
          error={Boolean(formik.touched.insurance && formik.errors.insurance)}
          fullWidth
          helperText={formik.touched.insurance && formik.errors.insurance}
          label="Aseguradora"
          margin="normal"
          name="insurance"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.insurance || ""}
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
              handleOpen();
            }}
          >
            Crear Aseguradora
          </Button>
          <Button
            variant="contained"
            size="large"
            color={"error"}
            sx={{ borderRadius: 25, mt: 2 }}
            onClick={() => {
              handleOpen();
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateInsuranceModal;
