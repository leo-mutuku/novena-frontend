import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

import { useGetAllPayrollHeadersByIdQuery } from "../../../slices/payroll/payrollHeadersApiSlice";

import TimeDate from "../../../components/TimeDate";
import { toast } from "react-toastify";
import { handlePrintA4 } from "../../../components/printFunction";

const PayrollActions = () => {
  const timeDate = new TimeDate();
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const { data: parollHeader } = useGetAllPayrollHeadersByIdQuery(id);
  console.log("parollHeader", parollHeader?.data);
  console.log("parollHeader", parollHeader?.data);

  useEffect(() => {
    if (parollHeader) {
    }
  }, [id, parollHeader]);

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
        <p>***Process Payroll ***</p>
        <span></span>
      </Row>
      <hr></hr>
      <Row>
        <Col>#</Col>
        <Col>Payroll ID</Col>
        <Col>Gross</Col>
        <Col>NET</Col>
        <Col>STATUTORY</Col>
        <Col>STAFF COUNT</Col>
        <Col>SACCO</Col>
        <Col>STATUS </Col>
      </Row>
      <hr></hr>
      {parollHeader?.data.map((item, index) => (
        <Row key={index} style={{ fontSize: "14px" }}>
          <Col>{index + 1}</Col>
          <Col>{item.payroll_header_id}</Col>
          <Col>{item.gross_salary}</Col>
          <Col>{item.paye}</Col>
          <Col>{item.nhif}</Col>
          <Col>{item.number_of_staff}</Col>
          <Col>{item.other_deductions}</Col>
          <Col>{item.status}</Col>
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
              UNIT PRINT
            </Button>
            <Button variant="outlined" onClick={handleA4PDF}>
              BULKY PRINT
            </Button>
            <Button variant="outlined" onClick={handleExcel}>
              POST
            </Button>
            <Button variant="outlined" onClick={handleExcel}>
              GENERATE
            </Button>
            <Button variant="outlined" onClick={handleA5PDF}>
              PROCESS
            </Button>
            <Button variant="outlined" onClick={handlePOS}>
              VALIDATE
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default PayrollActions;
