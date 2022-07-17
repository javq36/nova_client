import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../../components/dashboard/budget";
import { LatestOrders } from "../../components/dashboard/latest-orders";
import { LatestProducts } from "../../components/dashboard/latest-products";
import { Sales } from "../../components/dashboard/sales";
import { TasksProgress } from "../../components/dashboard/tasks-progress";
import { TotalCustomers } from "../../components/dashboard/total-customers";
import { TotalProfit } from "../../components/dashboard/total-profit";
import { TrafficByDevice } from "../../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../../components/dashboard-layout";
import { Loading } from "../../components/shared/loading/Loading";
import { useGetFordInventoryQuery } from "src/store/apis/fordApi";
import { useGetFotonInventoryQuery } from "src/store/apis/fotonApi";
import { useGetPugeotInventoryQuery } from "src/store/apis/peugeotApi";
import { useGetBajajInventoryQuery } from "src/store/apis/bajajApi";
import { useGetFCAInventoryQuery } from "src/store/apis/fcaApi";

const CarInvnetory = () => {
  const { data: fordInventory = [], isLoading } = useGetFordInventoryQuery();
  const { data: fotonInventory = [], isLoading2 } = useGetFotonInventoryQuery();
  const { data: peugeotInventory = [], isLoading3 } = useGetPugeotInventoryQuery();
  const { data: bajajInventory = [], isLoading4 } = useGetBajajInventoryQuery();
  const { data: fcaInventory = [], isLoading5 } = useGetFCAInventoryQuery();

  console.log(fcaInventory);

  let fordAmount = fordInventory.length;
  let fotonAmount = fotonInventory.length;
  let peugeotAmount = peugeotInventory.length;
  let bajajAmount = bajajInventory.length;
  let fcaAmount = fcaInventory.length;

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
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <Budget
                  amount={fordAmount}
                  title={"Vehiculos FORD"}
                  data={fordInventory}
                  helpText={"Vehiculos"}
                />
              </Grid>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <Budget
                  amount={fotonAmount}
                  title={"Vehiculos FOTON"}
                  data={fotonInventory}
                  helpText={"Vehiculos"}
                />
              </Grid>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <Budget
                  amount={peugeotAmount}
                  title={"Vehiculos PEUGEOT"}
                  data={peugeotInventory}
                  helpText={"Vehiculos"}
                />
              </Grid>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <Budget
                  amount={bajajAmount}
                  title={"Vehiculos BAJAJ"}
                  data={bajajInventory}
                  helpText={"Vehiculos"}
                />
              </Grid>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <Budget
                  amount={fcaAmount}
                  title={"Vehiculos FCA"}
                  data={fordInventory}
                  helpText={"fcaInventory"}
                />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Sales />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <TrafficByDevice sx={{ height: "100%" }} />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Sales />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <TrafficByDevice sx={{ height: "100%" }} />
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
