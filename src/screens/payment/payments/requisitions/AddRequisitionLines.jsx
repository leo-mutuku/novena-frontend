import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useCreatePaymentPurchaseMutation } from "../../../../slices/payment/requisitionLineApiSlice";

const AddRequisitionLines = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, set_item] = useState({
    name: "",
    quantity: 0,
    cost: 0,
  });
  const [createrequisitionLine] = useCreatePaymentPurchaseMutation();
  const [item_list, set_item_list] = useState([]);
  const [total, set_title] = useState(0);
  const handleSubmit = async (e) => {
    alert("");
    e.preventDefault();
    const res = await createrequisitionLine({
      id,
      item_list,
    }).unwrap();
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (item.name == "" || item.quantity == 0 || item.cost == 0) {
      toast.error("All field must be filled");
      return;
    }

    set_item_list([...item_list, item]);
  };
  const hanldeQuantity = (e) => {
    let q = parseFloat(e.target.value);
    set_item({ ...item, quantity: q });
  };
  const handleCost = (e) => {
    let c = parseFloat(e.target.value);
    set_item({ ...item, cost: c });
  };
  const removeItem = (index) => {
    item_list.filter((item, i) => {
      if (i === index) {
        item_list.splice(i, 1);
        set_item_list([...item_list]);
      }
    });
  };
  useEffect(() => {}, [item_list]);

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
        <Form>
          {/* */}
          <Row>
            <Col>
              <Form.Group className="my-2" controlId="item_name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Name"
                  value={item.name}
                  onChange={(e) => set_item({ ...item, name: e.target.value })}
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
                  value={item.quantity}
                  onChange={hanldeQuantity}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="my-2" controlId="unit_cost">
                <Form.Label>Cost</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="cost"
                  value={item.cost}
                  onChange={(e) =>
                    set_item({ ...item, cost: parseFloat(e.target.value) })
                  }
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
                        <td>{item.name}</td>

                        <td>{item.quantity}</td>
                        <td>{item.cost}</td>
                        <td>{item.quantity * item.cost}</td>
                        <td onClick={() => removeItem(index)}>Remove</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>

              <Button onClick={handleSubmit} variant="primary" className="mt-3">
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
