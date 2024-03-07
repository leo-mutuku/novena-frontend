import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateSalesOrderHeaderMutation } from "../../../slices/sales/salesOrderHeadersApiSlice";
import { useGetAllSalesPeopleQuery } from "../../../slices/sales/salesPeopleApiSlice";
import { useGetAllCustomersQuery } from "../../../slices/administration/customersApiSlice";
import { useGetAllInstitutionsQuery } from "../../../slices/administration/institutionsApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function CreateOrderHeader() {
  const [sale_order_type, set_sale_order_type] = useState("");
  const [sales_person_number, set_sales_person_number] = useState("");
  const [customer_name, set_customer_name] = useState("null");
  const [customer_id, set_customer_id] = useState(null);
  const [institution_id, set_institution_id] = useState(null);
  const [phone_number, set_phone_number] = useState("null");
  const [created_by, set_created_by] = useState("");
  const [sales_order_date, set_sales_order_date] = useState("");
  const [batch_number, set_batch_number] = useState("");

  const [CreateSalesOrderHeader, { isLoading }] =
    useCreateSalesOrderHeaderMutation();
  const { data: institutions } = useGetAllInstitutionsQuery();
  const { data: customers } = useGetAllCustomersQuery();
  const { data: staff } = useGetAllSalesPeopleQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo, sale_order_type]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (batch_number.length !== 9) {
        toast.error(
          "Batch number error! please check if the bact numbe is correct"
        );
      } else {
        const res = await CreateSalesOrderHeader({
          sale_order_type,
          sales_person_number,
          customer_name,
          phone_number,
          created_by,
          sales_order_date,
          batch_number,
        }).unwrap();
        if (res.status === "failed") {
          navigate("../allorders");
          toast.success("New Sales Order created successfully!");
        } else {
          navigate("../allorders");
          toast.success("New Sales Order created successfully!");
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleCustomer = (e) => {
    let x = customers?.data?.filter((a) => {
      if (a.customer_id == e.target.value) {
        return a.customer_id;
      }
    });

    if (x[0].customer_outlet_name != "") {
      set_customer_name(x[0].customer_outlet_name);
    } else {
      set_customer_name(x[0].customer_contact_person);
    }

    set_customer_id(x[0].customer_id);
    set_phone_number(x[0].customer_contact);
  };
  const handleInstitution = (e) => {
    let x = institutions?.data?.filter((a) => {
      if (a.institution_id == e.target.value) {
        return a.institution_id;
      }
    });
    set_customer_name(x[0].institution_name);
    set_phone_number(x[0].institution_phone_number);
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
                <option value={"Cash"}>Cash Sale </option>
                <option value={"Institution"}>Insititution</option>
                <option value={"Cash_general"}>Cash Sale - General</option>
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
        <br></br>
        <Row>
          <Col>
            {sale_order_type === "Cash" ? (
              <Form.Group className="my-2" controlId="phone_number">
                <Form.Label>
                  Outlet --- contact person --- phone --- Route
                </Form.Label>
                <Form.Select
                  type="text"
                  required
                  placeholder="Customer Name"
                  value={customer_id}
                  onChange={handleCustomer}
                >
                  <option value={``}> Select Customer</option>
                  {customers?.data.map((item, index) => (
                    <option value={item.customer_id}>
                      {item.customer_outlet_name} {"    ---  "}
                      {item.customer_contact_person} {"  ---  "}
                      {item.customer_contact} {"  ---  "}
                      {item.customer_location}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            ) : sale_order_type === "Institution" ? (
              <Form.Group className="my-2" controlId="institution">
                <Form.Label>Institution</Form.Label>
                <Form.Select
                  type="text"
                  required
                  placeholder="Institution"
                  value={institution_id}
                  onChange={handleInstitution}
                >
                  <option value={``}> Select institution</option>
                  {institutions?.data.map((item, index) => (
                    <option value={item.institution_id}>
                      {item.institution_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            ) : (
              <Form.Group className="my-2" controlId="phone_number">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Customer Name"
                  value={customer_name}
                  onChange={(e) => set_customer_name(e.target.value)}
                ></Form.Control>
              </Form.Group>
            )}
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
                <option value={""}>Sales Person</option>
                {staff?.data.map((item, index) => (
                  <>
                    <option key={index} value={item.staff_id}>
                      {item.first_name}
                    </option>
                  </>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="sales_person_number">
              <Form.Label>Batch Number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Batch Number"
                value={batch_number}
                onChange={(e) => set_batch_number(e.target.value)}
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

export default CreateOrderHeader;
