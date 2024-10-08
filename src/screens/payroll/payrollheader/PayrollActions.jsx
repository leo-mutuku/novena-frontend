import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

import {
  useGetAllPayrollHeadersByIdQuery,
  useRejectSalaryMutation,
} from "../../../slices/payroll/payrollHeadersApiSlice";
import {
  useValidatePayrollMutation,
  useProcessPayrollMutation,
  useGeneratePayrollMutation,
  useBulkPrintPayslipMutation,
} from "../../../slices/payroll/payrollLinesApiSlice";

import TimeDate from "../../../components/TimeDate";
import { toast } from "react-toastify";
import { handlePrintA4 } from "../../../components/printFunction";

const PayrollActions = () => {
  const timeDate = new TimeDate();
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const { data: parollHeader } = useGetAllPayrollHeadersByIdQuery(id);
  const [rejectSalary, { error: rejectSalaryError }] =
    useRejectSalaryMutation();
  const [validatePayroll, { error: validatePayrollError }] =
    useValidatePayrollMutation();
  const [processPayroll, { error: processPayrollError }] =
    useProcessPayrollMutation();
  const [generatePayroll, { error: generatePayrollError }] =
    useGeneratePayrollMutation();
  const [bulkPrintPayslip, { error: bulkPrintPayslipError }] =
    useBulkPrintPayslipMutation();

  useEffect(() => {
    if (parollHeader) {
    }
  }, [id, parollHeader]);

  const handleViewPayroll = (e) => {
    navigate(`/payroll/payrolllines/${id}`);
  };
  const handleBulkprint = async (e) => {
    try {
      const res = await bulkPrintPayslip({ payroll_header_id: id }).unwrap();
      if (res.status === "success") {
        const payrollHeader = res.data.payrollHeader;
        console.log(payrollHeader);
        const getlistOfStaffId = res.data.getlistOfStaffId;

        handlePrintA4(payrollHeader, getlistOfStaffId);
      } else {
        toast.error("Bulk print failed");
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "An error occurred while bulk printing payslip "
      );
    }
  };

  const handleGeneratePayrollBtn = async (e) => {
    try {
      const res = await generatePayroll({ payroll_header_id: id }).unwrap();
      if (res.status === "success") {
        toast.success("Payroll generated successfully");
      } else {
        toast.error("Payroll generation failed");
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "An error occurred while generating payroll "
      );
    }
  };

  const handleProcessPayrollBtn = async (e) => {
    try {
      const res = await processPayroll({ payroll_header_id: id }).unwrap();
      if (res.status === "success") {
        toast.success("Payroll processed successfully");
      } else {
        toast.error("Payroll processing failed");
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "An error occurred while processing payroll "
      );
    }
  };

  const handleValdatePayrollBtn = async (e) => {
    try {
      const res = await validatePayroll({ payroll_header_id: id }).unwrap();
      if (res.status === "success") {
        toast.success("Payroll Validated successfully");
      } else {
        toast.error("Payroll Validation failed");
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "An error occurred while validating payroll "
      );
    }
  };

  const handleRejectPayroll = async (e) => {
    try {
      const res = await rejectSalary({ id: id }).unwrap();
      if (res.status === "success") {
        toast.success("Payroll rejected successfully");
      } else {
        toast.error("Payroll rejection failed");
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "An error occurred while rejecting payroll "
      );
    }
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
        <Col>Ttl. Dctns</Col>
        <Col>Other. Dedtns</Col>
        <Col>STAFF COUNT</Col>
        <Col>STATUS </Col>
      </Row>
      <hr></hr>
      {parollHeader?.data.map((item, index) => (
        <Row key={index} style={{ fontSize: "14px" }}>
          <Col>{index + 1}</Col>
          <Col>{item.payroll_header_id}</Col>
          <Col>{item.gross_pay}</Col>
          <Col>{item.net_pay}</Col>
          <Col>{item.total_deductions}</Col>
          <Col>{item.other_deductions}</Col>
          <Col>{item.number_of_staff}</Col>
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
            {/* <Button variant="outlined">PAY</Button> */}
            <Button variant="outlined" onClick={handleRejectPayroll}>
              Reject
            </Button>
            <Link to={`../viewpayrollheader/${id}`}>
              <Button variant="outlined">View</Button>
            </Link>

            <Button variant="outlined" onClick={handleBulkprint}>
              PRINT
            </Button>
            <Button variant="outlined" onClick={handleGeneratePayrollBtn}>
              GENERATE
            </Button>
            <Button variant="outlined" onClick={handleProcessPayrollBtn}>
              PROCESS
            </Button>
            <Button variant="outlined" onClick={handleValdatePayrollBtn}>
              VALIDATE
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default PayrollActions;
