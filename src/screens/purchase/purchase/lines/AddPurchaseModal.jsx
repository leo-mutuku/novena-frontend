import { Table, Button, Row, Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import Select from "react-select";
import { MdDelete } from "react-icons/md";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useGetAllItemRegisterQuery } from "../../../../slices/store/itemregisterApiSlice";
import { useGetAllAccountsQuery } from "../../../../slices/finance/accountsApiSlice";

function AddPurchaseModal({ purchase_data, store_purchase_id, set_mode }) {
  const { data: item_register } = useGetAllItemRegisterQuery();
  const { data: accounts } = useGetAllAccountsQuery();

  console.log(item_register);
  const [total_cost, set_total_cost] = useState(0);
  const [order_items, set_order_items] = useState({
    item_code: 0,
    item_cost: 0,
    account_number: 0,
    quantity: 0,
    total_cost_per_item: 0,
  });
  let items = [];
  const [purchase_list, set_purchase_list] = useState([]);

  console.log(item_register);
  useEffect(() => {}, [
    items,
    purchase_list,
    store_purchase_id,
    item_register,
    accounts,
    order_items,
    order_items.item_cost,
    order_items.quantity,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    set_order_items({
      ...order_items,
      total_cost_per_item: order_items.item_cost * order_items.quantity,
    });
    set_purchase_list([...purchase_list, order_items]);
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          background: "rgb(204 204 204 / 70%)",
          width: "100%",
          height: "100%",
          top: "0p%",
          left: "0p%",
          right: "0%",
          bottom: "0%",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "2%",
            margin: "4%",
          }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton onClick={() => set_mode("none")}>
              <Modal.Title style={{ fontSize: "14px" }}>
                <span style={{ fontSize: "14px" }}>
                  Purchase order no. {store_purchase_id}
                </span>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {/* List of items */}
              {purchase_list?.length === 0 ? (
                <span style={{ color: "#fd7e14" }}>
                  No items yet! Add items to purchase
                </span>
              ) : (
                <>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Item Cost</th>
                        <th>Username</th>
                        <th>Total</th>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => set_purchase_list([])}
                        >
                          Delete <MdDelete />
                        </Button>
                      </tr>
                    </thead>
                    {purchase_list.map((p_items, index) => (
                      <>
                        <tbody>
                          <tr key={p_items.item_code}>
                            {console.log(p_items)}
                            <td>{index + 1}</td>
                            <td>{p_items.item_code}</td>
                            <td>{p_items.item_cost}</td>
                            <td>{p_items.quantity}</td>
                            <td>{p_items.total_cost_per_item}</td>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() =>
                                set_purchase_list(
                                  purchase_list.filter(
                                    (a) => a.item_code !== p_items.item_code
                                  )
                                )
                              }
                            >
                              Delete <MdDelete />
                            </Button>
                          </tr>
                        </tbody>
                      </>
                    ))}
                  </Table>
                </>
              )}
              <br />
              <hr />
              <span>*** Add purchase Items ***</span> {`| Total Cost Ksh. `}
              <div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <select
                        value={order_items.item_code}
                        onChange={(e) =>
                          set_order_items({
                            ...order_items,
                            item_code: e.target.value,
                          })
                        }
                      >
                        {item_register?.data?.map((item, index) => (
                          <option value={item.item_code} key={index}>
                            {item.item_name}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="order_items">
                        <Form.Label>Item Code</Form.Label>
                        <Form.Control
                          type="number"
                          required
                          placeholder="order_items"
                          value={order_items.item_code}
                          onChange={(e) =>
                            set_order_items({
                              ...order_items,
                              item_code: e.target.value,
                            })
                          }
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
                          value={order_items.account_number}
                          onChange={(e) =>
                            set_order_items({
                              ...order_items,
                              account_number: e.target.value,
                            })
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="order_items">
                        <Form.Label>Item cost per unit</Form.Label>
                        <Form.Control
                          type="number"
                          required
                          placeholder="order_items"
                          value={order_items.item_cost}
                          onChange={(e) =>
                            set_order_items({
                              ...order_items,
                              item_cost: e.target.value,
                            })
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          required
                          placeholder="Quantity"
                          value={order_items.quantity}
                          onChange={(e) =>
                            set_order_items({
                              ...order_items,
                              quantity: e.target.value,
                            })
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                  <div>
                    <Button type="submit">Add item</Button>
                  </div>
                </Form>
                <br />
              </div>
            </Modal.Body>

            <Modal.Footer className="gap-2">
              <Button variant="primary">Save changes</Button>
              <Button variant="secondary" onClick={() => set_mode("none")}>
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>
    </>
  );
}

export default AddPurchaseModal;
