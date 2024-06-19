import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useCreateAccountMutation,
  useGetAllAccountsQuery,
} from "../../../slices/finance/accountsApiSlice";

// import { useGetAllAccountsQuery } from "../../../slices/finance/accountsApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateRequisition() {
  const [item_name, set_item_name] = useState("");
  const [account_number, set_account_number] = useState("");
  const [quantity, set_quantity] = useState("");
  const [account_balance, set_account_balance] = useState("");
  const [created_by, set_created_by] = useState("");

  const [CreateAccount, { isLoading }] = useCreateAccountMutation();
  const { data: accountsData } = useGetAllAccountsQuery();
  const { userInfo } = useSelector((state) => state.auth);

  console.log(accountsData?.data);

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
        item_name,
        account_number,
        quantity,
        account_balance,
        created_by,
      }).unwrap();

      navigate("../allstorerequisitions");
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Requisition *** </span>

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
            <Form.Group className="my-2" controlId="account_number">
              <Form.Label>Account Name</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="account_number"
                value={account_number}
                onChange={(e) => set_account_number(e.target.value)}
              >
                <option value={""}> Account Name</option>
                {accountsData?.data.map((item, key) => (
                  <option value={item.account_number}>
                    {item.account_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
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
          <Col xs={1} style={{ marginTop: "40px" }}>
            <Button>Add</Button>
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

export default CreateRequisition;
