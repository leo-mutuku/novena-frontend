import { Table, Button, Row, Col, Form } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useGetAllItemRegisterQuery } from "../../../../slices/store/itemregisterApiSlice";
import { useGetAllAccountsQuery } from "../../../../slices/finance/accountsApiSlice";
import { useGetAllSuppliersQuery } from "../../../../slices/administration/suppliersApiSlice";
import { useCreateSalesOrderLineMutation } from "../../../../slices/sales/salesOrderLinesApiSlice";
import { useGetAllStoreRegisterQuery } from "../../../../slices/store/storeRegisterApiSlice";

function AddOrderLines({ purchase_data, store_purchase_id, set_mode }) {
  let purchase_id = parseInt(store_purchase_id);

  const { data: item_register } = useGetAllItemRegisterQuery();
  const { data: accounts } = useGetAllAccountsQuery();
  const { data: suppliers } = useGetAllSuppliersQuery();
  const { data: store } = useGetAllStoreRegisterQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [sales_order_line, { isSucces }] = useCreateSalesOrderLineMutation();
  const navigate = useNavigate();
  const [total_cost, set_total_cost] = useState(0);
  const [order_items, set_order_items] = useState({
    sales_order_number: 0,
    item_code: 0,
    item_name: "",
    account_number: 0,
    account_name: "",
    item_cost: 0,
    quantity: 0,
    total_cost_per_item: "",
    store_name: "",
    store_code: "",
    created_by: userInfo?.first_name,
  });

  const [sales_list, set_sales_list] = useState([]);

  useEffect(() => {
    if (userInfo) {
      set_order_items({
        ...order_items,
        created_by: userInfo.first_name,
        sales_order_number: purchase_id,
      });
    }

    navigate();
  }, [userInfo, navigate, purchase_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(order_items);
    set_order_items({ ...order_items, created_by: userInfo.first_name });
    set_sales_list([...sales_list, order_items]);
  };

  const handleSave = async () => {
    try {
      if (sales_list.length === 0) {
        alert("Add items to purchase first!");
      } else {
        const res = await sales_order_line({
          sales_list,
        }).unwrap();
        if (res.status === "failed") {
          toast.error(res.message);
        } else {
          toast.success("Sales order lines created successfully");
          navigate("../allordersintansit");
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  //handle item
  const handleItemCode = (e) => {
    let x = item_register?.data?.filter((a) => {
      if (a.item_code == e.target.value) {
        return a.item_name;
      }
    });

    let y = accounts?.data?.filter((a) => {
      if (a.account_number == x[0].account_number) {
        return a.account_name;
      }
    });

    set_order_items({
      ...order_items,
      item_code: parseInt(e.target.value),
      item_name: x[0].item_name,
      item_cost: parseInt(x[0].current_price),
      account_name: y[0].account_name,
      account_number: x[0].account_number,

      total_cost_per_item: x[0].current_price * order_items.quantity,
    });
  };

  // handle cost
  const handleItemCost = (e) => {
    set_order_items({
      ...order_items,
      item_cost: e.target.value,
      total_cost_per_item: e.target.value * order_items.quantity,
    });
  };
  // handle quantity
  const handleQuantity = (e) => {
    set_order_items({
      ...order_items,
      quantity: parseInt(e.target.value),
      total_cost_per_item: order_items.item_cost * e.target.value,
    });
  };
  // handle supplier
  const handleStore = (e) => {
    let x = store?.data?.filter((a) => {
      if (a.store_code == e.target.value) {
        return a.store_name;
      }
    });
    set_order_items({
      ...order_items,
      store_code: e.target.value,
      store_name: x[0].store_name,
    });
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
                  Sales Order no. {store_purchase_id}
                </span>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <hr />
              <span>*** Add Order Items ***</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>Order Item Total : {}</span>
              <div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group className="my-2" controlId="item_code">
                        <Form.Label>Order Item</Form.Label>
                        <Form.Select
                          type="text"
                          required
                          placeholder="Item Code"
                          value={order_items.item_code}
                          onChange={handleItemCode}
                        >
                          {" "}
                          <option>Order Item</option>
                          {item_register?.data?.map((item, index) => (
                            <option value={item.item_code} key={index}>
                              {item.item_code} | {item.item_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="my-2" controlId="order_items">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          required
                          placeholder="Cost per unit (Ksh)"
                          value={order_items.item_cost}
                          onChange={handleItemCost}
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
                          onChange={handleQuantity}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="store">
                        <Form.Label>Store </Form.Label>
                        <Form.Select
                          type="number"
                          required
                          placeholder="Store"
                          value={order_items.store_code}
                          onChange={handleStore}
                        >
                          <option>Store</option>
                          {store?.data.map((item, index) => (
                            <option key={index} value={item.store_code}>
                              {item.store_code} | {item.store_name}
                            </option>
                          ))}
                        </Form.Select>
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
              {/* List of items */}
              {sales_list?.length === 0 ? (
                <span style={{ color: "#fd7e14" }}>
                  No items yet! Add items to Sales Order
                </span>
              ) : (
                <>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Account</th>
                        <th>Store</th>
                        <th>@ Cost</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => set_sales_list([])}
                          >
                            Delete <MdDelete />
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sales_list.map((p_items, index) => (
                        <tr key={p_items.index}>
                          <td>{index + 1}</td>
                          <td>
                            {p_items.item_code} | {p_items.item_name}
                          </td>
                          <td>
                            {p_items.account_number} | {p_items.account_name}
                          </td>
                          <td>
                            {p_items.store_code} | {p_items.store_name}
                          </td>
                          <td>{p_items.item_cost}</td>
                          <td>{p_items.quantity}</td>
                          <td>{p_items.total_cost_per_item}</td>
                          <td>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() =>
                                set_sales_list(
                                  sales_list.filter(
                                    (a) => a.item_code !== p_items.item_code
                                  )
                                )
                              }
                            >
                              Delete <MdDelete />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
              <br />
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

export default AddOrderLines;
