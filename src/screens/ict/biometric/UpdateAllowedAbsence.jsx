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
import { useAllowedAbsenceMutation } from "../../../slices/ict/biometricApislice";
import { useGetAllPayrollcategoriesQuery } from "../../../slices/payroll/categoryApiSlice";
import { IoMdClose } from "react-icons/io";

function UpdateAllowedAbsence() {
  const [staff_email, set_staff_email] = useState("");
  const [biweekly, set_biweeekly] = useState("");
  const [monthly, set_monthly] = useState("");
  const [national_id, set_national_id] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [bank_account_number, set_bank_account_number] = useState("");
  const [payroll_category_code, set_payroll_category_code] = useState(0);
  const [date, set_date] = useState("");

  const [updateStaff, { isError, isSuccess, error: errorUpdate }] =
    useAllowedAbsenceMutation();

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
        staff_code: national_id,
        date: date,
      }).unwrap();

      if (result == "failed") {
        toast.error(error.message);
      } else {
        toast.success(result.message);
        navigate("../allowedabsence");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <br></br>
      <Row>
        <Col>
          <span>*** Created Allowed Absence ***</span>
        </Col>
        <Col xs={1}>
          <Button
            variant="outline-danger"
            type="submit"
            onClick={() => navigate("../allowedabsence")}
          >
            <IoMdClose />
          </Button>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
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
        <br></br>
        <Row>
          <Divider>
            <Chip label="Allowed Absent date" size="small" />
          </Divider>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <Form.Group className="my-2" controlId="bank_account_number">
              <Form.Label>Allowed Absent Date</Form.Label>
              <Form.Control
                type="date"
                required
                placeholder="Bank Account Number"
                value={date}
                onChange={(e) => set_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={1}>
            {" "}
            <Button type="submit" variant="outline-primary" className="mt-3">
              Sumbit
            </Button>
          </Col>
        </Row>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default UpdateAllowedAbsence;
