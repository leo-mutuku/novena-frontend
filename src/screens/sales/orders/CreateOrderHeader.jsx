import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateSalesOrderHeaderMutation } from "../../../slices/sales/salesOrderHeadersApiSlice";
import { useGetAllSalesPeopleQuery } from "../../../slices/sales/salesPeopleApiSlice";
import { useGetAllCustomersQuery } from "../../../slices/administration/customersApiSlice";
import { useGetAllInstitutionsQuery } from "../../../slices/administration/institutionsApiSlice";
import { useGetLastBatchNumbersQuery } from "../../../slices/production/productionHeaderApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function CreateOrderHeader() {
  const [sale_order_type, set_sale_order_type] = useState("");
  const [sales_person_number, set_sales_person_number] = useState("");
  const [customer_name, set_customer_name] = useState("null");
  const [customer_id, set_customer_id] = useState("null");
  const [institution_id, set_institution_id] = useState("null");
  const [phone_number, set_phone_number] = useState("null");
  const [created_by, set_created_by] = useState("");
  const [sales_order_date, set_sales_order_date] = useState("");
  const [batch_number, set_batch_number] = useState("");

  const [CreateSalesOrderHeader, { isLoading }] =
    useCreateSalesOrderHeaderMutation();
  const { data: lastBatchNo } = useGetLastBatchNumbersQuery();
  const { data: institutions } = useGetAllInstitutionsQuery();
  const { data: customers } = useGetAllCustomersQuery();
  const { data: staff } = useGetAllSalesPeopleQuery();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    // Get the current date
    const today = new Date();
    // Format the date as YYYY-MM-DD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    // Set the state with the formatted date
    set_sales_order_date(formattedDate);
  }, []); // Empty dependency array ensures this runs only once

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
          customer_id,
          institution_id,
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

  const handleCustomer = (_, newInputValue) => {
    let x = customers?.data?.filter((a) => {
      if (a.full_name == newInputValue) {
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
    set_institution_id("null");
  };
  const handleInstitution = (e) => {
    let x = institutions?.data?.filter((a) => {
      if (a.institution_id == e.target.value) {
        return a.institution_id;
      }
    });
    set_customer_name(x[0].institution_name);
    set_institution_id(x[0].institution_id);
    set_phone_number(x[0].institution_phone_number);
    set_customer_id("null");
  };
  const handleOrderType = (e) => {
    if (e.target.value === "Institution") {
      set_sale_order_type(e.target.value);
    }
    if (e.target.value === "Customer") {
      set_sale_order_type(e.target.value);
    }
    if (e.target.value === "Sales") {
      set_sale_order_type(e.target.value);
    }
  };

  console.log({
    sale_order_type,
    sales_person_number,
    institution_id,
    customer_id,
  });

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
                onChange={handleOrderType}
              >
                <option>Sales Order Type</option>
                <option value={"Sales"}>Sales Person</option>
                <option value={"Institution"}>Insititution</option>
                <option value={"Customer"}>Customer</option>
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
            {sale_order_type === "Sales" || sale_order_type === "Customer" ? (
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={customers?.data}
                getOptionLabel={(option) => option.full_name}
                renderInput={(full_name) => (
                  <TextField {...full_name} label="Customers" />
                )}
                inputValue={customers.full_name}
                onInputChange={(event, newInputValue) =>
                  handleCustomer(event, newInputValue)
                }
                isOptionEqualToValue={(option, value) =>
                  option.full_name === value.full_name
                }
              />
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
                  value={""}
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
            {sale_order_type === "Sales" ? (
              <Form.Group className="my-2" controlId="sales_person_number">
                <Form.Label>sales person number</Form.Label>
                <Form.Select
                  required
                  type="text"
                  placeholder="sales_person_number"
                  value={sales_person_number}
                  onChange={(e) => set_sales_person_number(e.target.value)}
                >
                  <option value={""}> Select option</option>
                  {staff?.data
                    .filter(
                      (order) =>
                        order.first_name !== "Customer" &&
                        order.first_name !== "Institution"
                    )
                    .map((item, index) => (
                      <>
                        <option key={index} value={item.staff_id}>
                          {item.first_name} {item.last_name}
                        </option>
                      </>
                    ))}
                </Form.Select>
              </Form.Group>
            ) : sale_order_type === "Institution" ? (
              <Form.Group className="my-2" controlId="sales_person_number">
                <Form.Label>Insititution</Form.Label>
                <Form.Select
                  required
                  type="text"
                  placeholder="sales_person_number"
                  value={sales_person_number}
                  onChange={(e) => set_sales_person_number(e.target.value)}
                >
                  <option value={""}> Select option</option>
                  {staff?.data
                    .filter((order) => order.first_name === "Institution")
                    .map((item, index) => (
                      <>
                        <option key={index} value={item.staff_id}>
                          {item.first_name}
                        </option>
                      </>
                    ))}
                </Form.Select>
              </Form.Group>
            ) : (
              <Form.Group className="my-2" controlId="sales_person_number">
                <Form.Label>Customer</Form.Label>
                <Form.Select
                  required
                  type="text"
                  placeholder="sales_person_number"
                  value={sales_person_number}
                  onChange={(e) => set_sales_person_number(e.target.value)}
                >
                  <option value={""}> Select option</option>
                  {staff?.data
                    .filter((order) => order.first_name === "Customer")
                    .map((item, index) => (
                      <>
                        <option key={index} value={item.staff_id}>
                          {item.first_name}
                        </option>
                      </>
                    ))}
                </Form.Select>
              </Form.Group>
            )}
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="sales_person_number">
              <Form.Label>Batch Number</Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="Batch Number"
                value={batch_number}
                onChange={(e) => set_batch_number(e.target.value)}
              >
                <option value="">Select Batch </option>

                {lastBatchNo?.data.map((item, index) => (
                  <>
                    <option key={index} value={item.batch_number}>
                      {item.batch_number}
                    </option>
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
