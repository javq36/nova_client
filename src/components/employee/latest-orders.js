import { format } from "date-fns";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { extractDate } from "../../helpers/functions";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const LatestOrders = ({data, router, openedit}, props) => (
  <Card>
    <CardHeader title="Tus últimos tickets" style={{ textAlign: "center" }} />
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
          Nuevo Ticket
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Ticket Id</TableCell>
              <TableCell style={{ textAlign: "center" }}>tema</TableCell>
              <TableCell sortDirection="desc" style={{ textAlign: "center" }}>
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction="desc" style={{ textAlign: "center" }}>
                    Fecha
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>Status</TableCell>
              <TableCell style={{ textAlign: "center" }}>Acciones</TableCell>
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
                  style={{
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {order.subject}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>{extractDate(order.time)}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <SeverityPill color={order.severity !== "Resuelto" ? "primary" : "secondary"}>
                    {order.state}
                  </SeverityPill>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <Button
                    color="primary"
                    size="small"
                    variant="text"
                    style={{ backgroundColor: "trnasparent", minWidth: "35px" }}
                    onClick={() => {openedit(order._id, order.subject, order.description, order.state)}}
                  >
                    <EditIcon style={{ color: "blue" }} />
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
    {/* <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box> */}
  </Card>
);
