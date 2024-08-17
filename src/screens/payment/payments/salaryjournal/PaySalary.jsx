import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetRequisitionLineByIdQuery } from "../../../../slices/payment/requisitionLineApiSlice";
import { useMakePaymentMutation } from "../../../../slices/payment/requisitionHeaderApiSlice";
import { useGetPayrollEntriesQuery } from "../../../../slices/payroll/payrollLinesApiSlice";
import { useGetAllBankAccountsQuery } from "../../../../slices/finance/bankAccountsApiSlice";
import { usePaysalaryMutation } from "../../../../slices/payroll/payrollHeadersApiSlice";

import { useGetAllCashAccountsQuery } from "../../../../slices/finance/cashAccountApiSlice";
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const PaySalary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const [paying_account_type, set_paying_account_type] = useState("");
  const [bank, set_bank] = useState("");
  const [cash, set_cash] = useState("");

  const { data: requisition } = useGetRequisitionLineByIdQuery(id);

  const { data: bankAccounts } = useGetAllBankAccountsQuery();
  const { data: cashAccounts } = useGetAllCashAccountsQuery();
  const { data: payrollEntries } = useGetPayrollEntriesQuery(id);
  const [paysalary] = usePaysalaryMutation();
  const handlepostRequisition = async () => {
    try {
      //check fields not empty
      if (!paying_account_type) {
        toast.error("Please Select Account Type");
        return;
      }
      if (paying_account_type == "bank" && !bank) {
        toast.error("Please Select Bank");
        return;
      }
      if (paying_account_type == "cash" && !cash) {
        toast.error("Please Select Cash");
        return;
      }
      const res = await paysalary({
        id,
        paying_account_type,
        bank,
        cash,
      }).unwrap();
      if (res.status == "success") {
        toast.success("Paid Successfully");
        navigate("../allpaidsalaryjournals");
      } else {
        toast.error(res.message || "Error Not Posted");
      }
    } catch (error) {
      toast.error(error.data?.message || "Error Not Posted");
    }
  };

  const [total, set_total] = useState(0);
  const [test, set_test] = useState(0);

  useEffect(() => {
    if (requisition?.data) {
      set_total(
        requisition.data.reduce((sum, item) => sum + parseFloat(item.amount), 0)
      );
    }
  }, [requisition]);

  return (
    <>
      <span> ** Payroll Number {id} **</span>
      <Row>
        <Col></Col>

        <Col xs={3}>
          <Button variant="danger">Reject</Button> &nbsp;
          <Button onClick={handlepostRequisition} variant="success">
            Pay
          </Button>
        </Col>
      </Row>
      <Row>
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
                onChange={(e) => set_cash(e.target.value)}
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
      </Row>

      <hr></hr>
      {payrollEntries?.data && (
        <Table striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th> Staff</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net Pay</th>
            </tr>
          </thead>
          <tbody>
            {payrollEntries?.data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {item.first_name} {item.last_name}
                </td>
                <td>{item.gross_pay}</td>
                <td>{item.total_deductions}</td>
                <td>{item.net_pay}</td>
              </tr>
            ))}
          </tbody>
          <thead>
            <tr>
              <th>{payrollEntries?.data.length}</th>
              <th> Total</th>
              <th>
                {payrollEntries?.data?.reduce((total, entry) => {
                  return total + parseFloat(entry.gross_pay);
                }, 0)}
              </th>
              <th>
                {" "}
                {payrollEntries?.data?.reduce((total, entry) => {
                  return total + parseFloat(entry.total_deductions);
                }, 0)}{" "}
              </th>
              <th>
                {" "}
                {payrollEntries?.data?.reduce((total, entry) => {
                  return total + parseFloat(entry.net_pay);
                }, 0)}{" "}
              </th>
            </tr>
          </thead>
        </Table>
      )}
    </>
  );
};

export default PaySalary;
