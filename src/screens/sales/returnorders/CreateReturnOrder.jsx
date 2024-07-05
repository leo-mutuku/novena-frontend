import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateDailyProductionHeaderMutation } from "../../../slices/production/dailyPackhouseHeadersApiSlice";
import { useGetLastBatchNumbersQuery } from "../../../slices/production/productionHeaderApiSlice";
import { useGetAllSalesPeopleQuery } from "../../../slices/sales/salesPeopleApiSlice";
import { useGetAllCustomersQuery } from "../../../slices/administration/customersApiSlice";
import { useGetAllInstitutionsQuery } from "../../../slices/administration/institutionsApiSlice";
import { useCreateSalesReturnOrderMutation } from "../../../slices/sales/salesOrderReturnApiSlice";
import { useCreateSalesOrderReverseMutation } from "../../../slices/sales/salesOrderReturnApiSlice";
import { Autocomplete, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateReturnOrder() {
  const [staff_id, set_staff_id] = useState("");
  const [customer_id, set_customer_id] = useState("");
  const [institution_id, set_institution_id] = useState("");
  const [batch_number, set_batch_number] = useState("");
  const [return_reason, set_return_reason] = useState("");

  const [pack_officer, set_pack_officer] = useState("");

  const [sale_order_type, set_sale_order_type] = useState("");

  const [created_by, set_created_by] = useState("");

  const [DailyProductionHeader, { isLoading }] =
    useCreateDailyProductionHeaderMutation();
  const { data: last_batch_numbers } = useGetLastBatchNumbersQuery();
  const { data: institutions } = useGetAllInstitutionsQuery();
  const { data: customers } = useGetAllCustomersQuery();
  const { data: staff } = useGetAllSalesPeopleQuery();
  const [CreateReurnOrder] = useCreateSalesReturnOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);

  const handleCustomer = (_, newInputValue) => {
    let x = customers?.data?.filter((a) => {
      if (a.full_name == newInputValue) {
        return a.customer_id;
      }
    });
    set_customer_id(x[0].customer_id);
  };
  const handleInstitution = (e) => {
    let x = institutions?.data?.filter((a) => {
      if (a.institution_id == e.target.value) {
        return a.institution_id;
      }
    });
    set_institution_id(x[0].institution_id);
    set_customer_id("null");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await CreateReurnOrder({
        sale_order_type,
        staff_id,
        institution_id,
        customer_id,
        batch_number,
        return_reason,
        created_by,
      }).unwrap();
      if (res.status == "failed") {
        toast.error(res.message);
      } else {
        navigate("../allreturnorders");
        toast.success("Daily Packhouse  Intiated Successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const packhouseitem = [101, 102, 118];
  return (
    <>
      <span>*** New Return Order *** </span>

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
            <Form.Group className="my-2" controlId="pay_per_bale">
              <Form.Label>Batch no.</Form.Label>
              <Form.Select
                required
                style={{ textTransform: "uppercase" }}
                type="text"
                placeholder="Enter Batch no."
                value={batch_number}
                onChange={(e) => set_batch_number(e.target.value)}
              >
                <option>Select Batch no</option>
                {last_batch_numbers?.data.map((item, index) => (
                  <>
                    <option key={index} value={item.batch_number}>
                      {item.batch_number}
                    </option>
                  </>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="pay_per_bale">
              <Form.Label>Sale Order Type</Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="Enter Batch no."
                value={sale_order_type}
                onChange={(e) => set_sale_order_type(e.target.value)}
              >
                <option value={""}>Sales order type</option>
                <option value={"sales_person"}> Sales Person</option>
                <option value={"Customer"}> Customer</option>
                <option value={"Institution"}>Institution</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            {sale_order_type == "sales_person" ? (
              <Form.Group className="my-2" controlId="sales_person_number">
                <Form.Label>sales person </Form.Label>
                <Form.Select
                  required
                  type="text"
                  placeholder="sales_person_number"
                  value={staff_id}
                  onChange={(e) => set_staff_id(e.target.value)}
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
            ) : sale_order_type == "Customer" ? (
              <Autocomplete
                sx={{ marginTop: "25px" }}
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
            ) : sale_order_type == "Institution" ? (
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
              <></>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="pack_officer">
              <Form.Label>Reason for returning</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder=""
                value={return_reason}
                onChange={(e) => set_return_reason(e.target.value)}
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

export default CreateReturnOrder;
