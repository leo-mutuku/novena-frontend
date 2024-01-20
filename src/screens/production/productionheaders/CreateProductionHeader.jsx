import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateProductionHeaderMutation } from "../../../slices/production/productionHeaderApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateProductionHeader() {
  const [production_officer_i, set_production_officer_i] = useState("");
  const [production_officer_ii, set_production_officer_ii] = useState("");
  const [production_input, set_production_input] = useState("");
  const [expected_output, set_expected_output] = useState("");
  const [created_by, set_created_by] = useState("");

  const [ProductionHeader, { isLoading }] = useCreateProductionHeaderMutation();
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
      const res = await CreateAccount({
        production_officer_i,
        production_officer_ii,
        production_input,
        expected_output,
        created_by,
      }).unwrap();

      navigate("../allproductionheaders");
      toast.success("Production Iniated Successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** New Production *** </span>

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
            <Form.Group className="my-2" controlId="production_input">
              <Form.Label>Input</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="production_input"
                value={account_name}
                onChange={(e) => set_production_input(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="account_number">
              <Form.Label>Expected Output</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Expected Output"
                value={account_number}
                onChange={(e) => set_account_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="gl_number">
              <Form.Label>Poduction Officer I</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Officer I"
                value={gl_number}
                onChange={(e) => set_gl_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="account_balance">
              <Form.Label>Production officer II</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Officer II"
                value={account_balance}
                // onChange={(e) => set_account_balance(e.target.value)}
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

export default CreateProductionHeader;
