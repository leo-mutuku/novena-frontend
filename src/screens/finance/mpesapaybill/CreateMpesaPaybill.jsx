import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateMpesaPaybillMutation } from "../../../slices/finance/mpesaPaybillsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateMpesaPaybill() {
  const [mpesa_paybills_number, set_mpesa_paybills_number] = useState("");
  const [mpesa_paybills_name, set_mpesa_paybills_name] = useState("");
  const [gl_number, set_gl_number] = useState("");
  const [mpesa_paybills_balance, set_mpesa_paybills_balance] = useState("");
  const [created_by, set_created_by] = useState("");

  const [CreatePaybill, { isLoading }] = useCreateMpesaPaybillMutation();
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
      const res = await CreatePaybill({
        mpesa_paybills_number,
        mpesa_paybills_name,
        gl_number,
        mpesa_paybills_balance,
        created_by,
      }).unwrap();
      console.log(res);
      navigate("../allmpesapaybills");
      toast.success("Mpesa paybill created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Mpesa Paybill ***</span>
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
            <Form.Group className="my-2" controlId="mpesa_paybills_number">
              <Form.Label>Mpesa paybills number</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="mpesa_paybills_number"
                value={mpesa_paybills_number}
                onChange={(e) => set_mpesa_paybills_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="mpesa_paybills_name">
              <Form.Label>mpesa_paybills_name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="mpesa_paybills_name"
                value={mpesa_paybills_name}
                onChange={(e) => set_mpesa_paybills_name(e.target.value)}
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
            <Form.Group className="my-2" controlId="mpesa_paybills_balance">
              <Form.Label>Mpesa paybills balance</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Account balance"
                value={mpesa_paybills_balance}
                onChange={(e) => set_mpesa_paybills_balance(e.target.value)}
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

export default CreateMpesaPaybill;
