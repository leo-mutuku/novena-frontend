import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";

const AddRequisitionLines = () => {
  const handleSubmit = (e) => e.preventDefault();
  const handleAdd = (e) => e.preventDefault();
  const [item, set_item] = useState({
    name: "",
    quantity: 0,
    unit_cost: 0,
    total: 0,
  });
  const [item_list, sey_item_list] = useState([]);
  return (
    <>
      <>
        <span>*** Create Requisition Line *** </span>

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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Name"
                  value={""}
                  onChange={""}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="my-2" controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Quantity"
                  value={""}
                  onChange={""}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="my-2" controlId="unit_cost">
                <Form.Label>Cost</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="unit_cost"
                  value=""
                  onChange={""}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xs={1} style={{ marginTop: "40px" }}>
              <Button onClick={handleAdd}>Add</Button>
            </Col>
          </Row>
          {item_list && item_list.length > 0 && (
            <>
              <Row>
                <hr></hr>
              </Row>
              <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th> Name</th>

                      <th>Quantity</th>
                      <th>@</th>
                      <th>Total</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item_list?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.item_name}</td>

                        <td>{item.quantity}</td>
                        <td>{item.unit_cost}</td>
                        <td>
                          {parseFloat(item.quantity) *
                            parseFloat(item.unit_cost)}
                        </td>
                        <td onClick={() => removeItem(index)}>Remove</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>

              <Button type="submit" variant="primary" className="mt-3">
                submit
              </Button>
            </>
          )}

          {/* {isLoading && <Loader />} */}
        </Form>
      </>
    </>
  );
};

export default AddRequisitionLines;
