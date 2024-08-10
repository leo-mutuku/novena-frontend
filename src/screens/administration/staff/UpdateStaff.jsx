import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Divider, Chip } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import {
  useGetAllStaffByIdQuery,
  useUpdateStaffMutation,
} from "../../../slices/administration/staffApiSlice";
import { useGetAllPayrollcategoriesQuery } from "../../../slices/payroll/categoryApiSlice";

function UpdateStaff() {
  const [staff_email, set_staff_email] = useState("");
  const [biweekly, set_biweeekly] = useState("");
  const [monthly, set_monthly] = useState("");
  const [national_id, set_national_id] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [bank_account_number, set_bank_account_number] = useState("");
  const [payroll_category_code, set_payroll_category_code] = useState(0);

  const [updateStaff, { isError, isSuccess, error: errorUpdate }] =
    useUpdateStaffMutation();

  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const navigate = useNavigate();

  const { data: staff, error, isLoading } = useGetAllStaffByIdQuery(id);
  useGetAllPayrollcategoriesQuery;
  const { data: payroll_category } = useGetAllPayrollcategoriesQuery();

  useEffect(() => {
    if (id && errorUpdate) {
      toast.error(`Error occured `);
    }
  }, [id, staff]);

  useEffect(() => {
    if (id) {
      if (staff) {
        set_staff_email(staff.data.staff_email);
        set_monthly(staff.data.monthly);
        set_biweeekly(staff.data.biweekly);
        set_national_id(staff.data.national_id);
        set_first_name(staff.data.first_name);
        set_last_name(staff.data.last_name);
        set_phone_number(staff.data.phone_number);
        set_bank_account_number(staff.data.bank_account_number);
        set_payroll_category_code(staff.data.payroll_category_code);
      }
    }
  }, [id, staff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(errorUpdate);
    try {
      const result = await updateStaff({
        id: id,
        data: {
          staff_email,
          national_id,
          first_name,
          last_name,
          phone_number,
          bank_account_number,
          payroll_category_code,
          biweekly,
          monthly,
        },
      }).unwrap();

      if (result == "failed") {
        toast.error(error.message);
      } else {
        toast.success(result.message);
        navigate("../allstaff");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <span>*** Edit Staff ***</span>
      <Row>
        <div>
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="staff_email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="staff_email"
                value={staff_email}
                onChange={(e) => set_staff_email(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="national_id">
              <Form.Label>National ID</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="National ID"
                value={national_id}
                onChange={(e) => set_national_id(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="first_name"
                value={first_name}
                onChange={(e) => set_first_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="last_name">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Last name"
                value={last_name}
                onChange={(e) => set_last_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="phone_number">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Phone number"
                value={phone_number}
                onChange={(e) => set_phone_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="bank_account_number">
              <Form.Label>Bank Account Number</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Bank Account Number"
                value={bank_account_number}
                onChange={(e) => set_bank_account_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Divider>
            <Chip label="Human Resource" size="small" />
          </Divider>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="payroll_category">
              <Form.Label>Payroll Category</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="Payroll Category"
                value={payroll_category_code}
                onChange={(e) =>
                  set_payroll_category_code(parseInt(e.target.value))
                }
              >
                <option value={""}>Select Payroll Category</option>
                {payroll_category?.data.map((item, key) => (
                  <option key={key} value={item.category_code}>
                    {item.category_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="bank_account_number">
              <Form.Label>Bi Weekly</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="Bank Account Number"
                value={biweekly}
                onChange={(e) => set_biweeekly(e.target.value)}
              >
                <option value={null}>Select</option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="bank_account_number">
              <Form.Label>Monthly</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="Bank Account Number"
                value={monthly}
                onChange={(e) => set_monthly(e.target.value)}
              >
                <option value={null}>Select</option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default UpdateStaff;
