import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useGetAllCustomersQuery } from "../../../slices/administration/customersApiSlice";
import { useGetAllInstitutionsQuery } from "../../../slices/administration/institutionsApiSlice";

import { useCreateStoreItemMutation } from "../../../slices/store/storeItemsApiSlice";
import {
  useGetAllBankAccountsQuery,
  useCreateBankSaleOrderReceiptMutation,
} from "../../../slices/finance/bankAccountsApiSlice";
import { useGetAllSalesPeopleQuery } from "../../../slices/sales/salesPeopleApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckBox } from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";

function CreateBankReceipt() {
  const [bank_id, set_bank_id] = useState("");
  const [staff_id, set_staff_id] = useState("");
  const [institution_id, set_institution_id] = useState("");
  const [customer_id, set_customer_id] = useState("");
  const [sale_order_type, set_sale_order_type] = useState("");
  const [reference, set_reference] = useState("");
  const [amount, set_amount] = useState("");
  const [amount_in_words, set_amount_in_words] = useState("");
  const [created_by, set_created_by] = useState("");

  const [createSalesBankReceipt, { isLoading }] = useCreateStoreItemMutation();
  const [Bankreceipts] = useCreateBankSaleOrderReceiptMutation();
  const { data: bankAccounts } = useGetAllBankAccountsQuery();
  const { data: salesPeople } = useGetAllSalesPeopleQuery();

  const { data: institutions } = useGetAllInstitutionsQuery();
  const { data: customers } = useGetAllCustomersQuery();

  const handleCustomer = (_, newInputValue) => {
    let x = customers?.data?.filter((a) => {
      if (a.full_name == newInputValue) {
        return a.customer_id;
      }
    });

    set_customer_id(x[0].customer_id);
  };

  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Bankreceipts({
        bank_id,
        staff_id,
        customer_id,
        institution_id,
        amount_in_words,
        sale_order_type,
        amount,
        reference,
      }).unwrap();
      if (res.status == "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        // navigate("../allstoreitems");
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
                <option value={""}>Sale order type</option>
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
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={customers?.data}
                getOptionLabel={(option) => option.full_name}
                renderInput={(full_name) => (
                  <TextField {...full_name} label="Customers" />
                )}
                inputValue={customers.full_name}
                onInputChange={(event, newInputValue) =>
                  handleCustomer(event, newInputValue)
                }
                isOptionEqualToValue={(option, value) =>
                  option.full_name === value.full_name
                }
              />
            ) : sale_order_type == "Institution" ? (
              <Form.Group className="my-2" controlId="institution">
                <Form.Label>Institution</Form.Label>
                <Form.Select
                  type="text"
                  required
                  placeholder="Institution"
                  value={institution_id}
                  onChange={(e) => set_institution_id(e.target.value)}
                >
                  <option value={``}> Select institution</option>
                  {institutions?.data.map((item, index) => (
                    <option value={item.institution_id}>
                      {item.institution_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            ) : (
              <Form.Group className="my-2" controlId="staff_id">
                <Form.Label>Sales person</Form.Label>
                <Form.Select
                  required
                  type="text"
                  placeholder="sales_person_number"
                  value={staff_id}
                  onChange={(e) => set_staff_id(e.target.value)}
                >
                  <option value={""}> Select option</option>
                  {salesPeople?.data
                    .filter(
                      (order) =>
                        order.first_name !== "Customer" &&
                        order.first_name !== "Institution"
                    )
                    .map((item, index) => (
                      <>
                        <option key={index} value={item.staff_id}>
                          {item.first_name} {item.last_name}
                        </option>
                      </>
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

export default CreateBankReceipt;
