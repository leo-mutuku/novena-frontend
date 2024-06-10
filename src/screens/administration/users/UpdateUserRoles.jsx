import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import {
  useGetAllRolesQuery,
  useUpdateRoleByIdMutation,
} from "../../../slices/administration/rolesSlice";
import { useGetUserByIdQuery } from "../../../slices/administration/usersApiSlice";

function UpdateUserRoles() {
  const [user_id, set_user_id] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [roles, set_roles] = useState([]);
  const [all_roles, set_all_roles] = useState([]);
  const { data: allRoles } = useGetAllRolesQuery();

  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const navigate = useNavigate();

  const { data: user, error, isLoading } = useGetUserByIdQuery(id);

  useEffect(() => {
    if (allRoles) {
      set_all_roles(...all_roles, allRoles.data);
    }
  }, [allRoles]);

  useEffect(() => {
    if (id) {
      if (user) {
        set_user_id(user.data.user_id);
        set_first_name(user.data.first_name);
        set_last_name(user.data.last_name);

        set_roles(...roles, user.data.roles);
      }
    }
  }, [id, user, allRoles]);

  useEffect(() => {
    // subset
    //super set
  }, [all_roles, roles]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const result = await updateRole({
    //     id: id,
    //     data: { role_name, role_description, role_code },
    //   }).unwrap();

    //   if (result.error == true) {
    //     console.log(result);
    //     toast.error(result.data.message);
    //   } else {
    //     toast.success(result.message);
    //     navigate("../allroles");
    //   }
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };
  return (
    <>
      <span>*** {first_name + " " + last_name}***</span>
      <Row>
        <div>
          <hr />
        </div>
      </Row>
      <Row>
        <Col>
          <p>All Roles</p>
          <div
            style={{
              maxHeight: "200px",
              minHeight: "200px",
              overflow: "scroll",
              border: "1px solid #ccc",
              padding: "2px",
            }}
          >
            {all_roles.length &&
              all_roles?.map((role) => (
                <>
                  <span>{role.role_code}</span> <span>{role.role_name}</span>{" "}
                  <br></br>
                </>
              ))}
          </div>
        </Col>
        <Col>
          <p>Assigned Roles</p>
          <div
            style={{
              maxHeight: "200px",
              minHeight: "200px",
              overflow: "scroll",
              border: "1px solid #ccc",
              padding: "2px",
            }}
          >
            {roles.length &&
              roles?.map((role) => (
                <>
                  <span>{role.role_code}</span> <> - </>
                  <span>{role.role_name}</span> <br></br>
                </>
              ))}
          </div>
        </Col>
      </Row>
      {/* <Row>
        <Col>
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
      </Row> */}
      <Button type="submit" variant="primary" className="mt-3">
        Update
      </Button>
      {isLoading && <Loader />}
    </>
  );
}

export default UpdateUserRoles;
