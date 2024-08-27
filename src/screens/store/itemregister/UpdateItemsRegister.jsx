import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Stack, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateRegisteredItemMutation,
  useGetRegisteredItemByIdQuery,
} from "../../../slices/store/itemregisterApiSlice";
import { useGetAllAccountsQuery } from "../../../slices/finance/accountsApiSlice";

const UpdateItemsRegister = () => {
  const navigate = useNavigate();
  const [item_name, set_item_name] = useState("");
  const [item_code, set_item_code] = useState("");
  const [account_number, set_account_number] = useState("");
  const [item_units_abbreaviations, set_item_units_abbreaviations] =
    useState(null);
  const [current_price, set_current_price] = useState("");
  const [item_units, set_item_units] = useState("");
  const [item_units_value, set_item_units_value] = useState("");
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  const [updateItemRegister, { isError, isSuccess, error: errorUpdate }] =
    useUpdateRegisteredItemMutation();
  const { data: accounts } = useGetAllAccountsQuery();
  const { data: ItemRegister } = useGetRegisteredItemByIdQuery(id);

  useEffect(() => {
    if (id && errorUpdate) {
      toast.error(`Error occurred `);
    } else {
      set_item_name(ItemRegister?.data.item_name);
      set_account_number(ItemRegister?.data.account_number);
      set_item_code(ItemRegister?.data.item_code);
      set_item_units(ItemRegister?.data.item_units);
      set_item_units_value(ItemRegister?.data.item_units_value);
      set_current_price(ItemRegister?.data.current_price);
      set_item_units_abbreaviations(
        ItemRegister?.data.item_units_abbreaviations
      );
    }
  }, [id, ItemRegister]);

  const handleAccountNumber = (e) => {
    set_account_number(e.target.value);
  };
  const handleSubmit = async (e) => {
    const res = await updateItemRegister({
      id: id,
      data: {
        item_name,
        item_units,
        item_units_value,
        item_units_abbreaviations,
        current_price,
        account_number,
      },
    }).unwrap();
    if (res.status == "failed") {
      toast.error("Sorry an error occoured");
    } else {
      toast.success("Updated successfully");
      navigate("../allregistereditems");
    }
  };
  return (
    <>
      <Row>
        <p>***Update item register** </p>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="item_name">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="item_name"
              value={item_name}
              onChange={(e) => set_item_name(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="item_code">
            <Form.Label>Item code</Form.Label>
            <Form.Control
              disabled
              type="number"
              required
              placeholder="Item code"
              value={item_code}
              onChange={(e) => set_item_code(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="item_units">
            <Form.Label>Items Units</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Items Unit"
              value={item_units}
              onChange={(e) => set_item_units(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          {" "}
          <Form.Group className="my-2" controlId="account_number">
            <Form.Label>Account_number</Form.Label>
            <Form.Select
              type="number"
              required
              placeholder="Account Number"
              value={account_number}
              onChange={handleAccountNumber}
            >
              <option value={account_number}>{account_number}</option>
              {accounts?.data.map((item) => (
                <option value={item.account_number}>{item.account_name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="current_price">
            <Form.Label>Current Price</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="current_price"
              value={current_price}
              onChange={(e) => set_current_price(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="">
            <Form.Label>Item Unit Value</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Item Unit Value"
              value={item_units_value}
              onChange={(e) => set_item_units_value(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <br></br>

      <Row>
        <Col></Col>
        <Col></Col>
        <Col>
          <Stack spacing={2} direction={"left"}>
            <Button onClick={handleSubmit} variant="outlined">
              Update
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default UpdateItemsRegister;
