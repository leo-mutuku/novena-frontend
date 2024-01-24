import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";
import { useCreateSalesPersonMutation } from "../../../slices/sales/salesPeopleApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreatePackHouse() {
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, set_email] = useState("");
  const [phone, set_phone] = useState("");
  const [staff_number, set_staff_number] = useState("");
  const [staff_id, set_staff_id] = useState("");
  const [created_by, set_created_by] = useState("");

  const { data: staff } = useGetAllStaffQuery();
  const [CreateSalesPerson] = useCreateSalesPersonMutation();
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
        first_name,
        last_name,
        email,
        phone,
        staff_id,
        created_by,
      }).unwrap();
      if (res.status == "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        toast.success("Created successduly");
        navigate("../allsalespeople");
      }

      toast.success(`${first_name}'s account created successfully!`);
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
      <span>*** Create Pack House Item *** </span>

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
            <Form.Group className="my-2" controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                value={email}
                onChange={(e) => set_email(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="code">
              <Form.Label>code</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="code"
                value={phone}
                onChange={(e) => set_phone(e.target.value)}
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

export default CreatePackHouse;
