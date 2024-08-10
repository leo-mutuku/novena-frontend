import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import {
  useGetStaffPayrollSetupByIdQuery,
  useUpdateStaffPayrollSetupMutation,
} from "../../../slices/payroll/payrollSetupApiSlice";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";
import { First } from "react-bootstrap/esm/PageItem";

function UpdateStaffSetup() {
  const [staff_id, set_staff_id] = useState("");
  const [allowances, set_allowances] = useState("");
  const [payroll_category, set_payroll_category] = useState("");
  const [gross_salary, set_gross_salary] = useState("");
  const [nssf, set_nssf] = useState("");
  const [nhif, set_nhif] = useState("");

  const [paye, set_paye] = useState("");

  const [sacco_contribution, set_sacco_contribution] = useState("");
  const [other_deductions, set_other_deductions] = useState("");
  const [created_by, set_created_by] = useState("");

  const [updatePayroll, { isError, isSuccess, error: errorUpdate }] =
    useUpdateStaffPayrollSetupMutation();

  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const navigate = useNavigate();

  const { data: payroll_setup } = useGetStaffPayrollSetupByIdQuery(id);
  const { data: staff_list } = useGetAllStaffQuery();

  useEffect(() => {
    if (id && errorUpdate) {
      toast.error(`Error occured `);
      console.log("ji");
    }
  }, [id, payroll_setup]);

  useEffect(() => {
    if (id) {
      if (payroll_setup) {
        set_staff_id(payroll_setup?.data.staff_id);
        set_allowances(payroll_setup?.data.allowances);
        set_payroll_category(payroll_setup?.data.payroll_category);
        set_gross_salary(payroll_setup?.data.gross_salary);
        set_nssf(payroll_setup?.data.nssf);
        set_nhif(payroll_setup?.data.nhif);
        set_paye(payroll_setup?.data.paye);
        set_sacco_contribution(payroll_setup?.data.sacco_contribution);
        set_other_deductions(payroll_setup?.data.other_deductions);
      }
    }
  }, [id, payroll_setup]);

  const handleStaffChange = (e) => {
    let x = staff_list?.data.find((item) => item.staff_id === e.target.value);
    set_payroll_category(x?.payroll_category);
    set_staff_id(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updatePayroll({
        staff_id,
        gross_salary,
        allowances,
        sacco_contribution,
        nhif,
        nssf,
      }).unwrap();

      if (result == "failed") {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        navigate("../staffsetlist");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <span>*** Update Staff setup ***</span>
      <Row>
        <div>
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        {/* */}
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="staff_id">
              <Form.Label>Staff </Form.Label>
              <Form.Control
                type="number"
                required
                disabled
                placeholder="Staff"
                value={staff_id}
                onChange={(e) => set_staff_id(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="gross_salary">
              <Form.Label>Gross salary</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="gross_salary"
                value={gross_salary}
                onChange={(e) => set_gross_salary(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="nssf">
              <Form.Label>Allowances</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Allowances"
                value={allowances}
                onChange={(e) => set_allowances(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="nssf">
              <Form.Label>NSSF</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="NSSF"
                value={nssf}
                onChange={(e) => set_nssf(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="nhif">
              <Form.Label>NHIF</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="nhif"
                value={nhif}
                onChange={(e) => set_nhif(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="sacco_contribution">
              <Form.Label>SACCO Contribution</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="SACCO Contribution"
                value={sacco_contribution}
                onChange={(e) => set_sacco_contribution(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button
          type="submit"
          variant="primary"
          onClick={handleSubmit}
          className="mt-3"
        >
          submit
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
}

export default UpdateStaffSetup;
