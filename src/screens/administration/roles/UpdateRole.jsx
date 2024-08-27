import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import {
  useGetRoleByIdQuery,
  useUpdateRoleByIdMutation,
} from "../../../slices/administration/rolesSlice";

function UpdateRole() {
  const [role_name, set_role_name] = useState("");
  const [role_code, set_role_code] = useState("");
  const [role_description, set_role_description] = useState("");

  const [updateRole, { isError, isSuccess, error: errorUpdate }] =
    useUpdateRoleByIdMutation();

  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const navigate = useNavigate();

  const { data: role, error, isLoading } = useGetRoleByIdQuery(id);

  useEffect(() => {
    if (id && errorUpdate) {
      toast.error(`Error occured `);
    }
  }, [id, role]);

  useEffect(() => {
    if (id) {
      if (role) {
        set_role_code(role.data.role_code);
        set_role_name(role.data.role_name);
        set_role_description(role.data.role_description);
      }
    }
  }, [id, role]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updateRole({
        id: id,
        data: { role_name, role_description, role_code },
      }).unwrap();

      if (result.error == true) {
        console.log(result);
        toast.error(result.data.message);
      } else {
        toast.success(result.message);
        navigate("../allroles");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <span>*** Edit Role ***</span>
      <Row>
        <div>
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="role_name">
              <Form.Label>Role Name</Form.Label>
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
            {/* */}
            <Form.Group className="my-2" controlId="Role_code">
              <Form.Label>Role Code</Form.Label>
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
            {/* */}
            <Form.Group className="my-2" controlId="gl_number">
              <Form.Label>Role Description</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Role description"
                value={role_description}
                onChange={(e) => set_role_description(e.target.value)}
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

export default UpdateRole;
