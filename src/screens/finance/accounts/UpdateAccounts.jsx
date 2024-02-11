import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import {
  useGetAccountByIdQuery,
  useUpdateAccountByIdMutation,
} from "../../../slices/finance/accountsApiSlice";

function UpdateAccounts() {
  const [account_name, set_account_name] = useState("");
  const [account_number, set_account_number] = useState("");
  const [gl_number, set_gl_number] = useState("");
  const [account_balance, set_account_balance] = useState("");

  const [updateAccount, { isError, isSuccess, error: errorUpdate }] =
    useUpdateAccountByIdMutation();

  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const navigate = useNavigate();

  const { data: account, error, isLoading } = useGetAccountByIdQuery(id);

  useEffect(() => {
    if (id && errorUpdate) {
      toast.error(`Error occured `);
    }
  }, [id, account]);

  useEffect(() => {
    if (id) {
      if (account) {
        set_account_name(account.data.account_name);
        set_account_number(account.data.account_number);
        set_account_balance(account.data.account_balance);
        set_gl_number(account.data.gl_number);
      }
    }
  }, [id, account]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(errorUpdate);
    try {
      const result = await updateAccount({
        id: id,
        data: { account_name, account_number, account_balance, gl_number },
      }).unwrap();

      if (result == "failed") {
        toast.error(error.message);
      } else {
        toast.success(result.message);
        navigate("../allaccounts");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <span>*** Edit GL ***</span>
      <Row>
        <div>
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="Account_Name">
              <Form.Label>Account Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Account Name"
                value={account_name}
                onChange={(e) => set_account_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="Account_number">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Account Number"
                value={account_number}
                onChange={(e) => set_account_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="account_balance">
              <Form.Label>Account Balance</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Account Balance"
                value={account_balance}
                onChange={(e) => set_account_balance(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="gl_number">
              <Form.Label>GL Number</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="GL Number"
                value={gl_number}
                onChange={(e) => set_gl_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default UpdateAccounts;
