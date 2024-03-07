import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import {} from "../../../slices/sales/salesOrderLinesApiSlice";
import { useGetSalesLinesByHeaderIdQuery } from "../../../slices/sales/salesOrderLinesApiSlice";

import TimeDate from "../../../components/TimeDate";
import { toast } from "react-toastify";
import { handlePrintA4 } from "../../../components/printFunction";

const ReturnOrderpreview = () => {
  const timeDate = new TimeDate();
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  const { data: posted_sales_order_line_id } =
    useGetSalesLinesByHeaderIdQuery(id);

  useEffect(() => {
    set_order_lines(posted_sales_order_line_id?.data.order);
  }, [id, posted_sales_order_line_id]);

  const handleExcel = (e) => {
    alert("Work in Progress! Check again later");
  };
  const [order_lines, set_order_lines] = useState([{}]);
  const [order_header, set_order_header] = useState({});

  const handleA4PDF = () => {};
  const handleA5PDF = () => {};
  //   const handlePOS = async (e) => {
  //     const res = await printToPOS({
  //       sales_order_number: id,
  //     }).unwrap();
  //     console.log(res);
  //   };

  return (
    <>
      <Row>
        <p>***Return Order***</p>
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
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;Previous
          Total:
        </span>
      </Row>
      <hr></hr>
      <Row>
        <Col>#</Col>
        <Col>Item Name</Col>
        <Col>Qty</Col>
        <Col>@</Col>
        <Col>Qty to R.</Col>
        <Col>New .Qty</Col>
        <Col>New .Ttl</Col>
      </Row>
      <hr></hr>
      {order_lines?.map((item, index) => (
        <Row key={index} style={{ fontSize: "14px" }}>
          <Col>{item.order_line_id}</Col>
          <Col>{item.item_name}</Col>
          <Col>{item.quantity}</Col>
          <Col>
            <Col>{item.quantity}</Col>
          </Col>
          <Col className="my-1">
            {" "}
            <input style={{ padding: "1px" }} type="number" />
          </Col>

          <Col>
            <Col>{item.quantity}</Col>
          </Col>
          <Col>
            <Col>{item.quantity}</Col>
          </Col>
        </Row>
      ))}
      <hr></hr>
      <Row>
        <Col></Col>
        <Col className="text-center text-md-right">{" New Total Kshs."}</Col>
      </Row>
      <hr></hr>
      <Row>
        <Col></Col>

        <Col>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" color="error" onClick={""}>
              REVERSER ORDER
            </Button>
            <Button variant="outlined" color="error" onClick={""}>
              SUBMIT RETURN ORDER
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default ReturnOrderpreview;
