import { useState } from "react";
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
import { useGetInsurancesQuery } from "src/store/apis";
import { Loading } from "../shared/loading/Loading";
import CreateInsuranceModal from "./CreateInsuranceModal";

const Insurance = ({ router, openedit }) => {

  const { data: insurances = [], isLoading } = useGetInsurancesQuery();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }
  
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
      {isLoading ? (
        pageLoader()
      ) : (
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
                onClick={handleOpen}
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
                  {insurances.aseguradoras.map((item) => (
                    <TableRow hover key={uuid(item._id)}>
                      <TableCell
                        style={{
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.nombre}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <SeverityPill
                          color={item.severity === "Activa" ? "primary" : "secondary"}
                        >
                          {item.estado === true ? "Activa" : "Inactiva"}
                        </SeverityPill>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Button
                          color="primary"
                          size="small"
                          variant="text"
                          style={{ backgroundColor: "trnasparent", minWidth: "35px" }}
                          onClick={() => {
                            openedit(item._id, item.subject, item.description, item.state);
                          }}
                        >
                          <VisibilityIcon style={{ color: "blue" }} />
                        </Button>{" "}
                        <Button
                          color="primary"
                          size="small"
                          variant="text"
                          style={{ backgroundColor: "trnasparent", minWidth: "35px" }}
                          onClick={() => {console.log(item._id)}}
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
          <CreateInsuranceModal isopen={open} handleOpen={handleOpen} />
        </Card>
      )}
    </>
  );
};

export default Insurance;
