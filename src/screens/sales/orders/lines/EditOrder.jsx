import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetSalesLinesByHeaderIdQuery } from "../../../../slices/sales/salesOrderLinesApiSlice";
import { usePostSalesOrderMutation } from "../../../../slices/sales/salesOrderHeadersApiSlice";
import { useArchiveuPostedSalesOrderMutation } from "../../../../slices/sales/salesOrderHeadersApiSlice";
import Item from "@mui/material/Grid";
import { toast } from "react-toastify";

const EditOrder = ({ open, handleClose, sales_order_number }) => {
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              *** Post / Archive Order:- *** Sales order Number{" "}
              {sales_order_number}{" "}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <br></br>

        <br></br>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          columns={{ xs: 3, sm: 6, md: 12 }}
        >
          {/* {sales_list.length > 0 ? (
            <Grid item xs={12}>
              <Item>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Store</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sales_list.map((row) => (
                        <TableRow
                          key={row.item_code}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.product}
                          </TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell align="right">{row.store_name}</TableCell>
                          <TableCell align="right">{row.total}</TableCell>
                          <TableCell align="right">
                            <Button
                              onClick={() =>
                                set_sales_list(
                                  sales_list.filter(
                                    (item) => item.item_code !== row.item_code
                                  )
                                )
                              }
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Item>
            </Grid>
          ) : (
            <div style={{ color: "red" }}> Add order items </div>
          )}
        </Grid>
        <br></br>
        {sales_list.length > 0 ? (
          <Grid
            container
            direction="row"
            justifyContent="right"
            alignItems="center"
            columns={{ xs: 3, sm: 6, md: 12 }}
          >
            <Grid item xs={1}>
              <Item>
                <Button color={"error"} variant="outlined" onClick={handCancel}>
                  Cancel
                </Button>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <Button
                  color={"success"}
                  variant="outlined"
                  onClick={handSubmit}
                >
                  Submit
                </Button>
              </Item>
            </Grid>
          </Grid>
        ) : null} */}
        </Grid>
      </Dialog>
    </>
  );
};

export default EditOrder;
