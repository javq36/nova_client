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
import fordLogo from "../../assets/ford-logo.png";
import fotonLogo from "../../assets/foton-logo.png";
import peugeotLogo from "../../assets/peugeot-logo.png";
import bajajLogo from "../../assets/bajaj-logo.png";
import fcaLogo from "../../assets/astara-logo.png";

import { DataTable } from "src/components/shared/cartable";

const CarInvnetory = () => {
  const { data: fordInventory = [], isLoading } = useGetFordInventoryQuery();
  const { data: fotonInventory = [] } = useGetFotonInventoryQuery();
  const { data: peugeotInventory = [] } = useGetPugeotInventoryQuery();
  const { data: bajajInventory = [] } = useGetBajajInventoryQuery();
  const { data: fcaInventory = [] } = useGetFCAInventoryQuery();

  const [inventory, setInventory] = React.useState(fordInventory);
  const [currentInventory, setCurrentInventory] = React.useState('Ford');
  const [currentLogo, setCurrentLogo] = React.useState("");

  let fordAmount = fordInventory.length;
  let fotonAmount = fotonInventory.length;
  let peugeotAmount = peugeotInventory.length;
  let bajajAmount = bajajInventory.length;
  let fcaAmount = fcaInventory.length;

  const loadInventory = (brand) => {
    switch (brand) {
      case "ford":
        setInventory(fordInventory);
        setCurrentInventory("Ford");
        break;
      case "foton":
        setInventory(fotonInventory);
        setCurrentInventory("Foton");
        break;
      case "peugeot":
        setInventory(peugeotInventory);
        setCurrentInventory("Peugeot");
        break;
      case "bajaj":
        setInventory(bajajInventory);
        setCurrentInventory("Bajaj");
        break;
      case "fca":
        setInventory(fcaInventory);
        setCurrentInventory("FCA");
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
                  <motion.button
                    onClick={() => loadInventory("ford")}
                    style={{ borderColor: "transparent", width: "95%" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Budget
                      amount={fordAmount}
                      title={"Vehiculos FORD"}
                      data={fordInventory}
                      helpText={"Vehiculos"}
                    />
                  </motion.button>
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
                  <motion.button
                    onClick={() => loadInventory("foton")}
                    style={{ borderColor: "transparent", width: "95%" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Budget
                      amount={fotonAmount}
                      title={"Vehiculos FOTON"}
                      data={fotonInventory}
                      helpText={"Vehiculos"}
                    />
                  </motion.button>
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
                  <motion.button
                    onClick={() => loadInventory("peugeot")}
                    style={{ borderColor: "transparent", width: "95%" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Budget
                      amount={peugeotAmount}
                      title={"Vehiculos PEUGEOT"}
                      data={peugeotInventory}
                      helpText={"Vehiculos"}
                    />
                  </motion.button>
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
                  <motion.button
                    onClick={() => loadInventory("bajaj")}
                    style={{ borderColor: "transparent", width: "95%" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Budget
                      amount={bajajAmount}
                      title={"Vehiculos BAJAJ"}
                      data={bajajInventory}
                      helpText={"Vehiculos"}
                      onClick={() => loadInventory("bajaj")}
                    />
                  </motion.button>
                </motion.div>
              </Grid>
              <Grid
                item
                lg={4}
                sm={6}
                xl={4}
                xs={12}
                sx={{ display: { xs: "none", md: "none", lg:'flex' } }}
              />
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <motion.div
                  animate={{
                    x: [500, 0],
                    opacity: 2,
                  }}
                  transition={{ type: "spring", stiffness: 100, duration: 5 }}
                >
                  <motion.button
                    onClick={() => loadInventory("fca")}
                    style={{ borderColor: "transparent", width: "95%" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Budget
                      amount={fcaAmount}
                      title={"Vehiculos FCA"}
                      data={fcaInventory}
                      helpText={"Vehiculos"}
                    />
                  </motion.button>
                </motion.div>
              </Grid>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <motion.div
                  animate={{
                    y: [500, 0],
                    opacity: 2,
                  }}
                  transition={{ type: "spring", stiffness: 100, duration: 5 }}
                >
                  {inventory.length > 0 ? (
                    <motion.div
                      animate={{
                        y: [500, 0],
                        opacity: 2,
                      }}
                      transition={{ type: "spring", stiffness: 100, duration: 2 }}
                    >
                      <DataTable data={inventory} title={"Lista de vehiculos "+currentInventory} logo={peugeotLogo} />
                    </motion.div>
                  ) : (
                    <Typography variant="h4" sx={{ mt: 5, textAlign: "center" }}>
                      Seleccione una marca para desplegar el inventario
                    </Typography>
                  )}
                </motion.div>
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
