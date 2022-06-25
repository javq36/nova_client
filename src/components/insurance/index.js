
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Button,
} from "@mui/material";
import { SeverityPill } from "../severity-pill";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const Insurance = ({ data, router, openedit }, props) => (
  <Card>
    <CardHeader title="Listado de Aseguradoras" style={{ textAlign: "center" }} />
    <PerfectScrollbar style={{ overflow: "auto" }}>
      <Box>
        <Button
          color="primary"
          endIcon={<AddCircleIcon fontSize="small" />}
          size="large"
          variant="text"
          style={{ float: "right", margin: "1%" }}
          onClick={() => {
            router.push("/employee/createticket");
          }}
        >
          Nueva Aseguradora
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: "#000000",
                }}
              >
                Aseguradora
              </TableCell>
              <TableCell
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: "#000000",
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: "#000000",
                }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((order) => (
              <TableRow hover key={uuid(order._id)}>
                <TableCell
                  style={{
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {uuid(order._id)}
                </TableCell>
                <TableCell
                  style={{ textAlign: "center" }}
                >
                  <SeverityPill color={order.severity === "Resuelto" ? "primary" : "secondary"}>
                    {order.state}
                  </SeverityPill>
                </TableCell>
                <TableCell
                  style={{ textAlign: "center" }}
                >
                  <Button
                    color="primary"
                    size="small"
                    variant="text"
                    style={{ backgroundColor: "trnasparent", minWidth: "35px" }}
                    onClick={() => {
                      openedit(order._id, order.subject, order.description, order.state);
                    }}
                  >
                    <VisibilityIcon style={{ color: "blue" }} />
                  </Button>{" "}
                  <Button
                    color="primary"
                    size="small"
                    variant="text"
                    style={{ backgroundColor: "trnasparent", minWidth: "35px" }}
                  >
                    <DeleteForeverIcon style={{ color: "blue" }} />
                  </Button>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
  </Card>
);
