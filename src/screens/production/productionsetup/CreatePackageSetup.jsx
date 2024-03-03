import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const CreatePackageSetup = () => {
  return (
    <>
      <Row>
        <Col>** Create Packaging setup **</Col>

        <Col sm={1}>
          <Link to={"../packagesetuplist"}>
            <IoIosArrowRoundBack size={45} style={{ color: "red" }} />
          </Link>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Product Name</Form.Label>
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
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Package 1 Name</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Product Store"
              value={""}
              onChange={""}
            ></Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Package 1 Store</Form.Label>
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
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Package 2 Name</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Product Store"
              value={""}
              onChange={""}
            ></Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Package 2 Store</Form.Label>
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
    </>
  );
};

export default CreatePackageSetup;
