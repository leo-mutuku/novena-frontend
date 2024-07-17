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
import {
  useAddUserRolesMutation,
  useRemoveUserRolesMutation,
} from "../../../slices/administration/userRolesApiSlice";

function UpdateUserRoles() {
  const [user_id, set_user_id] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [roles, set_roles] = useState([]);
  const [addRole, set_addRole] = useState({ role_code: 0, role_name: "" });
  const [removeRole, set_removeRole] = useState({
    role_code: 0,
    role_name: "",
  });
  const [addUserRoles, { isLoading: isLoadingAddUserRoles }] =
    useAddUserRolesMutation();
  const [removeUserRoles, { isLoading: isLoadingRemoveUserRoles }] =
    useRemoveUserRolesMutation();
  const [addRoles, set_addRoles] = useState([]);
  const [removeRoles, set_removeRoles] = useState([]);
  const [all_roles, set_all_roles] = useState([]);
  const { data: allRoles } = useGetAllRolesQuery();

  useEffect(() => {}, [addRoles]);
  useEffect(() => {}, [removeRoles]);

  console.log(addRoles, removeRoles);

  const addRoleBtn = () => {
    if (addRole.role_code === 0) {
      toast.error("Please select a role");
      return;
    }
    const roleIndex = roles.findIndex(
      (role) => role.role_code === addRole.role_code
    );
    if (roleIndex !== -1) {
      // Role exists, update it
      toast.error("Role already exists");
      return;
    } else {
      set_addRoles((prevRoles) => [...prevRoles, addRole]);

      return;
    }
  };

  const removeRoleBtn = () => {
    if (removeRole.role_code === 0) {
      toast.error("Please select a role");
      return;
    }
    const roleIndex = roles.findIndex(
      (role) => role.role_code === removeRole.role_code
    );

    if (roleIndex !== -1) {
      set_removeRoles((prevRoles) => [...prevRoles, removeRole]);
      return;
    } else {
      toast.error("Role does not exist");
      return;
    }
  };

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

  const handleAddRoleField = (e) => {
    const role_name = all_roles.filter((role) => {
      if (parseInt(role.role_code) === parseInt(e.target.value)) {
        return role.role_name;
      }
    });

    if (e.target.value) {
      set_addRole({
        role_code: parseInt(e.target.value),
        role_name: role_name[0].role_name,
      });
    }
  };

  const handleRemoveRoleField = (e) => {
    const role_name = all_roles.filter((role) => {
      if (parseInt(role.role_code) === parseInt(e.target.value)) {
        return role.role_name;
      }
    });
    if (e.target.value) {
      set_removeRole({
        role_code: parseInt(e.target.value),
        role_name: role_name[0].role_name,
      });
    }
  };

  const handleRemooveUserRoles = async () => {
    if (removeRoles.length < 1) {
      toast.error("Please add the roles first");
    }
    try {
      const res = await removeUserRoles({
        user_id: user_id,
        removeRoles,
      }).unwrap();
      if (res.status == "success") {
        toast.success(res.message);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      if (error.data && error.data.message) {
        // This is the response from the server with the error message
        toast.error(error.data.message);
      } else {
        // This is a generic error message if the response does not contain a message
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  const handlAddUserRoles = async () => {
    if (addRoles.length < 1) {
      toast.error("Please add the roles first");
    }

    try {
      const res = await addUserRoles({
        user_id: user_id,
        addRoles,
      }).unwrap();
      if (res.status == "success") {
        toast.success(res.message);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      if (error.data && error.data.message) {
        // This is the response from the server with the error message
        toast.error(error.data.message);
      } else {
        // This is a generic error message if the response does not contain a message
        toast.error("An error occurred. Please try again.");
      }
    }
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
                  value={addRole.role_code}
                  onChange={handleAddRoleField}
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
                onClick={addRoleBtn}
                style={{ marginTop: "10px", cursor: "pointer" }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {addRoles.length !== 0 &&
                addRoles?.map((role) => (
                  <>
                    <span>{role.role_code}</span> <> - </>
                    <span>{role.role_name}</span> <br></br>
                  </>
                ))}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xs={3}>
              {" "}
              <Button
                type="submit"
                variant="primary"
                className="mt-3"
                onClick={handlAddUserRoles}
              >
                Submit
              </Button>
            </Col>
          </Row>
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
                  value={removeRole.role_code}
                  onChange={handleRemoveRoleField}
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
                onClick={removeRoleBtn}
                style={{ marginTop: "10px", cursor: "pointer" }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              {removeRoles.length !== 0 &&
                removeRoles?.map((role) => (
                  <>
                    <span>{role.role_code}</span> <> - </>
                    <span>{role.role_name}</span> <br></br>
                  </>
                ))}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xs={3}>
              <Button
                type="submit"
                variant="primary"
                className="mt-3"
                onClick={handleRemooveUserRoles}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {isLoading && <Loader />}
    </>
  );
}

export default UpdateUserRoles;
