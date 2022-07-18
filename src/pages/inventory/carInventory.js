import React from "react";
import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Budget } from "../../components/dashboard/budget";
import { DashboardLayout } from "../../components/dashboard-layout";
import { Loading } from "../../components/shared/loading/Loading";
import { useGetFordInventoryQuery } from "src/store/apis/fordApi";
import { useGetFotonInventoryQuery } from "src/store/apis/fotonApi";
import { useGetPugeotInventoryQuery } from "src/store/apis/peugeotApi";
import { useGetBajajInventoryQuery } from "src/store/apis/bajajApi";
import { useGetFCAInventoryQuery } from "src/store/apis/fcaApi";

import { DataTable } from "src/components/shared/cartable";

const CarInvnetory = () => {
  const { data: fordInventory = [], isLoading } = useGetFordInventoryQuery();
  const { data: fotonInventory = [] } = useGetFotonInventoryQuery();
  const { data: peugeotInventory = [] } = useGetPugeotInventoryQuery();
  const { data: bajajInventory = [] } = useGetBajajInventoryQuery();
  const { data: fcaInventory = [] } = useGetFCAInventoryQuery();

  const [inventory, setInventory] = React.useState(fordInventory);

  let fordAmount = fordInventory.length;
  let fotonAmount = fotonInventory.length;
  let peugeotAmount = peugeotInventory.length;
  let bajajAmount = bajajInventory.length;
  let fcaAmount = fcaInventory.length;

  const loadInventory = (brand) => {
    switch (brand) {
      case "ford":
        setInventory(fordInventory);
        break;
      case "foton":
        setInventory(fotonInventory);
        break;
      case "peugeot":
        setInventory(peugeotInventory);
        break;
      case "bajaj":
        setInventory(bajajInventory);
        break;
      case "fca":
        setInventory(fcaInventory);
        break;
      default:
        break;
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
  return (
    <>
      <Head>
        <title>VEHICULOS | NOVA</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {isLoading &&
          fordInventory &&
          fotonInventory &&
          peugeotInventory &&
          bajajInventory &&
          fcaInventory ? (
            pageLoader()
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={24} md={12}>
                <Typography color="textPrimary" variant="h3" style={{ textAlign: "center" }}>
                  Inventario de Vehiculos
                </Typography>
              </Grid>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <motion.div
                  animate={{
                    x: [-500, 0],
                    opacity: 2,
                  }}
                  transition={{ type: "spring", stiffness: 100, duration: 3 }}
                >
                  <button
                    onClick={() => loadInventory("ford")}
                    style={{ borderColor: "transparent" }}
                  >
                    <Budget
                      amount={fordAmount}
                      title={"Vehiculos FORD"}
                      data={fordInventory}
                      helpText={"Vehiculos"}
                    />
                  </button>
                </motion.div>
              </Grid>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <motion.div
                  animate={{
                    y: [-500, 0],
                    opacity: 2,
                  }}
                  transition={{ type: "spring", stiffness: 100, duration: 3 }}
                >
                  <button
                    onClick={() => loadInventory("foton")}
                    style={{ borderColor: "transparent" }}
                  >
                    <Budget
                      amount={fotonAmount}
                      title={"Vehiculos FOTON"}
                      data={fotonInventory}
                      helpText={"Vehiculos"}
                    />
                  </button>
                </motion.div>
              </Grid>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <motion.div
                  animate={{
                    x: [500, 0],
                    opacity: 2,
                  }}
                  transition={{ type: "spring", stiffness: 100, duration: 3 }}
                >
                  <button
                    onClick={() => loadInventory("peugeot")}
                    style={{ borderColor: "transparent" }}
                  >
                    <Budget
                      amount={peugeotAmount}
                      title={"Vehiculos PEUGEOT"}
                      data={peugeotInventory}
                      helpText={"Vehiculos"}
                    />
                  </button>
                </motion.div>
              </Grid>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <motion.div
                  animate={{
                    x: [-500, 0],
                    opacity: 2,
                  }}
                  transition={{ type: "spring", stiffness: 100, duration: 5 }}
                >
                  <button
                    onClick={() => loadInventory("bajaj")}
                    style={{ borderColor: "transparent" }}
                  >
                    <Budget
                      amount={bajajAmount}
                      title={"Vehiculos BAJAJ"}
                      data={bajajInventory}
                      helpText={"Vehiculos"}
                      onClick={() => loadInventory("bajaj")}
                    />
                  </button>
                </motion.div>
              </Grid>
              <Grid
                item
                lg={4}
                sm={6}
                xl={4}
                xs={12}
                sx={{ display: { xs: "none", md: "flex" } }}
              />
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <motion.div
                  animate={{
                    x: [500, 0],
                    opacity: 2,
                  }}
                  transition={{ type: "spring", stiffness: 100, duration: 5 }}
                >
                  <button
                    onClick={() => loadInventory("fca")}
                    style={{ borderColor: "transparent" }}
                  >
                    <Budget
                      amount={fcaAmount}
                      title={"Vehiculos FCA"}
                      data={fcaInventory}
                      helpText={"Vehiculos"}
                    />
                  </button>
                </motion.div>
              </Grid>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                {inventory.length > 0 ? (
                  <DataTable data={inventory} title={"Lista de vehiculos Ford"} />
                ) : (
                  <Typography variant="h4" sx={{ mt: 5, textAlign: "center" }}>
                    Seleccione una marca para desplegar el inventario
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

CarInvnetory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CarInvnetory;
