import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Button,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { v4 as uuid } from "uuid";

const TableCellStyle = {
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const TableLabel = {
  fontSize: "0.9rem",
  fontWeight: "bold",
  color: "#000000",
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "0.5rem",
  margin: "0.5rem",
  borderRadius: "0.5rem",
  width: "100%",
  textTransform: "uppercase",
  letterSpacing: "0.1rem",
};

const TableLabel2 = {
  fontSize: "0.7rem",
  fontWeight: "bold",
  color: "#000000",
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "0.5rem",
  margin: "0.5rem",
  borderRadius: "0.5rem",
  width: "100%",
  textTransform: "uppercase",
  letterSpacing: "0.1rem",
};

export const DataTable = ({ data, title }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card>
      <CardHeader title={title} style={{ textAlign: "center" }} />
      <PerfectScrollbar style={{ overflow: "auto" }}>
        <Box>
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
                  Vehiculos
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    color: "#000000",
                  }}
                >
                  Vin
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    color: "#000000",
                  }}
                >
                  Días en inventario
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    color: "#000000",
                  }}
                >
                  Año Modelo
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    color: "#000000",
                  }}
                >
                  Color
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    color: "#000000",
                  }}
                >
                  Ubicacion Actual
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    color: "#000000",
                  }}
                >
                  Costo Actual
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow hover key={uuid(item.Vin)}>
                  <TableCell sx={{ TableCellStyle }}>
                    <p style={TableLabel}> {item.Version_DescipcionModelo}</p>
                  </TableCell>
                  <TableCell sx={{ TableCellStyle }}>
                    <p style={TableLabel}>{item.Vin}</p>
                  </TableCell>
                  <TableCell sx={{ TableCellStyle }}>
                    <p style={TableLabel}>{item.Dias_En_Inventario} Días </p>
                  </TableCell>
                  <TableCell sx={{ TableCellStyle }}>
                    <p style={TableLabel}>{item.Ano_Modelo} </p>
                  </TableCell>
                  <TableCell sx={{ TableCellStyle }}>
                    <p style={TableLabel}>{item.ColorPintura} </p>
                  </TableCell>
                  <TableCell sx={{ TableCellStyle }}>
                    <p style={TableLabel}>{item.UbicacionActual} </p>
                  </TableCell>
                  <TableCell sx={{ TableCellStyle }}>
                    {" "}
                    <p style={TableLabel}>{item.costoactual} </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
