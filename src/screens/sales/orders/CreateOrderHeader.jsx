import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateSalesOrderHeaderMutation } from "../../../slices/sales/salesOrderHeadersApiSlice";
import { useGetAllSalesPeopleQuery } from "../../../slices/sales/salesPeopleApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateOrderHeader() {
  const [sale_order_type, set_sale_order_type] = useState("");
  const [sales_person_number, set_sales_person_number] = useState("");
  const [customer_name, set_customer_name] = useState("null");
  const [phone_number, set_phone_number] = useState("null");
  const [created_by, set_created_by] = useState("");
  const [sales_order_date, set_sales_order_date] = useState("");

  const [CreateSalesOrderHeader, { isLoading }] =
    useCreateSalesOrderHeaderMutation();
  const { data: staff } = useGetAllSalesPeopleQuery();
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
      const res = await CreateSalesOrderHeader({
        sale_order_type,
        sales_person_number,
        customer_name,
        phone_number,
        created_by,
        sales_order_date,
      }).unwrap();
      console.log(res);

      navigate("../allorders");
      toast.success("New Sales Order created successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** New Sales Order *** </span>

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
            <Form.Group className="my-2" controlId="sale_order_type">
              <Form.Label>SaleS Order Type</Form.Label>
              <Form.Select
                type="option"
                required
                placeholder="sale_order_type"
                value={sale_order_type}
                onChange={(e) => set_sale_order_type(e.target.value)}
              >
                <option>Sales Order Type</option>
                <option value={"Cash"}>Cash Sale</option>
                <option value={"Credit"}>Credit Sale</option>
                <option value={"Insitituition"}>Insititution</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="sales_order_date">
              <Form.Label>Sales date</Form.Label>
              <Form.Control
                type="date"
                required
                placeholder="Sales Order Date"
                value={sales_order_date}
                onChange={(e) => set_sales_order_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="customer_name">
              <Form.Label>customer name</Form.Label>
              <Form.Control
                required
                type="Name"
                placeholder="Customer Name "
                value={customer_name}
                onChange={(e) => set_customer_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="phone_number">
              <Form.Label>Customer Phone no</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Customer Phone Number"
                value={phone_number}
                onChange={(e) => set_phone_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="sales_person_number">
              <Form.Label>sales person number</Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="sales_person_number"
                value={sales_person_number}
                onChange={(e) => set_sales_person_number(e.target.value)}
              >
                <option>Sales Person</option>
                {staff?.data.map((item, index) => (
                  <>
                    <option value={item.staff_id}>{item.first_name}</option>
                  </>
                ))}
              </Form.Select>
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

export default CreateOrderHeader;
