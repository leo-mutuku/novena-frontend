import { Table, Button, Row, Col, Form } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useGetAllItemRegisterQuery } from "../../../../slices/store/itemregisterApiSlice";
import { useGetAllAccountsQuery } from "../../../../slices/finance/accountsApiSlice";
import { useGetAllSuppliersQuery } from "../../../../slices/administration/suppliersApiSlice";
import { useCreateStorePurchaseLineMutation } from "../../../../slices/purchase/storePurchaseLinesApiSlice";
import { useGetAllStoreRegisterQuery } from "../../../../slices/store/storeRegisterApiSlice";

function AddPurchaseModal({ purchase_data, store_purchase_id, set_mode }) {
  let purchase_id = parseInt(store_purchase_id);

  const { data: item_register } = useGetAllItemRegisterQuery();
  const { data: accounts } = useGetAllAccountsQuery();
  const { data: suppliers } = useGetAllSuppliersQuery();
  const { data: store } = useGetAllStoreRegisterQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [purchase_line, { isLoading }] = useCreateStorePurchaseLineMutation();
  const navigate = useNavigate();
  const [total_cost, set_total_cost] = useState(0);
  const [order_items, set_order_items] = useState({
    item_code: 0,
    item_name: "",
    account_number: 0,
    account_name: "",
    supplier_name: "",
    supplier_number: "",
    supplier_email: "",
    supplier_phone_number: "",
    item_cost: 0,
    quantity: 0,
    total_cost_per_item: "",
    purchase_header_id: "",
    store_name: "",
    store_code: "",
    created_by: userInfo?.first_name,
  });

  const [purchase_list, set_purchase_list] = useState([]);

  useEffect(() => {
    if (userInfo) {
      set_order_items({
        ...order_items,
        created_by: userInfo.first_name,
        purchase_header_id: purchase_id,
      });
    }

    navigate();
  }, [userInfo, navigate, purchase_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    set_order_items({ ...order_items, created_by: userInfo.first_name });
    set_purchase_list([...purchase_list, order_items]);
  };

  const handleSave = async () => {
    try {
      if (purchase_list.length === 0) {
        alert("Add items to purchase first!");
      } else {
        const res = await purchase_line({
          store_purchase_id,
          created_by: order_items.created_by,
          purchase_line: purchase_list,
        }).unwrap();
        if (res.status === "failed") {
          toast.error("Purchase lines already added. Proceed to update");
          navigate("../allstorepurchasesintransit");
        } else {
          toast.success("Purchase lines created successfully");
          navigate("../allstorepurchasesintransit");
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
      quantity: e.target.value,
      total_cost_per_item: order_items.item_cost * e.target.value,
    });
  };
  // handle supplier
  const handleSupplier = (e) => {
    let x = suppliers?.data?.filter((a) => {
      if (a.supplier_number == e.target.value) {
        return a.supplier_name;
      }
    });

    set_order_items({
      ...order_items,
      supplier_number: e.target.value,
      supplier_name: x[0].supplier_name,
      supplier_email: x[0].supplier_email,
      supplier_phone_number: x[0].supplier_phone_number,
    });
  };
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
            <Modal.Header>
              <Modal.Title style={{ fontSize: "14px" }}>
                <span style={{ fontSize: "14px" }}>
                  Purchase order no. {store_purchase_id}
                </span>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <hr />
              <span>*** Add purchase Items ***</span>
              <div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group className="my-2" controlId="account_number">
                        <Form.Label>Account Number</Form.Label>
                        <Form.Select
                          disabled
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
                                {" "}
                                {account.account_number} |{account.account_name}
                              </option>
                            </>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="item_code">
                        <Form.Label>Item</Form.Label>
                        <Form.Select
                          type="text"
                          required
                          placeholder="Item Code"
                          value={order_items.item_code}
                          onChange={handleItemCode}
                        >
                          {" "}
                          <option>Item</option>
                          {item_register?.data
                            ?.filter(
                              (item) =>
                                item.item_code < 100 || item.item_code > 300
                            )
                            .map((item, index) => (
                              <option value={item.item_code} key={index}>
                                {item.item_code} | {item.item_name}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="my-2" controlId="supplier_number">
                        <Form.Label>Supplier </Form.Label>
                        <Form.Select
                          type="number"
                          required
                          placeholder="Supplier Number"
                          value={order_items.supplier_number}
                          onChange={handleSupplier}
                        >
                          <option value={""}>Supplier </option>
                          {suppliers?.data?.map((supplier, index) => (
                            <>
                              <option
                                key={index}
                                value={supplier.supplier_number}
                              >
                                {supplier.supplier_number} |
                                {supplier.supplier_name}
                              </option>
                            </>
                          ))}
                        </Form.Select>
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
                          <option value={""}>Store </option>
                          {store?.data?.map((store, index) => (
                            <>
                              <option key={index} value={store.store_code}>
                                {store.store_code} |{store.store_name}
                              </option>
                            </>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="my-2" controlId="naraturation">
                        <Form.Label>Total </Form.Label>
                        <Form.Control
                          type="text"
                          required
                          disabled
                          placeholder="Total"
                          value={order_items.total_cost_per_item}
                          onChange={(e) =>
                            set_order_items({
                              ...order_items,
                              naration: e.target.value,
                            })
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="naraturation">
                        <Form.Label>Naration </Form.Label>
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
                      <Form.Group className="my-2" controlId="order_items">
                        <Form.Label>Item cost per unit</Form.Label>
                        <Form.Control
                          type="number"
                          required
                          placeholder="Cost per unit (Ksh)"
                          value={order_items.item_cost}
                          onChange={handleItemCost}
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
                        <th>Item</th>
                        <th>Account</th>
                        <th>Supplier</th>
                        <th>Store</th>
                        <th>@ Cost</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => set_purchase_list([])}
                          >
                            Delete <MdDelete />
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    {purchase_list.map((p_items, index) => (
                      <>
                        <tbody>
                          <tr key={p_items.item_code}>
                            <td>{index + 1}</td>
                            <td>
                              {p_items.item_code} | {p_items.item_name}
                            </td>
                            <td>
                              {p_items.account_number} | {p_items.account_name}
                            </td>
                            <td>
                              {p_items.supplier_number} |{" "}
                              {p_items.supplier_name}
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
                                  set_purchase_list(
                                    purchase_list.filter(
                                      (a) => a.item_code !== p_items.item_code
                                    )
                                  )
                                }
                              >
                                Delete <MdDelete />
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </>
                    ))}
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

export default AddPurchaseModal;
