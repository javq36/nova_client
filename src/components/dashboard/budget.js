import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Image from "next/image";
import fordLogo from "../../assets/ford-logo.png";

export const Budget = (
  { amount = 0, title = "Pendientes", data, helpText = "", logo = "" },
  props
) => (
  <Card sx={{ height: "100%", boxShadow: "1px 5px 7px black" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "flex" }}>
        <Grid item>
          <Image src={logo !== "" ? logo : fordLogo} width={120} height={120} />
        </Grid>
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
      </Grid>
    </CardContent>
  </Card>
);
