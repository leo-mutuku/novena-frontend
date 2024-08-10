import { Button, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSalesLinesByHeaderIdQuery } from "../../../../slices/sales/salesOrderLinesApiSlice";
import { usePostSalesOrderMutation } from "../../../../slices/sales/salesOrderHeadersApiSlice";
import { useArchiveuPostedSalesOrderMutation } from "../../../../slices/sales/salesOrderHeadersApiSlice";
import { toast } from "react-toastify";

function EditOrderLines({ purchase_header_id, set_edit_mode }) {
  const id = purchase_header_id.toString();
  const { data: sales_order_lines, error } =
    useGetSalesLinesByHeaderIdQuery(id);

  const [post_purchase, { isLoading }] = usePostSalesOrderMutation();
  const [archiveOrder] = useArchiveuPostedSalesOrderMutation();
  const [update_list, set_update_list] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (sales_order_lines?.data) {
      set_update_list(purchase_header_id.data);
    }
  }, [sales_order_lines, id]);
  const inputRef = useRef(null);
  const handleQuantity = (e) => {
    console.log(inputRef.focus());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    set_purchase_list([...purchase_list, order_items]);
  };

  const [item_edit_state, set_item_edit_state] = useState("none");
  const [items_to_edit, set_items_to_edit] = useState(null);
  const handleItemEdit = (e) => {
    if (items_to_edit) {
      set_item_edit_state("block");
      return;
    }
    alert("ohh!! You need to select an item first!");
    console.log(items_to_edit);
  };
  const handleToggleCheck = (e) => {
    sales_order_lines?.data.map((item) => {
      if (item.store_purchase_line_id == e.target.value) {
        set_items_to_edit(null);
        set_items_to_edit(item);
      }
    });
  };

  const handlePost = async (e) => {
    let sales_order_number = purchase_header_id;
    try {
      const res = await post_purchase({
        sales_order_number: sales_order_number,
      }).unwrap();

      if (res.status === "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        toast.success("sales order posted");
      }
      navigate("../allorders");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleArchive = async (e) => {
    const res = await archiveOrder({
      sales_order_number: e.target.id,
    }).unwrap();
    if (res.status == "failed") {
      toast.error(err?.data?.message || err.error);
    } else {
      toast.success("Arched successfully");
      navigate("../allorders");
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
        <div style={{ display: `${item_edit_state}` }}></div>
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
                  SALES ORDER NUMBER.{" "}
                  <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                    {purchase_header_id}{" "}
                  </span>
                </span>
              </Modal.Title>
            </Modal.Header>
            <hr />
            <Modal.Body>
              <>
                <div>
                  {sales_order_lines?.data?.order?.map((item, index) => (
                    <>
                      <div key={index} style={{ display: "block" }}>
                        <p>
                          ITEM NUMBER:{" "}
                          <span style={{ fontStyle: "italic" }}>
                            {" "}
                            {item.order_line_id}{" "}
                          </span>{" "}
                          &nbsp;&nbsp;&nbsp; ITEM NAME:{" "}
                          <span style={{ fontStyle: "italic" }}>
                            {item.item_name}{" "}
                          </span>
                          &nbsp;&nbsp;&nbsp; ITEM COST :{" "}
                          <span style={{ fontStyle: "italic" }}>
                            {item.total}{" "}
                          </span>
                        </p>
                        <hr style={{ width: "50%" }} />
                        <Row>
                          <Col>
                            <p>Cost per unit</p>
                            <p>Ksh. {item.cost_per_item}</p>
                          </Col>
                          <Col>
                            <p>Quantity Purchased</p>
                            <p>{item.quantity}</p>
                          </Col>
                          <Col>
                            <p>Total Cost</p>
                            <p>
                              {" "}
                              <span
                                style={{
                                  fontStyle: "italic",
                                  fontWeight: "bold",
                                }}
                              >
                                Kshs. {item.total}
                              </span>
                            </p>
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
              <Button variant="danger" onClick={handleArchive} id={id}>
                Archive
              </Button>
              <Button variant="success" onClick={(e) => handlePost()}>
                Post Sales Order
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
