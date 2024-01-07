import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateMpesaTillMutation } from "../../../slices/finance/mpesaTillsApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreatempesaList() {
  const [mpesa_till_number, set_mpesa_till_number] = useState("");
  const [mpesa_till_name, set_mpesa_till_name] = useState("");
  const [gl_number, set_gl_number] = useState("");
  const [mpesa_till_balance, set_mpesa_till_balance] = useState("");
  const [created_by, set_created_by] = useState("");

  const [CreateTill, { isLoading }] = useCreateMpesaTillMutation();
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
      const res = await CreateTill({
        mpesa_till_number,
        mpesa_till_name,
        gl_number,
        mpesa_till_balance,
        created_by,
      }).unwrap();
      console.log(res);
      navigate("../allmpesatill");
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Mpesa Till ***</span>
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
            <Form.Group className="my-2" controlId="mpesa_till_number">
              <Form.Label>mpesa_till_number</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="mpesa_till_number"
                value={mpesa_till_number}
                onChange={(e) => set_mpesa_till_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="mpesa_till_name">
              <Form.Label>mpesa_till_name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="mpesa_till_name"
                value={mpesa_till_name}
                onChange={(e) => set_mpesa_till_name(e.target.value)}
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
            <Form.Group className="my-2" controlId="mpesa_till_balance">
              <Form.Label>mpesa_till_balance</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="mpesa_till_balance"
                value={mpesa_till_balance}
                onChange={(e) => set_mpesa_till_balance(e.target.value)}
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

export default CreatempesaList;
