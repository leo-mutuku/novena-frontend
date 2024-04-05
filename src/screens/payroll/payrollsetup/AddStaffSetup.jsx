import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateAccountMutation } from "../../../slices/finance/accountsApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddStaffSetup() {
  const [staff_id, set_staff_id] = useState("");
  const [payroll_category, set_payroll_category] = useState("");
  const [gross_salary, set_gross_salary] = useState("");
  const [nssf, set_nssf] = useState("");
  const [nhif, set_nhif] = useState("");
  const [isPaye, set_isPaye] = useState("");
  const [paye, set_paye] = useState("");
  const [isSacco, set_isSacco] = useState("");
  const [sacco_contribution, set_sacco_contribution] = useState("");
  const [other_deductions, set_other_deductions] = useState("");
  const [created_by, set_created_by] = useState("");

  const [CreateAccount, { isLoading }] = useCreateAccountMutation();
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
      const res = await CreateAccount({
        staff_id,
        payroll_category,
        gross_salary,
        nssf,
        nhif,
        isPaye,
        paye,
        isSacco,
        sacco_contribution,
        other_deductions,
      }).unwrap();
      console.log(res);
      navigate("../allaccounts");
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Staff Setup *** </span>

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
            <Form.Group className="my-2" controlId="staff_id">
              <Form.Label>Staff </Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Staff"
                value={staff_id}
                onChange={(e) => set_staff_id(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="payroll_category">
              <Form.Label>Payroll category</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Payroll category"
                value={payroll_category}
                onChange={(e) => set_payroll_category(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
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
          <Col>
            <Form.Group className="my-2" controlId="isPaye">
              <Form.Label>Is PAYE</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="IS PAYE"
                value={isPaye}
                onChange={(e) => set_isPaye(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="paye">
              <Form.Label>PAYE</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="paye"
                value={paye}
                onChange={(e) => set_paye(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="isSacco">
              <Form.Label>isSacco</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="isSacco"
                value={isSacco}
                onChange={(e) => set_isSacco(e.target.value)}
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
          <Col>
            <Form.Group className="my-2" controlId="other_deductions">
              <Form.Label>Other Deductions</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Other Deductions"
                value={other_deductions}
                onChange={(e) => set_other_deductions(e.target.value)}
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

export default AddStaffSetup;
