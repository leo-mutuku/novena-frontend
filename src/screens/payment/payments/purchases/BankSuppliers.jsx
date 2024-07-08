import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useCreateBankSupplierPaymentMutation } from "../../../../slices/finance/bankAccountsApiSlice";
import { useGetAllBankAccountsQuery } from "../../../../slices/finance/bankAccountsApiSlice";
import { useGetAllSuppliersQuery } from "../../../../slices/administration/suppliersApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function BankSuppliers() {
  const [bank_id, set_bank_id] = useState("");
  const [supplier_id, set_supplier_id] = useState("");
  const [reference, set_reference] = useState("");
  const [amount, set_amount] = useState("");
  const [amount_in_words, set_amount_in_words] = useState("");
  const [created_by, set_created_by] = useState("");

  const [createSuplierBankPayment, { isLoading }] =
    useCreateBankSupplierPaymentMutation();
  const { data: bankAccounts } = useGetAllBankAccountsQuery();
  const { data: suppliers } = useGetAllSuppliersQuery();

  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createSuplierBankPayment({
        bank_id,
        supplier_id,
        amount_in_words,
        amount,
        reference,
        created_by,
      }).unwrap();
      if (res.status == "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        navigate("../allstoreitems");
        toast.success("Store  Item created successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <span>*** Supplier Bank Payment ***</span>
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
            <Form.Group className="my-2" controlId="bank_id">
              <Form.Label>Bank Accounts </Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="bank_id"
                value={bank_id}
                onChange={(e) => set_bank_id(e.target.value)}
              >
                <option value={""}>Select bank account</option>
                {bankAccounts?.data.map((item, index) => (
                  <option key={index} value={item.bank_id}>
                    {item.bank_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="supplier_id">
              <Form.Label>Suppliers</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="supplier_id"
                value={supplier_id}
                onChange={(e) => set_supplier_id(e.target.value)}
              >
                <option value={""}>Select supplier</option>
                {suppliers?.data.map((item, index) => (
                  <option key={index} value={item.supplier_id}>
                    {item.supplier_name}
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
          <Col>
            <Form.Group className="my-2" controlId="reference">
              <Form.Label>Reference</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Reference"
                value={reference}
                onChange={(e) => set_reference(e.target.value)}
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

export default BankSuppliers;
