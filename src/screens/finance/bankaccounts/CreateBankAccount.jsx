import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateBankMutation } from "../../../slices/finance/bankAccountsApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateBankAccount() {
  const [bank_number, set_bank_number] = useState("");
  const [bank_name, set_bank_name] = useState("");
  const [gl_number, set_gl_number] = useState("");
  const [bank_balance, set_bank_balance] = useState("");
  const [created_by, set_created_by] = useState("");

  const [createBank, { isLoading }] = useCreateBankMutation();
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
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
      const res = await createBank({
        bank_number,
        bank_name,
        gl_number,
        bank_balance,
        created_by,
      }).unwrap();
      console.log(res);
      navigate("../bankaccounts");
      toast.success("Bank Account created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Bank Account ***</span>
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
            <Form.Group className="my-2" controlId="bank_number">
              <Form.Label>Bank number</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="bank_number"
                value={bank_number}
                onChange={(e) => set_bank_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="bank_name">
              <Form.Label>Bank name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="bank_name"
                value={bank_name}
                onChange={(e) => set_bank_name(e.target.value)}
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
            <Form.Group className="my-2" controlId="bank_balance">
              <Form.Label>Bank balance</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="bank_balance"
                value={bank_balance}
                onChange={(e) => set_bank_balance(e.target.value)}
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

export default CreateBankAccount;
