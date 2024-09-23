import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateAccountMutation } from "../../../slices/finance/accountsApiSlice";
import { useGetAllStoreItemsQuery } from "../../../slices/store/storeItemsApiSlice";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import {
  useValidateStoreMutation,
  useCreateStockTakeHeaderMutation,
} from "../../../slices/store/stockTakeHeadersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateStokTake() {
  const [item_code, set_item_code] = useState("");
  const [store_item, set_store_item] = useState("");
  const [current_value, set_current_value] = useState("");
  const [expected_value, set_expected_value] = useState("");
  const [item_name, set_item_name] = useState("");
  const [stock_take_list, set_stock_take_list] = useState([]);

  const [created_by, set_created_by] = useState("");

  const [CreateAccount, { isLoading }] = useCreateAccountMutation();
  const [CreateStoreItem, { isLoading: storeItemIsLoading }] =
    useValidateStoreMutation();
  const { data: storeItemsData, isLoading: storeItemsIsLoading } =
    useGetAllStoreItemsQuery();
  const { data: itemRegisterData, isLoading: itemRegisterIsLoading } =
    useGetAllItemRegisterQuery();
  const [CreateStockTakeHeader, { isLoading: stockTakeHeaderIsLoading }] =
    useCreateStockTakeHeaderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);

  const handleAdd = async (e) => {
    if (!item_code || !store_item || !current_value) {
      return toast.error("All fields are required");
    }

    // Ensure stock_take_list is an array before using .some()
    if (!Array.isArray(stock_take_list)) {
      return toast.error("Invalid stock_take_list type");
    }

    // Check if item_code already exists in stock_take_list
    const existingItem = stock_take_list.some(
      (item) => item.item_code === item_code
    );
    if (existingItem) {
      return toast.error("Item already exists in stock take list");
    }

    // validate if item and store exist from the database
    try {
      const res = await CreateStoreItem({
        item_code,
        store_item,
        current_value,
      }).unwrap();

      console.log(res.status); // Check if this line is reached

      if (res.status === "failed" || res.status === 500) {
        toast.error(res.data.message || "Server error");
        return;
      }

      set_stock_take_list([
        ...stock_take_list,
        { item_code, store_item, current_value, item_name, expected_value },
      ]);
    } catch (error) {
      console.error("Error:", error); // Capture API errors
      toast.error(
        error?.data?.message || "Failed to add item, please try again."
      );
    }
  };

  const handleSubmitStockTake = async (e) => {
    e.preventDefault();
    try {
      const res = await CreateStockTakeHeader({
        stock_take_list,
        created_by,
      }).unwrap();
      if (res.status === "success") {
        toast.success("Stock take created successfully");
        navigate("../allstocktakes");
      } else {
        toast.error(res.data.message || "Failed to create stock take");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await CreateAccount({
        item_code,
        store_item,
        current_value,
        account_balance,
        created_by,
      }).unwrap();
      console.log(res);
      navigate("../allaccounts");
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleItemChange = (e) => {
    set_item_code(e.target.value);
    const selectedItem = itemRegisterData?.data.find(
      (item) => item.item_code == e.target.value
    );
    if (selectedItem) {
      set_item_name(selectedItem.item_name);
    }
  };
  const handleRemove = (item_code) => {
    const updatedList = stock_take_list.filter(
      (item) => item.item_code !== item_code
    );
    set_stock_take_list(updatedList);
  };
  return (
    <>
      <span>*** Stock take *** </span>

      <Row>
        <div>
          {" "}
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        {/* */}
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="item_code">
              <Form.Label>Item Name</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="item_code"
                value={item_code}
                onChange={handleItemChange}
              >
                <option value={""}>Select Item name</option>
                {itemRegisterData?.data.map((item, key) => (
                  <option value={item.item_code} key={key}>
                    {item.item_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="store_item">
              <Form.Label>Store & Item</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="Store Item"
                value={store_item}
                onChange={(e) => set_store_item(e.target.value)}
              >
                <option value="">Select store item</option>
                {storeItemsData?.data.map((item, key) => (
                  <option value={item.store_item_id}>
                    {item.store_name} & {item.item_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="current_value">
              <Form.Label>Current Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Quantity"
                value={current_value}
                onChange={(e) => set_current_value(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col xs={1} style={{ marginTop: "40px" }}>
            {" "}
            <Button onClick={handleAdd} variant="primary">
              add
            </Button>
          </Col>
        </Row>

        {stock_take_list.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Current Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stock_take_list.map((item, key) => (
                <tr key={key}>
                  <td>{item.item_code}</td>
                  <td>{item.item_name}</td>
                  <td>{item.current_value}</td>
                  <td>
                    {/* Button to trigger the remove action */}
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(item.item_code)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}

        {stock_take_list.length > 0 ? (
          <Row>
            <Col></Col>
            <Col xs={1}>
              <Button
                type="submit"
                variant="primary"
                className="mt-3"
                onClick={handleSubmitStockTake}
              >
                submit
              </Button>
            </Col>
          </Row>
        ) : null}

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
}

export default CreateStokTake;
