import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreaterolesMutation } from "../../../slices/administration/rolesSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateRole() {
  const [role_code, set_role_code] = useState("");
  const [role_name, set_role_name] = useState("");
  const [role_description, set_role_description] = useState("");

  const [CreateRole, { isLoading }] = useCreaterolesMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      // set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await CreateRole({
        role_code,
        role_description,
        role_name,
      }).unwrap();
      console.log(res);
      if (res.status == "failed") {
        toast.error("Error occurred while creating roles");
      } else {
        navigate("../allroles");
        toast.success("Role created successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Role *** </span>

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
            <Form.Group className="my-2" controlId="role_name">
              <Form.Label>Role name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Role Name"
                value={role_name}
                onChange={(e) => set_role_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="role_code">
              <Form.Label>Role code</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Role Code"
                value={role_code}
                onChange={(e) => set_role_code(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="role_descrition">
              <Form.Label>Role description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Role Description"
                value={role_description}
                onChange={(e) => set_role_description(e.target.value)}
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

export default CreateRole;
