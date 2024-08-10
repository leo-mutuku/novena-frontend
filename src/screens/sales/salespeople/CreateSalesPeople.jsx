import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";
import { useCreateSalesPersonMutation } from "../../../slices/sales/salesPeopleApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateSalesPeople() {
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, set_email] = useState("");
  const [phone, set_phone] = useState("");
  const [staff_number, set_staff_number] = useState("");
  const [staff_id, set_staff_id] = useState("");
  const [created_by, set_created_by] = useState("");
  const [balance, setBalance] = useState(0);
  const [bales, setBales] = useState(0);

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
        balance,
        bales,
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
      <span>*** Create Sales Person *** </span>

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
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => set_email(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => set_phone(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="staff_number">
              <Form.Label>Staff Number</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="Staff Number"
                value={staff_number}
                onChange={(e) => handleStaff(e)}
              >
                <option value={""}>Staff </option>
                {staff?.data?.map((person, index) => (
                  <>
                    <option key={index} value={person.staff_number}>
                      {person.staff_number} |{person.first_name}
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

export default CreateSalesPeople;
