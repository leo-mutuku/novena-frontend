import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
} from "../../../slices/administration/usersApiSlice";

function UpdateUserDetails() {
  const [user_id, set_user_id] = useState("");
  const [user_email, set_user_email] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [staff_number, set_staff_number] = useState("");

  const [updateUser, { isError, isSuccess, error: errorUpdate }] =
    useUpdateUserByIdMutation();

  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const navigate = useNavigate();

  const { data: user, error, isLoading } = useGetUserByIdQuery(id);

  useEffect(() => {
    if (id && errorUpdate) {
      toast.error(`Error occured `);
    }
  }, [id, user]);

  useEffect(() => {
    if (id) {
      if (user) {
        set_user_id(user.data.user_id);
        set_user_email(user.data.user_email);
        set_first_name(user.data.first_name);
        set_last_name(user.data.last_name);
        set_staff_number(user.data.staff_number);
      }
    }
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updateUser({
        id: user_id,
        data: { user_id, user_email, first_name, last_name, staff_number },
      }).unwrap();

      if (result.error == true) {
        console.log(result);
        toast.error(result.data.message);
      } else {
        toast.success(result.message);
        navigate("../allusers");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <span>*** Edit User ***</span>
      <Row>
        <div>
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="FirstName">
              <Form.Label> First Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="First Name"
                value={first_name}
                onChange={(e) => set_first_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="LastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => set_last_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Email"
                value={user_email}
                onChange={(e) => set_user_email(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default UpdateUserDetails;
