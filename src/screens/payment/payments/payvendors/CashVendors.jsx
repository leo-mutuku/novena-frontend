import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import {
  useCreatCashVendorPaymentMutation,
  useGetAllCashAccountsQuery,
} from "../../../../slices/finance/cashAccountApiSlice";

import { useGetAllSuppliersQuery } from "../../../../slices/administration/suppliersApiSlice";
import { useGetVendorsQuery } from "../../../../slices/fleet/vendorApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function CashVendor() {
  const { userInfo } = useSelector((state) => state.auth);
  const [cash_account_id, set_cash_account_id] = useState("");
  const [vendor_id, set_vendor_id] = useState("");
  const [amount, set_amount] = useState("");
  const [amount_in_words, set_amount_in_words] = useState("");
  const [created_by, set_created_by] = useState("");

  const [createVendorCashPayment, { isLoading }] =
    useCreatCashVendorPaymentMutation();
  const { data: cashAccount } = useGetAllCashAccountsQuery();
  const { data: suppliers } = useGetVendorsQuery();

  const navigate = useNavigate();
  console.log(userInfo);
  useEffect(() => {
    set_created_by(userInfo.first_name);
    navigate();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createVendorCashPayment({
        cash_account_id,
        vendor_id,
        amount_in_words,
        amount,

        created_by,
      }).unwrap();
      if (res.status == "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        navigate("../allcashsupplierpayment");
        toast.success("Store  Item created successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <span>*** Vendor Cash Payment ***</span>
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
              <Form.Label>cash Accounts </Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="cash_account_id"
                value={cash_account_id}
                onChange={(e) => set_cash_account_id(parseInt(e.target.value))}
              >
                <option value={""}>Select cash account</option>
                {cashAccount?.data.map((item, index) => (
                  <option key={index} value={item.cash_account_id}>
                    {item.cash_account_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="vendor_id">
              <Form.Label>Vendor</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="vendor_id"
                value={vendor_id}
                onChange={(e) => set_vendor_id(e.target.value)}
              >
                <option value={""}>Select Vendor</option>
                {suppliers?.data.map((item, index) => (
                  <option key={index} value={item.vendor_id}>
                    {item.vendor_name}
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
                placeholder="Amount"
                value={amount}
                onChange={(e) => set_amount(parseFloat(e.target.value))}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="my-2" controlId="reference">
            <Form.Label>Amount in words</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Amounts in words"
              value={amount_in_words}
              onChange={(e) => set_amount_in_words(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>

        <Button type="submit" variant="primary" className="mt-3">
          submit
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
}

export default CashVendor;
