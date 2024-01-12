import { Table, Button, Row, Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import Select from "react-select";
import { MdDelete } from "react-icons/md";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useGetAllItemRegisterQuery } from "../../../../slices/store/itemregisterApiSlice";
import { useGetAllAccountsQuery } from "../../../../slices/finance/accountsApiSlice";
import { useGetAllPurchaseLinesByHeaderIdQuery } from "../../../../slices/purchase/storePurchaseLinesApiSlice";

function EditPurchaseModal({
  purchase_data,
  purchase_header_id,
  set_edit_mode,
  edit_mode,
}) {
  const id = purchase_header_id.toString();

  const { data: purchase_order_lines, error } =
    useGetAllPurchaseLinesByHeaderIdQuery(id);
  console.log(purchase_order_lines?.data);
  const [total_cost, set_total_cost] = useState(0);
  const [order_items, set_order_items] = useState({
    item_code: 0,
    item_cost: 0,
    account_number: 0,
    quantity: 0,
    total_cost_per_item: 0,
  });

  const [purchase_list, set_purchase_list] = useState([]);

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    set_total_cost(total_cost + order_items.item_cost * order_items.quantity);
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
            <Modal.Header closeButton onClick={(e) => set_edit_mode("none")}>
              <Modal.Title style={{ fontSize: "14px" }}>
                <span style={{ fontSize: "14px" }}>
                  Purchase order no. {purchase_header_id}
                </span>
              </Modal.Title>
            </Modal.Header>
            <hr />
            <Modal.Body>
              <>
                <div>
                  <input style={{ border: "none" }} value={"Item code"} />
                  <input style={{ border: "none" }} value={"Item name"} />
                  <input style={{ border: "none" }} value={"Item cost"} />
                  <input style={{ border: "none" }} value={"Item quanity"} />
                </div>
                <div>
                  {purchase_order_lines?.data?.map((item) => (
                    <div key={item.store_purchase_line_id}>
                      <input
                        style={{ border: "1px solid #ccc" }}
                        value={item.item_name}
                      />
                      <input
                        style={{ border: "1px solid #ccc" }}
                        value={item.item_code}
                      />
                      <input
                        style={{ border: "1px solid #ccc" }}
                        value={item.item_cost}
                      />
                      <input
                        style={{ border: "1px solid #ccc" }}
                        value={item.quantity}
                      />
                    </div>
                  ))}
                </div>
              </>
            </Modal.Body>

            <Modal.Footer className="gap-2">
              <Button variant="success">Post purchase order</Button>
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

export default EditPurchaseModal;
