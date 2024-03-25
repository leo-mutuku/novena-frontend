import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
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
import { useGetAllSoldItemsQuery } from "../../../../slices/store/itemregisterApiSlice";
import { useGetAllStoreItemsQuery } from "../../../../slices/store/storeItemsApiSlice";

import Item from "@mui/material/Grid";

const AddOrders = ({
  open,
  handleClose,
  sales_order_number,
  sales_person_name,
}) => {
  const [sales_item_list, set_sales_item_list] = React.useState({
    item_code: "",
    product: "",
    price: 0,
    quantity: "",
    store_name: "",
    store_item_id: "",
    total: 0,
  });
  const [sales_list, set_sales_list] = React.useState([]);
  const { data: sold_items } = useGetAllSoldItemsQuery();
  const { data: store_items } = useGetAllStoreItemsQuery();

  React.useEffect(() => {}, [
    sold_items,
    store_items,
    sales_item_list,
    sales_list,
  ]);

  const handleSetProduct = (_, newInputValue) => {
    // filter and get price
    let x = sold_items?.data.filter((a) => {
      if (a.item_name == newInputValue) {
        return a.item_code;
      }
    });

    set_sales_item_list({
      ...sales_item_list,
      price: parseFloat(x[0]?.current_price),
      product: newInputValue,
      item_code: x[0]?.item_code,
      total: parseFloat(x[0]?.current_price) * sales_item_list.quantity,
    });
  };
  const handleAdd = (e) => {
    try {
      e.preventDefault();
      if (
        sales_item_list.product == "" ||
        sales_item_list.price == "" ||
        sales_item_list.quantity == "" ||
        sales_item_list.store_name == ""
      ) {
        return alert("Fill all fields");
      }

      set_sales_list([...sales_list, sales_item_list]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStore = (_, newInputValue) => {
    try {
      let x = store_items?.data.filter((a) => {
        if (a.store_item_name == newInputValue) {
          return a.store_item_id;
        }
      });

      set_sales_item_list({
        ...sales_item_list,
        store_name: newInputValue,
        store_item_id: x[0]?.store_item_id,
      });
    } catch (error) {}
  };

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
              Sales order Number {sales_order_number} , Sales Person{" "}
              {sales_person_name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <br></br>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
          columns={{ xs: 3, sm: 6, md: 12 }}
        >
          <Grid item xs={2}>
            <Item>
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={sold_items?.data}
                getOptionLabel={(option) => option.item_name}
                renderInput={(item_name) => (
                  <TextField {...item_name} label="Product" />
                )}
                inputValue={sales_item_list.product}
                onInputChange={(event, newInputValue) =>
                  handleSetProduct(event, newInputValue)
                }
                isOptionEqualToValue={(option, value) =>
                  option.item_code === value.item_code
                }
              />
            </Item>
          </Grid>
          <Grid xs={2} item>
            <Item>
              <TextField
                label="Price"
                type="number"
                value={sales_item_list.price}
                fullWidth
                onChange={(e) =>
                  set_sales_item_list({
                    ...sales_item_list,
                    price: parseFloat(e.target.value),
                    total:
                      parseFloat(e.target.value) * sales_item_list.quantity,
                  })
                }
              />
            </Item>
          </Grid>
          <Grid xs={2} item>
            <Item>
              <TextField
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                type="number"
                value={set_sales_item_list.quantity}
                fullWidth
                onChange={(e) =>
                  set_sales_item_list({
                    ...sales_item_list,
                    quantity: e.target.value,
                    total: parseFloat(e.target.value) * sales_item_list.price,
                  })
                }
              />
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <Autocomplete
                disablePortal
                id="combo-box-demo2"
                options={store_items?.data}
                getOptionLabel={(option) => option.store_item_name}
                isOptionEqualToValue={(option, value) =>
                  option.store_item_id === value.store_item_id
                }
                onInputChange={(event, newInputValue) =>
                  handleStore(event, newInputValue)
                }
                inputValue={sales_item_list.store_name}
                renderInput={(store_name) => (
                  <TextField {...store_name} label="Store" />
                )}
              />
            </Item>
          </Grid>
        </Grid>
        <br></br>
        <Grid
          container
          fullWidth
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
          columns={{ xs: 3, sm: 6, md: 12 }}
        >
          <Button onClick={handleAdd} variant="outlined">
            Add
          </Button>
        </Grid>

        {/* // table  */}
        <br></br>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          columns={{ xs: 3, sm: 6, md: 12 }}
        >
          {" "}
          {sales_list.length > 0 ? (
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
      </Dialog>
    </>
  );
};

export default AddOrders;
