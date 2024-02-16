import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import {} from "../../../slices/sales/salesOrderLinesApiSlice";
import { useGetSalesLinesByHeaderIdQuery } from "../../../slices/sales/salesOrderLinesApiSlice";
import { useCreatePrintToPosMutation } from "../../../slices/sales/salesPOSApiSlice";
import TimeDate from "../../../components/TimeDate";

const PostedOrderPreview = () => {
  const timeDate = new TimeDate();
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  const { data: posted_sales_order_line_id } =
    useGetSalesLinesByHeaderIdQuery(id);
  const [printToPOS, { isLoading }] = useCreatePrintToPosMutation();

  useEffect(() => {}, [id, posted_sales_order_line_id]);

  const handleExcel = (e) => {
    alert("Work in Progress! Check again later");
  };
  const handleA4PDF = () => {};
  const handleA5PDF = () => {};
  const handlePOS = (e) => {
    alert(id);
    const res = printToPOS({
      sales_order_number: id,
    }).unwrap();

    console.log(re.status);
  };

  console.log(posted_sales_order_line_id?.data);

  return (
    <>
      <Row>
        <p>***Posted Order Report***</p>
        <span>
          Sales Person:&nbsp;
          {posted_sales_order_line_id?.data?.order_header?.first_name}
          {"  "}
          {posted_sales_order_line_id?.data?.order_header?.last_name}
          &nbsp;&nbsp;&nbsp;Order Number:
          {
            posted_sales_order_line_id?.data?.order_header?.sales_order_number
          }{" "}
          &nbsp;&nbsp;&nbsp;Order Date:{" "}
          {timeDate.date(
            posted_sales_order_line_id?.data?.order_header?.sales_order_date
          )}
        </span>
      </Row>
      <hr></hr>
      <Row>
        <Col>#</Col>
        <Col>Item Name</Col>
        <Col>Qty</Col>
        <Col>@ </Col>
        <Col>VAT</Col>
        <Col>Sub Total</Col>
      </Row>
      <hr></hr>
      {posted_sales_order_line_id?.data?.order?.map((item, index) => (
        <Row key={index} style={{ fontSize: "14px" }}>
          <Col>{item.order_line_id}</Col>
          <Col>{item.item_name}</Col>
          <Col>{item.quantity}</Col>
          <Col>{item.cost_per_item}</Col>
          <Col>{item.vat}</Col>
          <Col>{item.total}</Col>
        </Row>
      ))}
      <hr></hr>
      <Row>
        <Col></Col>
        <Col className="text-center text-md-right">{"Total Kshs."}</Col>
      </Row>
      <hr></hr>
      <Row>
        <Col></Col>

        <Col>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleExcel}>
              Excel
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

export default PostedOrderPreview;
