import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAutoStockTakeLinesByIdQuery } from "../../../slices/store/storeItemsApiSlice";
import { useMakePaymentMutation } from "../../../slices/payment/requisitionHeaderApiSlice";
import { useGetAllBankAccountsQuery } from "../../../slices/finance/bankAccountsApiSlice";
import { useGetAllCashAccountsQuery } from "../../../slices/finance/cashAccountApiSlice";
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const AutoStockTakeLines = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const [paying_account_type, set_paying_account_type] = useState("");
  const [bank, set_bank] = useState("");
  const [cash, set_cash] = useState("");

  const { data: requisition } = useGetAutoStockTakeLinesByIdQuery(id);
  const [postRequisition] = useMakePaymentMutation();
  const { data: bankAccounts } = useGetAllBankAccountsQuery();
  const { data: cashAccounts } = useGetAllCashAccountsQuery();
  const handlepostRequisition = async () => {
    try {
      const res = await postRequisition({
        paying_account_type,
        bank,
        cash,
      }).unwrap();
      if (res.status == "success") {
        toast.success("Requisition Posted Successfully");
        navigate("../allpostedrequisition");
      } else {
        toast.error(res.message || "Requisition Not Posted");
      }
    } catch (error) {
      toast.error(error.data?.message || "Requisition Not Posted");
    }
  };

  const [total, set_total] = useState(0);

  useEffect(() => {
    if (requisition?.data) {
      set_total(
        requisition.data.reduce((sum, item) => sum + parseFloat(item.amount), 0)
      );
    }
  }, [requisition]);

  console.log(requisition);

  return (
    <>
      <span> ** Auto Stock Take Entry Number {id}</span>
      {/* <Row>
        <Col>
          {" "}
          <Form.Group className="my-2" controlId="amount">
            <Form.Label>Cash/ Bank</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Description"
              value={paying_account_type}
              onChange={(e) => set_paying_account_type(e.target.value)}
            >
              <option value="">Select</option>
              <option value="bank">Bank</option>
              <option value="cash">Cash</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          {paying_account_type == "bank" && (
            <Form.Group className="my-2" controlId="amount">
              <Form.Label>Bank</Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="Description"
                value={bank}
                onChange={(e) => set_bank(e.target.value)}
              >
                <option value="">Select</option>
                {bankAccounts?.data.map((item, index) => (
                  <option value={item.bank_id}>{item.bank_name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
          {paying_account_type == "cash" && (
            <Form.Group className="my-2" controlId="amount">
              <Form.Label>Cash</Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="Description"
                value={cash}
                onChange={(e) => set_name(e.target.value)}
              >
                <option value="">Select</option>
                {cashAccounts?.data.map((item, index) => (
                  <option value={item.cash_account_id}>
                    {item.cash_account_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
        </Col>
      </Row> */}
      <hr></hr>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Store</th>
            <th>Name</th>
            <th>Code</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {requisition?.data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td style={{ fontSize: "11px" }}>{item.store_item_name}</td>
              <td>{item.item_name}</td>
              <td>{item.item_code}</td>
              <td>{item.item_quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <Col></Col>
      </Row>
    </>
  );
};

export default AutoStockTakeLines;
