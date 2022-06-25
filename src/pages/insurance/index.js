import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Insurance } from "src/components/insurance";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useSetTicketsEmployeeMutation } from "../../services/ticketApi";
import { Loading } from "src/components/shared/loading/Loading";
import { useModal } from "src/hooks/useModal";
import { useDispatch } from "react-redux";
import { setEditTiket } from "../../features/ticketSlice";
import { EditTicketModal } from "../../components/employee/EditTicketModal";

const Dashboard = () => {
  const [setTicketsEmployee, { data: tickets }] = useSetTicketsEmployeeMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const { openModal, closeModal, isOpen } = useModal();

  const handleClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    tickets = await setTicketsEmployee(user.uid);
  };

  const openEdit = (id, subject, description, state) => {
    if (state === "Pendiente") {
      dispatch(setEditTiket({ id, subject, description }));
      openModal();
    }
  };

  const pageLoader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loading />
      </Box>
    );
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <>
      <Head>
        <title>ASEGURADORAS | NOVA</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xl={9} xs={12}>
              {tickets !== undefined ? (
                <Insurance data={tickets.tickets} router={router} openedit={openEdit} />
              ) : (
                pageLoader()
              )}
            </Grid>
            <EditTicketModal isopen={isOpen} closemodal={closeModal} />
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
