import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import {} from "../../../slices/sales/salesOrderLinesApiSlice";
import { useGetSalesLinesByHeaderIdQuery } from "../../../slices/sales/salesOrderLinesApiSlice";

import TimeDate from "../../../components/TimeDate";
import { toast } from "react-toastify";

const ReverseOrderPreview = () => {
  const timeDate = new TimeDate();
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  const { data: posted_sales_order_line_id } =
    useGetSalesLinesByHeaderIdQuery(id);

  const [reverse_order, set_reverse_order] = useState([]);
  const [return_order, set_return_order] = useState([]);
  const [order_item, set_order_item] = useState({
    order_item_id: null,
    quanitiy: null,
    ne_quantity: null,
  });
  useEffect(() => {
    set_reverse_order(posted_sales_order_line_id?.data.order);
    set_return_order(posted_sales_order_line_id?.data.order);
  }, [id, posted_sales_order_line_id]);

  const handleQty = (value, order_line_id) => {
    let orginal_quantity = 0;
    let y = reverse_order.map((item) => {
      if (item.order_line_id == order_line_id) {
        orginal_quantity = item.quantity;
      }
    });

    if (orginal_quantity < value) {
    }

    return_order.map((item) => {
      if (item.order_line_id == order_line_id) {
        set_order_item({
          ...order_item,
          quantity: item.quanitiy,
          ne_quantity: parseInt(value),
        });
      }
    });
  };

  return (
    <>
      <Row>
        <Col> ***Return Order***</Col>
        <Col sm={8}>
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
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          </span>
        </Col>
        <Col sm={2}>
          Previous Total:
          {posted_sales_order_line_id?.data?.order_header?.grand_total}
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>#</Col>
        <Col>Item Name</Col>
        <Col>Qty</Col>
        <Col>@</Col>
        <Col>Sub Ttl</Col>
        <Col>New Qty</Col>
        <Col>Add</Col>
      </Row>

      {return_order?.map((item, index) => (
        <Row>
          <Col>{item.order_line_id}</Col>
          <Col>{item.item_name}</Col>
          <Col>{item.quantity}</Col>
          <Col>{item.cost_per_item}</Col>
          <Col>{item.total}</Col>
          <Col>
            {" "}
            <input
              required
              style={{ padding: "1px" }}
              type="number"
              defaultValue={item.quantity}
              onChange={(e) => handleQty(e.target.value, item.order_line_id)}
            />
          </Col>
          <Col>
            {" "}
            <Stack spacing={2} direction="row">
              <Button variant="outlined" onClick={""}>
                add
              </Button>
            </Stack>
          </Col>
        </Row>
      ))}
      <hr></hr>
      <Row>
        <Col></Col>

        <Col sm={5}>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" color="error" onClick={""}>
              REVERSE ORDER
            </Button>
            <Button variant="outlined" color="error" onClick={""}>
              RETURN ORDER
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default ReverseOrderPreview;
