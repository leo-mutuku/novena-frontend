import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useRegisterMutation } from "../../../slices/administration/usersApiSlice";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

function CreateUser() {
  const [user_email, set_user_email] = useState("");
  const [staff_number, set_staff_number] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [phone, set_phone] = useState("");

  const [createUser, { isLoading }] = useRegisterMutation();
  const { data: staff } = useGetAllStaffQuery();
  const navigate = useNavigate();

  useEffect(() => {
    navigate();
  }, [navigate]);
  const handleStaffChange = (e) => {
    alert("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createUser({
        user_email,
        staff_number,
        first_name,
        last_name,
        phone,
      }).unwrap();
      console.log(res);
      navigate("../allusers");
      toast.success("User created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // handleStaff
  const handleStaff = (e) => {
    let user = staff?.data?.filter((a) => {
      if (a.staff_number == e.target.value) {
        return a.staff_number;
      }
    });
    set_first_name(user[0].first_name);
    set_user_email(user[0].staff_email);
    set_last_name(user[0].last_name);
    set_phone(user[0].phone_number);

    console.log(user);
  };
  return (
    <>
      <span>*** Create User ***</span>
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
            <Form.Group className="my-2" controlId="user_email">
              <Form.Label>User Email</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="User email"
                value={user_email}
                onChange={(e) => set_user_email(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="staff_number">
              <Form.Label>Staff Number</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="Staff number"
                value={staff_number}
                onChange={handleStaff}
              >
                {staff?.data?.map((item) => (
                  <option value={item.staff_number}>
                    {item.staff_number} | {item.first_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* staff_number field */}
            <Form.Group className="my-2" controlId="first_name">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                value={first_name}
                onChange={(e) => set_first_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="my-2" controlId="last_name">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name "
                value={last_name}
                onChange={(e) => set_last_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="phone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Phone numnber "
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

export default CreateUser;
