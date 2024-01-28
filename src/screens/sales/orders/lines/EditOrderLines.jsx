import { Table, Button, Row, Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useGetAllItemRegisterQuery } from "../../../../slices/store/itemregisterApiSlice";
import { useGetAllAccountsQuery } from "../../../../slices/finance/accountsApiSlice";
import { useGetAllSalesOrdersIntransitBySalesOrderNumberQuery } from "../../../../slices/sales/salesOrderLinesApiSlice";
import { usePostStorePurchaseHeaderMutation } from "../../../../slices/purchase/storePurchaseHeadersApiSlice";
import ItemEdit from "./ItemEdit";
import Loader from "../../../../components/Loader";
import { toast } from "react-toastify";

function EditOrderLines({ purchase_header_id, set_edit_mode }) {
  const [checked, setChecked] = useState(false);
  const id = purchase_header_id.toString();
  const { data: purchase_order_lines, error } =
    useGetAllSalesOrdersIntransitBySalesOrderNumberQuery(id);
  console.log(purchase_order_lines?.data);
  const [post_purchase, { isLoading }] = usePostStorePurchaseHeaderMutation();

  const [update_list, set_update_list] = useState([]);

  const [new_quantity, set_new_quantiry] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (purchase_order_lines?.data) {
      set_update_list(purchase_header_id.data);
    }
  }, [purchase_order_lines?.data]);
  const inputRef = useRef(null);
  const handleQuantity = (e) => {
    console.log(inputRef.focus());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    set_purchase_list([...purchase_list, order_items]);
  };
  // const handleQuantity = (e, store_purchase_line_id) => {
  //   const newItem = purchase_order_lines?.data?.map((item) => {
  //     if (item.store_purchase_line_id == store_purchase_line_id) {
  //       return {
  //         ...item,

  //         item_cost: e.target.value * item.item_cost,
  //       };
  //     }

  //     return item;
  //   });

  //   set_update_list(newItem);
  // };
  const [item_edit_state, set_item_edit_state] = useState("none");
  const [items_to_edit, set_items_to_edit] = useState(null);
  const handleItemEdit = (e) => {
    if (items_to_edit) {
      console.log(item_edit_state);
      set_item_edit_state("block");
      return;
    }
    alert("ohh!! You need to select an item first!");
    console.log(items_to_edit);
  };
  const handleToggleCheck = (e) => {
    console.log(e.target.value);
    purchase_order_lines?.data.map((item) => {
      if (item.store_purchase_line_id == e.target.value) {
        set_items_to_edit(null);
        set_items_to_edit(item);
      }
    });
  };

  const handlePost = async (e) => {
    let store_purchase_header_id = purchase_header_id;
    try {
      const res = await post_purchase({ store_purchase_header_id }).unwrap();
      console.log(res);
      navigate("../allstorepurchase");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
          left: "0%",
          right: "0%",
          bottom: "0%",
        }}
      >
        <div style={{ display: `${item_edit_state}` }}>
          <ItemEdit
            set_item_edit_state={set_item_edit_state}
            items_to_edit={items_to_edit}
          />
        </div>
        <div
          style={{
            background: "#fff",
            padding: "2%",
            margin: "4%",
          }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton onClick={(e) => set_edit_mode("none")}>
              <Modal.Title style={{ fontSize: "14px" }}>
                <span style={{ fontSize: "14px" }}>
                  Sales order no.{purchase_header_id}
                </span>
              </Modal.Title>
            </Modal.Header>
            <hr />
            <Modal.Body>
              <>
                <div>
                  {purchase_order_lines?.data?.map((item, index) => (
                    <>
                      <div key={index} style={{ display: "block" }}>
                        <p>
                          Item order no: {item.store_purchase_line_id}{" "}
                          &nbsp;&nbsp;&nbsp; Item name: {item.item_name}{" "}
                          &nbsp;&nbsp;&nbsp; Supplied by: {item.supplier_name}{" "}
                          &nbsp;&nbsp;&nbsp; Total Cost
                        </p>
                        <hr style={{ width: "50%" }} />
                        <Row>
                          <Col>
                            <p>Cost per unit</p>
                            <p>Ksh. {item.item_cost}</p>
                          </Col>
                          <Col>
                            <p>Quantity Purchased</p>
                            <p>{item.quantity}</p>
                          </Col>

                          <Col>
                            <div>
                              <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Check this switch"
                                onChange={handleToggleCheck}
                                value={item.store_purchase_line_id}
                              />
                            </div>

                            <div>
                              <Button
                                onClick={(e) =>
                                  handleItemEdit(e, item.store_purchase_line_id)
                                }
                              >
                                Edit
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <hr />
                    </>
                  ))}
                </div>
              </>
            </Modal.Body>

            <Modal.Footer className="gap-2">
              <Button variant="success" onClick={(e) => handlePost()}>
                Post purchase order
              </Button>
              <Button
                variant="secondary"
                onClick={(e) => set_edit_mode("none")}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>
    </>
  );
}

export default EditOrderLines;
