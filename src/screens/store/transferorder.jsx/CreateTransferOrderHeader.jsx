import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateAccountMutation } from "../../../slices/finance/accountsApiSlice";
import { useGetAllStoreItemsQuery } from "../../../slices/store/storeItemsApiSlice";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateTransaferOrderHeader() {
  const [source_store_id, set_source_store_id] = useState("");
  const [destination_store_id, set_destination_store_id] = useState("");
  const [quantity, set_quantity] = useState("");
  const [naration, set_naration] = useState("");
  const [created_by, set_created_by] = useState("");

  const [CreateAccount, { isLoading }] = useCreateAccountMutation();
  const { data: storeItemsData, isLoading: storeItemsIsLoading } =
    useGetAllStoreItemsQuery();
  const { data: itemRegisterData, isLoading: itemRegisterIsLoading } =
    useGetAllItemRegisterQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await CreateAccount({
        source_store_id,
        destination_store_id,
        quantity,
        naration,
        created_by,
      }).unwrap();
      console.log(res);
      navigate("../allaccounts");
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Transfer order *** </span>

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
            <Form.Group className="my-2" controlId="source_store_id">
              <Form.Label>Source</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="Source"
                value={source_store_id}
                onChange={(e) => set_source_store_id(e.target.value)}
              >
                <option value={""}>Source</option>
                {storeItemsData?.data.map((item, key) => (
                  <option value={item.store_item_id}>
                    {item.store_name} & {item.item_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="destination_store_id">
              <Form.Label>Destination</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="Destnation"
                value={destination_store_id}
                onChange={(e) => set_destination_store_id(e.target.value)}
              >
                {" "}
                <option value={""}>Source</option>
                {storeItemsData?.data.map((item, key) => (
                  <option value={item.store_item_id}>
                    {item.store_name} & {item.item_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => set_quantity(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="naration">
              <Form.Label>Naration</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Naration"
                value={naration}
                onChange={(e) => set_naration(e.target.value)}
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

export default CreateTransaferOrderHeader;
