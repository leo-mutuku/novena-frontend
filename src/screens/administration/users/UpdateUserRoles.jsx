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
import { MdAdd } from "react-icons/md";
import { MdHorizontalRule } from "react-icons/md";

function UpdateUserRoles() {
  const [user_id, set_user_id] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [roles, set_roles] = useState([]);
  const [addRoles, set_addRoles] = useState([]);
  const [removeRoles, setRemove] = useState([]);
  const [all_roles, set_all_roles] = useState([]);
  const { data: allRoles } = useGetAllRolesQuery();

  console.log(addRoles);
  console.log(removeRoles);

  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const navigate = useNavigate();

  const { data: user, error, isLoading } = useGetUserByIdQuery(id);

  useEffect(() => {
    if (allRoles?.data) {
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

  useEffect(() => {}, [all_roles, roles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      <hr></hr>
      <Row>
        <Col>
          <Row>
            <Col>Add Roles</Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="my-2" controlId="FirstName">
                <Form.Select
                  type="text"
                  required
                  placeholder="First Name"
                  value={""}
                  onChange={""}
                >
                  <option value="">Select Role</option>
                  {all_roles.length &&
                    all_roles?.map((role) => (
                      <option value={role.role_code}>
                        {" "}
                        {role.role_code} - {role.role_name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={2}>
              <MdAdd
                size={30}
                onClick={() => {}}
                style={{ marginTop: "10px", cursor: "pointer" }}
              />
            </Col>
          </Row>
          <Button type="submit" variant="primary" className="mt-3">
            Add role
          </Button>
        </Col>
        <Col>
          <Row>
            <Col>Remove Role</Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <Form.Group className="my-2" controlId="FirstName">
                <Form.Select
                  type="text"
                  required
                  placeholder="First Name"
                  value={""}
                  onChange={""}
                >
                  <option value="">Select Role</option>
                  {all_roles.length &&
                    all_roles?.map((role) => (
                      <option value={role.role_code}>
                        {role.role_code} - {role.role_name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={2}>
              <MdAdd
                size={30}
                onClick={() => {}}
                style={{ marginTop: "10px", cursor: "pointer" }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {isLoading && <Loader />}
    </>
  );
}

export default UpdateUserRoles;
