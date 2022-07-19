import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import Image from "next/image";
import fordLogo from "../../assets/ford-logo.png";

export const Budget = ({ amount = 0, title = "Pendientes", data, helpText = "", logo=''}, props) => (
  <Card sx={{ height: "100%", boxShadow:"1px 5px 7px black" }} {...props}>
    <CardContent >
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
            sx={{ fontSize: "1.1rem" }}
          >
            {title}
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {amount + " " + helpText}
          </Typography>
        </Grid>
        <Grid item>
        <Image src={logo !== '' ? logo : fordLogo} width={200} height={200} />
          {/* <Avatar
            sx={{
              backgroundColor: "info.main",
              height: 56,
              width: 56,
            }}
          >
            <MoneyIcon />
          </Avatar> */}
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1,
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
