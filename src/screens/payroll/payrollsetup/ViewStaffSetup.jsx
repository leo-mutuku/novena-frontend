import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

import { useGetStaffPayrollSetupByIdQuery } from "../../../slices/payroll/payrollSetupApiSlice";

import TimeDate from "../../../components/TimeDate";
import { toast } from "react-toastify";
import { handlePrintA4 } from "../../../components/printFunction";

const ViewStaffSetup = () => {
  const timeDate = new TimeDate();
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  const { data: payroll_setup } = useGetStaffPayrollSetupByIdQuery(id);
  console.log("payroll_setup", payroll_setup);
  const [staff_name, setStaffName] = React.useState("");
  const [staff_id, setStaffId] = React.useState("");

  useEffect(() => {
    if (payroll_setup) {
      setStaffName(
        payroll_setup[0].first_name + " " + payroll_setup[0].last_name
      );
      setStaffId(payroll_setup[0].staff_id);
    }
  }, [id, payroll_setup]);

  const handleExcel = (e) => {};
  const handleA4PDF = () => {};
  const handleA5PDF = () => {};
  const handlePOS = async (e) => {
    const res = await printToPOS({
      sales_order_number: id,
    }).unwrap();
  };

  return (
    <>
      <Row>
        <p>***Payroll Setup ***</p>
        <span>
          Staff: {staff_name}&nbsp; &nbsp;&nbsp;&nbsp;Staff ID: {staff_id}
        </span>
      </Row>
      <hr></hr>
      <Row>
        <Col>#</Col>
        <Col>Gross</Col>
        <Col>PAYE</Col>
        <Col>NHIF</Col>
        <Col>NSSF</Col>
        <Col>SACCO Contributions</Col>
        <Col>Other Deductions</Col>
      </Row>
      <hr></hr>
      {payroll_setup?.map((item, index) => (
        <Row key={index} style={{ fontSize: "14px" }}>
          <Col>{index + 1}</Col>
          <Col>{item.gross_salary}</Col>
          <Col>{item.paye}</Col>
          <Col>{item.nhif}</Col>
          <Col>{item.nssf}</Col>
          <Col>{item.sacco_contribution}</Col>
          <Col>{item.other_deductions}</Col>
        </Row>
      ))}
      <hr></hr>
      <Row>
        <Col></Col>
        <Col className="text-center text-md-right"></Col>
      </Row>

      <Row>
        <Col></Col>

        <Col>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleExcel}>
              Update
            </Button>
            <Button variant="outlined" onClick={handleA4PDF}>
              A4 PDF
            </Button>
            <Button variant="outlined" onClick={handleA5PDF}>
              A5 PDF
            </Button>
            <Button variant="outlined" onClick={handlePOS}>
              POS
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default ViewStaffSetup;
