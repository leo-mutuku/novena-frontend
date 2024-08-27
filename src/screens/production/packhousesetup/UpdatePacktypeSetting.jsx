import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const UpdatePacktypeSetting = () => {
  return (
    <>
      <Row>
        <Col>** Create Product setup **</Col>

        <Col sm={1}>
          <Link to={"../packagesetuplist"}>
            <IoIosArrowRoundBack size={45} style={{ color: "red" }} />
          </Link>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="Name">
            <Form.Label>Product Name</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Product Name"
              value={""}
              onChange={""}
            ></Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Product Store</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Product Store"
              value={""}
              onChange={""}
            ></Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col sm={2}>
          {" "}
          <Button variant="outlined">Submit</Button>
        </Col>
      </Row>
    </>
  );
};

export default UpdatePacktypeSetting;
