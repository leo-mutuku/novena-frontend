import { Table, Button, Row, Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import Select from "react-select";
import { MdDelete } from "react-icons/md";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useGetAllItemRegisterQuery } from "../../../../slices/store/itemregisterApiSlice";
import { useGetAllAccountsQuery } from "../../../../slices/finance/accountsApiSlice";
import { useGetAllSuppliersQuery } from "../../../../slices/administration/suppliersApiSlice";
import { useCreateStorePurchaseLineMutation } from "../../../../slices/purchase/storePurchaseLinesApiSlice";

function AddPurchaseModal({ purchase_data, store_purchase_id, set_mode }) {
  const { data: item_register } = useGetAllItemRegisterQuery();
  const { data: accounts } = useGetAllAccountsQuery();
  const { data: suppliers } = useGetAllSuppliersQuery();
  const [purchase_line, { isLoading }] = useCreateStorePurchaseLineMutation();

  console.log(item_register);
  const [total_cost, set_total_cost] = useState(0);
  const [order_items, set_order_items] = useState({
    item_code: "",
    account_number: "",
    supplier_number: "",
    item_cost: "",
    quantity: "",
    total_cost_per_item: "",
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
    set_total_cost(total_cost + order_items.item_cost * order_items.quantity);
    set_purchase_list([...purchase_list, order_items]);
  };

  const handleSave = async (e) => {
    console.log("");
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
                        <th>Item Code</th>
                        <th>Account no</th>
                        <th>Supplier no</th>
                        <th>@ Cost</th>
                        <th>Quantity</th>
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
                            <td>{index + 1}</td>
                            <td>{p_items.item_code}</td>
                            <td>{p_items.account_number}</td>
                            <td>{p_items.supplier_number}</td>
                            <td>{p_items.item_cost}</td>
                            <td>{p_items.quantity}</td>
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
              <span>*** Add purchase Items ***</span>{" "}
              {`| Total Cost Ksh. ${total_cost} `}
              <div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group className="my-2" controlId="order_items">
                        <Form.Label>Item Code</Form.Label>
                        <Form.Select
                          type="text"
                          required
                          placeholder="Item Code"
                          value={order_items.item_code}
                          onChange={(e) =>
                            set_order_items({
                              ...order_items,
                              item_code: e.target.value,
                            })
                          }
                        >
                          {" "}
                          <option>Item Code</option>
                          {item_register?.data?.map((item, index) => (
                            <option value={item.item_code} key={index}>
                              {item.item_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="account_number">
                        <Form.Label>Account Number</Form.Label>
                        <Form.Select
                          type="number"
                          required
                          placeholder="Account Number"
                          value={order_items.account_number}
                          onChange={(e) =>
                            set_order_items({
                              ...order_items,
                              account_number: e.target.value,
                            })
                          }
                        >
                          <option>Account Number</option>
                          {accounts?.data?.map((account, index) => (
                            <>
                              <option
                                key={index}
                                value={account.account_number}
                              >
                                {account.account_name}
                              </option>
                            </>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="supplier_number">
                        <Form.Label>Supplier Number</Form.Label>
                        <Form.Select
                          type="number"
                          required
                          placeholder="Supplier Number"
                          value={order_items.supplier_number}
                          onChange={(e) =>
                            set_order_items({
                              ...order_items,
                              supplier_number: e.target.value,
                            })
                          }
                        >
                          <option>Supplier Number</option>
                          {suppliers?.data?.map((supplier, index) => (
                            <>
                              <option value={supplier.supplier_number}>
                                {supplier.supplier_name}
                              </option>
                            </>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="order_items">
                        <Form.Label>Item cost per unit</Form.Label>
                        <Form.Control
                          type="number"
                          required
                          placeholder="Cost per unit (Ksh)"
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
                  <Row>
                    <Col>
                      <Form.Group className="my-2" controlId="naraturation">
                        <Form.Control
                          type="text"
                          required
                          placeholder="Naration"
                          value={order_items.naration}
                          onChange={(e) =>
                            set_order_items({
                              ...order_items,
                              naration: e.target.value,
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
              <Button onClick={handleSave} variant="primary">
                Save changes
              </Button>
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
