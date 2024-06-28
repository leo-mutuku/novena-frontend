import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useGetAllStoreRegisterQuery } from "../../../slices/store/storeRegisterApiSlice";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { useCreateStoreItemMutation } from "../../../slices/store/storeItemsApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateBankReceipt() {
  const [store_code, set_store_code] = useState("");
  const [store_name, set_store_name] = useState("");
  const [item_code, set_item_code] = useState("");
  const [item_name, set_item_name] = useState("");
  const [item_quantity, set_item_quantity] = useState("");

  const [createStoreItem, { isLoading }] = useCreateStoreItemMutation();
  const { data: items } = useGetAllItemRegisterQuery();
  const { data: stores } = useGetAllStoreRegisterQuery();
  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createStoreItem({
        store_code,
        store_name,
        item_code,
        item_name,
        item_quantity,
      }).unwrap();
      if (res.status == "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        navigate("../allstoreitems");
        toast.success("Store  Item created successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleItem = (e) => {
    let x = items?.data?.filter((a) => {
      if (a.item_code == e.target.value) {
        return a.item_code;
      }
    });

    set_item_code(e.target.value);
    set_item_name(x[0].item_name);
  };

  const handStore = (e) => {
    let x = stores?.data?.filter((a) => {
      if (a.store_code == e.target.value) {
        return a.store_code;
      }
    });

    set_store_code(parseInt(e.target.value));
    set_store_name(x[0].store_name);

    console.log(store_name);
  };

  return (
    <>
      <span>*** Create Store Item ***</span>
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
            <Form.Group className="my-2" controlId="store_code">
              <Form.Label>Store </Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="store_code"
                value={store_code}
                onChange={handStore}
              >
                <option value={""}>Select Store</option>
                {stores?.data.map((item, index) => (
                  <option key={index} value={item.store_code}>
                    {item.store_code} | {item.store_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="item_code">
              <Form.Label>Item </Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="Item code"
                value={item_code}
                onChange={handleItem}
              >
                <option value={""}>Select Item</option>
                {items?.data.map((item) => (
                  <option value={item.item_code}>
                    {item.item_code} | {item.item_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* staff_number field */}
            <Form.Group className="my-2" controlId="item_quantity">
              <Form.Label>Item quantity</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Item quantity"
                value={item_quantity}
                onChange={(e) => set_item_quantity(parseInt(e.target.value))}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-3">
          submit
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
}

export default CreateBankReceipt;
