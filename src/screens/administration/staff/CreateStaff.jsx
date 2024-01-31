import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useCreateStaffMutation } from "../../../slices/administration/staffApiSlice";
import { useGetAllPayrollcategoriesQuery } from "../../../slices/payroll/categoryApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateStaff() {
  const [staff_email, set_staff_email] = useState("");
  const [national_id, set_national_id] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [bank_account_number, set_bank_account_number] = useState("");
  const [payroll_category_code, set_payroll_category_code] = useState("");

  const [createStaff, { isLoading }] = useCreateStaffMutation();
  const { data: payrollCategory } = useGetAllPayrollcategoriesQuery();
  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createStaff({
        staff_email,
        national_id,
        first_name,
        last_name,
        phone_number,
        bank_account_number,
        payroll_category_code,
      }).unwrap();
      console.log(res);
      navigate("../allstaff");
      toast.success("Staff created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Staff ***</span>
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
            <Form.Group className="my-2" controlId="staff_email">
              <Form.Label>Staff Email</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Staff email"
                value={staff_email}
                onChange={(e) => set_staff_email(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="national_id">
              <Form.Label>National id</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="National id"
                value={national_id}
                onChange={(e) => set_national_id(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* staff_number field */}
            <Form.Group className="my-2" controlId="first_name">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                value={first_name}
                onChange={(e) => set_first_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="last_name">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                value={last_name}
                onChange={(e) => set_last_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            {/*  */}
            <Form.Group className="my-2" controlId="phone_number">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                required
                size="10"
                type="number"
                placeholder="Phone number"
                value={phone_number}
                onChange={(e) => set_phone_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="bank_account_number">
              <Form.Label>Bank account number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Bank account number"
                value={bank_account_number}
                onChange={(e) => set_bank_account_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="my-2" controlId="payroll_category_code">
              <Form.Label>Payroll category </Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="Payroll category code"
                value={payroll_category_code}
                onChange={(e) => set_payroll_category_code(e.target.value)}
              >
                <option>Select Category</option>
                {payrollCategory?.data.map((category, index) => (
                  <option value={category.category_code}>
                    {category.category_name}
                  </option>
                ))}
              </Form.Select>
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

export default CreateStaff;
