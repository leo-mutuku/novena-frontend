import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import {} from "../../../slices/sales/salesOrderLinesApiSlice";
import { useGetAllReturnOrdersLinesQuery } from "../../../slices/sales/salesOrderReturnLinesApiSlice";
import { useCreateSalesReturnOrderMutation } from "../../../slices/sales/salesOrderReturnApiSlice";
import TimeDate from "../../../components/TimeDate";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ReturnOrderpreview = () => {
  const timeDate = new TimeDate();
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  const { data: posted_sales_order_line_id } =
    useGetAllReturnOrdersLinesQuery(id);
  const [createReturnOrder, { isLoading, error }] =
    useCreateSalesReturnOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [reverse_order, set_reverse_order] = useState([]);
  const [return_order, set_return_order] = useState([]);
  const [created_by, set_created_by] = useState("");
  const [order_item, set_order_item] = useState({
    order_item_id: null,
    quantity: null,
    new_quantity: null,
    item_name: null,
    cost_per_item: null,
    sub_total: null,
    total: null,
  });

  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();

    set_reverse_order(posted_sales_order_line_id?.data);
  }, [id, posted_sales_order_line_id, navigate, userInfo]);

  const handleQty = (value, order_line_id) => {
    let orginal_quantity = 0;
    let y = reverse_order.map((item) => {
      if (item.order_line_id == order_line_id) {
        orginal_quantity = item.quantity;
      }
    });

    reverse_order.map((item) => {
      if (item.order_line_id == order_line_id) {
        set_order_item({
          ...order_item,
          order_item_id: parseInt(order_line_id),
          quantity: parseInt(item.quantity),
          new_quantity: parseInt(value),
          item_name: item.item_name,
          cost_per_item: parseFloat(item.cost_per_item),
          sub_total: parseFloat(item.cost_per_item) * parseInt(value),
          total: parseFloat(item.cost_per_item) * parseInt(value),
        });
      }
    });
  };

  const handleAdd = (e) => {
    if (order_item.order_item_id == null || order_item.order_item_id == "") {
      toast.error(
        "One of the input field must be active and not empty before you click add!"
      );
      return;
    } else if (
      parseInt(order_item.quantity) < parseInt(order_item.new_quantity)
    ) {
      toast.error("New quantity cannot exceed initital quantity or be empty!");
      return;
    } else {
      set_return_order([...return_order, order_item]);
    }
  };

  const handleRetrunOrderBtn = async (e) => {
    //check if return order is not empty
    if (return_order.length == 0) {
      toast.error("No items found on the return order list!");
      return;
    }
    // check duplicate
    let duplicateArr = return_order?.map((item) => {
      return item.order_item_id;
    });
    let isDuplicate = duplicateArr.some((item, order_item_id) => {
      return duplicateArr.indexOf(item) != order_item_id;
    });
    if (isDuplicate) {
      toast.error(
        "Duplicates are not allowed in return order, Please check adjust and try again!"
      );
      return;
    }

    // NaN entries check taken to backend - please help fix this

    // send request to backend
    try {
      const res = await createReturnOrder({
        return_order_list: return_order,
        created_by: created_by,
      }).unwrap();
      if (res.status == "failed") {
      } else {
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Row>
        <Col> ***Return Order***</Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>#</Col>
        <Col>Item Name</Col>
        <Col>Qty</Col>
        <Col>@</Col>
        <Col>Sub Ttl</Col>
      </Row>

      {reverse_order?.map((item, index) => (
        <Row>
          <Col>{item.order_line_id}</Col>
          <Col>{item.item_name}</Col>
          <Col>{item.quantity}</Col>
          <Col>{item.cost_per_item}</Col>
          <Col>{item.total}</Col>
        </Row>
      ))}
      <hr></hr>

      <hr></hr>

      <Row>
        <Col></Col>
      </Row>
    </>
  );
};

export default ReturnOrderpreview;
