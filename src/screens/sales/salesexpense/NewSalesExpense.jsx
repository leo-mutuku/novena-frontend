import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateDailyProductionHeaderMutation } from "../../../slices/production/dailyPackhouseHeadersApiSlice";
import { useGetLastBatchNumbersQuery } from "../../../slices/production/productionHeaderApiSlice";
import { useGetAllSalesPeopleQuery } from "../../../slices/sales/salesPeopleApiSlice";
import { useGetAllCustomersQuery } from "../../../slices/administration/customersApiSlice";
import { useGetAllInstitutionsQuery } from "../../../slices/administration/institutionsApiSlice";
import { useCreateSalesReturnOrderMutation } from "../../../slices/sales/salesOrderReturnApiSlice";
import { useCreateSalesOrderReverseMutation } from "../../../slices/sales/salesOrderReturnApiSlice";
import { useCreateSalesExpenseMutation } from "../../../slices/sales/salesExpenseApiSlice";
import { useGetAllAccountsQuery } from "../../../slices/finance/accountsApiSlice";
import { Autocomplete, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewSalesExpense() {
  const [staff_id, set_staff_id] = useState("");
  const [customer_id, set_customer_id] = useState("");
  const [institution_id, set_institution_id] = useState("");
  const [accunt_number, set_accunt_number] = useState("");
  const [return_reason, set_return_reason] = useState("");
  const [amount, set_amount] = useState("");
  const [description, set_description] = useState("");
  const [date, set_date] = useState("");

  const [pack_officer, set_pack_officer] = useState("");

  const [sale_order_type, set_sale_order_type] = useState("");

  const [created_by, set_created_by] = useState("");
  const [SalesExpense] = useCreateSalesExpenseMutation();

  const [DailyProductionHeader, { isLoading }] =
    useCreateDailyProductionHeaderMutation();
  const { data: last_accunt_numbers } = useGetLastBatchNumbersQuery();
  const { data: institutions } = useGetAllInstitutionsQuery();
  const { data: customers } = useGetAllCustomersQuery();
  const { data: staff } = useGetAllSalesPeopleQuery();
  const [CreateReurnOrder] = useCreateSalesReturnOrderMutation();
  const { data: allAccounts } = useGetAllAccountsQuery();
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
      const res = await SalesExpense({
        staff_id,
        accunt_number,
        date,
        description,
        amount,
        created_by,
      }).unwrap();
      if (res.status == "failed") {
        toast.error(res.message);
      } else {
        navigate("../allreturnorders");
        toast.success("Daily Packhouse  Intiated Successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <span>*** New Sales Expense *** </span>

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
            <Form.Group className="my-2" controlId="pay_per_bale">
              <Form.Label>Account </Form.Label>
              <Form.Select
                required
                style={{ textTransform: "uppercase" }}
                type="text"
                placeholder="Enter Batch no."
                value={accunt_number}
                onChange={(e) => set_accunt_number(e.target.value)}
              >
                <option>Select Account</option>
                {allAccounts?.data
                  .filter(
                    (account) =>
                      account.account_number >= 7301 &&
                      account.account_number <= 7399
                  )
                  .map((item, index) => (
                    <>
                      <option key={index} value={item.account_number}>
                        {item.account_name}
                      </option>
                    </>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="my-2" controlId="sales_person_number">
              <Form.Label>sales person </Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="sales_person_number"
                value={staff_id}
                onChange={(e) => set_staff_id(e.target.value)}
              >
                <option value={""}> Select option</option>
                {staff?.data
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
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <Form.Group className="my-2" controlId="pack_officer">
              <Form.Label>Expense date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder=""
                value={date}
                onChange={(e) => set_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {" "}
            <Form.Group className="my-2" controlId="pack_officer">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder=""
                value={description}
                onChange={(e) => set_description(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="pack_officer">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder=""
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

export default NewSalesExpense;
