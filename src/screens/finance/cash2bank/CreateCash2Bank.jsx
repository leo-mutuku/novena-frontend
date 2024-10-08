import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import {
  useCreateCashToBankMutation,
  useCashToBankTransferMutation,
} from "../../../slices/finance/cashToBankApiSlice";
import { useGetAllBankAccountsQuery } from "../../../slices/finance/bankAccountsApiSlice";
import { useGetAllCashAccountsQuery } from "../../../slices/finance/cashAccountApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateCash2Bank() {
  const [cash_account_id, set_cash_account_id] = useState(null);
  const [bank_account_id, set_bank_account_id] = useState("");
  const [amount, set_amount] = useState("");
  const [naration, set_naration] = useState("");
  const [created_by, set_created_by] = useState("");

  const [CashToBankTransfer, { isLoading }] = useCashToBankTransferMutation();
  const { data: cashAccounts } = useGetAllCashAccountsQuery();
  const { data: bankAccounts } = useGetAllBankAccountsQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await CashToBankTransfer({
        cash_account_id,
        bank_account_id,
        amount,

        created_by,
      }).unwrap();
      console.log(res);
      navigate("../cash2bank");
      toast.success("Transfer created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Account *** </span>

      <Row>
        <div>
          {" "}
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        {/* */}
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="cash_account_id">
              <Form.Label>Cash Account</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="cash_account_id"
                value={cash_account_id}
                onChange={(e) => set_cash_account_id(e.target.value)}
              >
                <option value="">Select Cash Account</option>
                {cashAccounts?.data.map((account, key) => (
                  <option key={key} value={account.cash_account_id}>
                    {account.cash_account_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="bank_account_id">
              <Form.Label>Bank Account</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="bank_account_id"
                value={bank_account_id}
                onChange={(e) => set_bank_account_id(e.target.value)}
              >
                <option value="">Select Bank Account</option>
                {bankAccounts?.data.map((account, key) => (
                  <option key={key} value={account.bank_id}>
                    {account.bank_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="amount"
                value={amount}
                onChange={(e) => set_amount(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          submit
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
}

export default CreateCash2Bank;
