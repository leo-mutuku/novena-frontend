import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateCashAccountMutation } from "../../../slices/finance/cashAccountApiSlice";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateCashAccount() {
  const [cash_account_number, set_cash_account_number] = useState("");
  const [cash_account_name, set_cash_account_name] = useState("");
  const [gl_number, set_gl_number] = useState("");
  const [cash_account_balance, set_cash_account_balance] = useState("");
  const [cash_account_owner, set_cash_account_owner] = useState("");
  const [staff_id, set_staff_id] = useState("");

  const [created_by, set_created_by] = useState("");

  const [createAccount, { isLoading }] = useCreateCashAccountMutation();
  const { data: staffdata } = useGetAllStaffQuery();
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
      const res = await createAccount({
        cash_account_number,
        cash_account_name,
        gl_number,
        cash_account_balance,
        staff_id,
        created_by,
      }).unwrap();
      navigate("../allcashaccounts");
      toast.success("Bank Account created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Cash Account ***</span>
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
            <Form.Group className="my-2" controlId="cash_account_number">
              <Form.Label>Cash Account Number</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="cash_account_number"
                value={cash_account_number}
                onChange={(e) => set_cash_account_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="cash_account_name">
              <Form.Label>Cash Account Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="cash_account_name"
                value={cash_account_name}
                onChange={(e) => set_cash_account_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="gl_number">
              <Form.Label>Gl number</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Gl number"
                value={gl_number}
                onChange={(e) => set_gl_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="cash_account_balance">
              <Form.Label>Cash Account balance</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="cash_account_balance"
                value={cash_account_balance}
                onChange={(e) => set_cash_account_balance(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="cash_account_owner">
              <Form.Label>Cash Account Owner</Form.Label>
              <Form.Select
                required
                type="number"
                placeholder="cash_account_owner"
                value={staff_id}
                onChange={(e) => set_staff_id(e.target.value)}
              >
                <option value="">Select</option>
                {staffdata?.data.map((staff, key) => (
                  <option key={key} value={staff.staff_id}>
                    {staff.first_name} {staff.last_name} | {staff.staff_id}
                  </option>
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

export default CreateCashAccount;
