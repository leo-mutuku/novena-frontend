import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useGetAllStoreRegisterQuery } from "../../../../slices/store/storeRegisterApiSlice";
import { useGetAllItemRegisterQuery } from "../../../../slices/store/itemregisterApiSlice";
import { useCreateStoreItemMutation } from "../../../../slices/store/storeItemsApiSlice";
import { useGetAllBankAccountsQuery } from "../../../../slices/finance/bankAccountsApiSlice";
import { useGetAllSalesPeopleQuery } from "../../../../slices/sales/salesPeopleApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function BankSupplier() {
  const [bank_id, set_bank_id] = useState("");
  const [staff_id, set_staff_id] = useState("");
  const [sale_order_type, set_sale_order_type] = useState("");

  const [amount, set_amount] = useState("");
  const [reference, set_reference] = useState("");

  const [createSalesBankReceipt, { isLoading }] = useCreateStoreItemMutation();
  const { data: bankAccounts } = useGetAllBankAccountsQuery();
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
      const res = await createSalesBankReceipt({
        bank_id,
        staff_id,
        amount,
        reference,
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
      <span>*** Accept Bank Receipts ***</span>
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
              <Form.Select
                type="text"
                required
                value={sale_order_type}
                onChange={(e) => set_sale_order_type(e.target.value)}
              >
                <option value={"sales_person"}>Sales Person</option>
                <option value={"Institution"}>Institution</option>
                <option value={"Customer"}>Customer</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
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
            {/* */}
            {sale_order_type == "Customer" ? (
              <></>
            ) : sale_order_type == "Institution" ? (
              <></>
            ) : (
              <Form.Group className="my-2" controlId="item_code">
                <Form.Label>Sales person </Form.Label>
                <Form.Select
                  type="number"
                  required
                  placeholder="staff Name"
                  value={staff_id}
                  onChange={(e) => set_staff_id(e.target.value)}
                >
                  <option value={""}>Select person</option>
                  {salesPeople?.data.map((item, index) => (
                    <option value={item.staff_id} key={index}>
                      {item.first_name} {item.last_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
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
              value={reference}
              onChange={(e) => set_reference(e.target.value)}
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

export default BankSupplier;
