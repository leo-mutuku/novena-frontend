import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";

import {
  useCreateSalesPersonMutation,
  useDeleteSalesPersonMutation,
  useGetAllSalesPeopleQuery,
  useValidateSalesperSonmakeOrderMutation,
  useEditSalesPersonLimitMutation,
} from "../../../slices/sales/salesPeopleApiSlice";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditLimit() {
  const { id } = useParams();
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, set_email] = useState("");
  const [phone, set_phone] = useState("");
  const [staff_number, set_staff_number] = useState("");

  const [created_by, set_created_by] = useState("");
  const [balance, setBalance] = useState(0);
  const [bales, setBales] = useState(0);
  const [order_limit, set_order_limit] = useState(0);

  const { data: staff } = useGetAllStaffQuery();

  const [CreateSalesPerson] = useEditSalesPersonLimitMutation();
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
      const res = await CreateSalesPerson({
        order_limit,
        staff_id: id,
      }).unwrap();
      if (res.status == "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        toast.success("Updated successfully");
        navigate("../allsalespeople");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // handle staff
  const handleStaff = (e) => {
    let x = staff?.data?.filter((a) => {
      if (a.staff_number == e.target.value) {
        return a.first_name;
      }
    });

    set_first_name(x[0].first_name);
    set_last_name(x[0].last_name);
    set_email(x[0].staff_email);
    set_phone(x[0].phone_number);
    set_staff_id(x[0].staff_id);
    set_staff_number(e.target.value);
  };
  return (
    <>
      <span>*** Create Sales Person *** </span>

      <Row>
        <div>
          {" "}
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        {/* */}
        {/* <Row>
          <Col>
            <Form.Group className="my-2" controlId="first_name">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="first_name"
                value={first_name}
                onChange={(e) => set_first_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="last name"
                value={last_name}
                onChange={(e) => set_last_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row> */}

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>CurrentOrder Limit</Form.Label>
              <Form.Control
                disabled
                required
                type="number"
                placeholder=""
                value={"Current"}
                onChange={(e) => set_email(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="phone">
              <Form.Label>New Limit</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="New Limit"
                value={order_limit}
                onChange={(e) => set_order_limit(e.target.value)}
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

export default EditLimit;
