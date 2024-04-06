import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetAllPayrollcategoriesQuery } from "../../../slices/payroll/categoryApiSlice";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";
import { useCreateStaffPayrollSetupMutation } from "../../../slices/payroll/payrollSetupApiSlice";
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
  const [isnssf, set_isnssf] = useState("");
  const [isnhif, set_isnhif] = useState("");

  const [createStaffSetup, { isLoading }] =
    useCreateStaffPayrollSetupMutation();
  const { data: staff_list } = useGetAllStaffQuery();
  const { data: payroll_category_list } = useGetAllPayrollcategoriesQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);
  const handleStaffChange = (e) => {
    let x = staff_list?.data.find((item) => item.staff_id === e.target.value);
    set_payroll_category(x?.payroll_category);
    set_staff_id(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        staff_id === "" ||
        payroll_category === "" ||
        gross_salary === "" ||
        nssf === "" ||
        nhif === "" ||
        isPaye === "" ||
        paye === "" ||
        isSacco === "" ||
        sacco_contribution === "" ||
        other_deductions === ""
      ) {
        return toast.error("All fields are required");
      }
      const res = await createStaffSetup({
        staff_id,
        gross_salary,
        nssf,
        isnssf,
        nhif,
        isnhif,
        isPaye,
        paye,
        isSacco,
        sacco_contribution,
        other_deductions,
      }).unwrap();
      console.log(res);
      navigate("../staffsetlist");
      toast.success("Payroll setup created successfully");
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
              <Form.Select
                type="text"
                required
                placeholder="Staff"
                value={staff_id}
                onChange={handleStaffChange}
              >
                <option>Select Staff</option>
                {staff_list?.data.map((item, index) => (
                  <option key={index} value={item.staff_id}>
                    {item.first_name} {item.last_name}
                  </option>
                ))}
              </Form.Select>
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
          <Col>
            <Form.Group className="my-2" controlId="isSacco">
              <Form.Label>is NSSF</Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="isSacco"
                value={isnssf}
                onChange={(e) => set_isnssf(e.target.value)}
              >
                <option value={""}>Select</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Form.Select>
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
              <Form.Label>Is NHIF</Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="IS PAYE"
                value={isnhif}
                onChange={(e) => set_isnhif(e.target.value)}
              >
                <option value={""}>Select</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Form.Select>
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
            <Form.Group className="my-2" controlId="isPaye">
              <Form.Label>Is PAYE</Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="IS PAYE"
                value={isPaye}
                onChange={(e) => set_isPaye(e.target.value)}
              >
                <option value={""}>Select</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Form.Select>
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
            <Form.Group className="my-2" controlId="isSacco">
              <Form.Label>is Sacco</Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="isSacco"
                value={isSacco}
                onChange={(e) => set_isSacco(e.target.value)}
              >
                <option value={""}>Select</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
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

export default AddStaffSetup;
