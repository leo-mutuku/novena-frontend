import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const ItemEdit = ({ set_item_edit_state, items_to_edit }) => {
  const [item_to_edit, set_item_to_edit] = useState(items_to_edit);

  return (
    <div
      style={{
        background: "rgb(52 51 51 / 99%)",
        width: "85%",
        position: "absolute",
        padding: "2%",
        marginTop: "2%",
        marginLeft: "5%",
        zIndex: "99999",
      }}
    >
      <div style={{ color: "white" }}>
        <Row>
          <span
            style={{
              textAlign: "right",
              marginRight: "0px",
              cursor: "pointer",
              zIndex: "9999",
            }}
            onClick={(e) => set_item_edit_state("none")}
          >
            X
          </span>
          <span style={{ marginTop: "-2%" }}>
            Purchase order Item: {items_to_edit?.store_purchase_line_id}{" "}
            &nbsp;&nbsp;&nbsp; Item No: {} &nbsp;&nbsp;&nbsp; Supplier Name:
            &nbsp;&nbsp;&nbsp; Supplier No:{} &nbsp;&nbsp;&nbsp; Total Cost:
            &nbsp;&nbsp;&nbsp; New total cost: &nbsp;&nbsp;&nbsp;
          </span>
        </Row>
      </div>
      <div>
        <hr style={{ color: "white" }} />
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="quantity">
              <Form.Label style={{ color: "white" }}>Quantity</Form.Label>
              <Form.Control disabled type="number" required></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="account_number">
              <Form.Label style={{ color: "white" }}>New Quantity</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="New Quantity"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ItemEdit;
