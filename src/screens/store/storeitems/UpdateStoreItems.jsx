import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Stack, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useUpdateStoreItemByIdMutation,
  useGetStoreItemByIdQuery,
} from "../../../slices/store/storeItemsApiSlice";
import { toast } from "react-toastify";

const UpdateStoreItems = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  const [user, setUser] = useState(userInfo);
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  const [item_quantity, set_item_quantity] = useState(null);
  const [item_name, set_item_name] = useState("");
  const [store_name, set_store_name] = useState("");
  const [updateStore, { isError, isSuccess, error: errorUpdate }] =
    useUpdateStoreItemByIdMutation();
  const { data: storeData } = useGetStoreItemByIdQuery(id);
  const navigate = useNavigate();
  useEffect(() => {
    if (id && errorUpdate) {
      toast.error(`Error occured `);
    } else {
      set_item_quantity(storeData?.data.item_quantity);
      set_item_name(storeData?.data.item_name);
      set_store_name(storeData?.data.store_name);
    }
  }, [id, storeData, updateStore]);

  useEffect(() => {
    if (id) {
      if (updateStore) {
      }
    }
  }, [id, updateStore]);
  const handleSubmit = async (e) => {
    const res = await updateStore({
      id: id,
      data: {
        item_quantity,
      },
    }).unwrap();
    if (res.status == "failed") {
      toast.error("Sorry an error occoured");
    } else {
      toast.success("Updated successfully");
      navigate("../allstoreitems");
    }
  };

  return (
    <>
      <Row>
        <p>** Inventory Direct Update **</p>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="Item_Name">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              disabled
              type="text"
              required
              placeholder="Item Name"
              value={item_name}
              onChange={(e) => set_item_name(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="Store Name">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              disabled
              type="text"
              required
              placeholder="Store Name"
              value={store_name}
              onChange={(e) => set_store_name(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="Item_quantity">
            <Form.Label>Item quantity</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Item quantity"
              value={item_quantity}
              onChange={(e) => set_item_quantity(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col>
          <Stack>
            {userInfo.user_email == "admin@gmail.com" ||
            userInfo.user_email == "le.mutuku@gmail.com" ||
            "cymumu7@gmail.com" ? (
              <Button onClick={handleSubmit} variant="outlined">
                Update
              </Button>
            ) : (
              ""
            )}
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default UpdateStoreItems;
