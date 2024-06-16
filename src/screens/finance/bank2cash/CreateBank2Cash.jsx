import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateAccountMutation } from "../../../slices/finance/accountsApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateBank2Cash() {
  const [account_name, set_account_name] = useState("");
  const [account_number, set_account_number] = useState("");
  const [gl_number, set_gl_number] = useState("");
  const [account_balance, set_account_balance] = useState("");
  const [created_by, set_created_by] = useState("");

  const [CreateAccount, { isLoading }] = useCreateAccountMutation();
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
        account_name,
        account_number,
        gl_number,
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
  return (
    <>
      <span>*** Create Account *** </span>

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
            <Form.Group className="my-2" controlId="account_name">
              <Form.Label>Account name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="account_name"
                value={account_name}
                onChange={(e) => set_account_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="account_number">
              <Form.Label>Account number</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="account_number"
                value={account_number}
                onChange={(e) => set_account_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="gl_number">
              <Form.Label>Gl number</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Gl number"
                value={gl_number}
                onChange={(e) => set_gl_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="account_balance">
              <Form.Label>Account balance</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Account balance"
                value={account_balance}
                onChange={(e) => set_account_balance(e.target.value)}
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

export default CreateBank2Cash;
