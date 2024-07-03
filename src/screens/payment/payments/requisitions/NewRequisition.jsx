import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useGetAllStoreRegisterQuery } from "../../../../slices/store/storeRegisterApiSlice";
import { useGetAllItemRegisterQuery } from "../../../../slices/store/itemregisterApiSlice";
import { useCreateStoreItemMutation } from "../../../../slices/store/storeItemsApiSlice";
import { useGetAllBankAccountsQuery } from "../../../../slices/finance/bankAccountsApiSlice";
import { useGetAllSalesPeopleQuery } from "../../../../slices/sales/salesPeopleApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewRequisition() {
  const [account_id, set_account_id] = useState("");
  const [description, set_description] = useState("");
  const [amount, set_amount] = useState("");
  const { data: salesPeople } = useGetAllSalesPeopleQuery();
  const { data: items } = useGetAllItemRegisterQuery();
  const { data: stores } = useGetAllStoreRegisterQuery();

  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createSalesBankReceipt({}).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <span>*** New requisition ***</span>
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
            <Form.Group className="my-2" controlId="">
              <Form.Label>Account</Form.Label>
              <Form.Select
                type="text"
                required
                value={account_id}
                onChange={(e) => set_account_id(e.target.value)}
              ></Form.Select>
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
        {/* <Row>
          <Form.Group className="my-2" controlId="reference">
            <Form.Label>Amount in words</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Amounts in words"
              value={reference}
              onChange={(e) => set_reference(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row> */}
        <Button type="submit" variant="primary" className="mt-3">
          submit
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
}

export default NewRequisition;
