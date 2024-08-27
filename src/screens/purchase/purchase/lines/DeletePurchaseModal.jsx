import { Table, Button, Row, Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useGetAllItemRegisterQuery } from "../../../../slices/store/itemregisterApiSlice";
import { useGetAllAccountsQuery } from "../../../../slices/finance/accountsApiSlice";

function DeletePurchaseModal({
  purchase_data,
  store_purchase_id,
  set_mode_delete,
}) {
  const { data: item_register } = useGetAllItemRegisterQuery();
  const { data: accounts } = useGetAllAccountsQuery();

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
            <Modal.Header closeButton onClick={() => set_mode_delete("none")}>
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
                  Hold on! Purchase order number {store_purchase_id} will be
                  deleted.
                </span>
              ) : (
                <></>
              )}
              <br />
              <hr />
              <span>*** Click the delete button on your right ***</span>{" "}
              <div>
                <br />
              </div>
            </Modal.Body>

            <Modal.Footer className="gap-2">
              <Button variant="danger">Delete purchase order</Button>
              <Button
                variant="secondary"
                onClick={() => set_mode_delete("none")}
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

export default DeletePurchaseModal;
