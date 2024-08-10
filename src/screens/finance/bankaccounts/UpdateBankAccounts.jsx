import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

import {
  useGetBankByIdQuery,
  useUpdateBankMutation,
} from "../../../slices/finance/bankAccountsApiSlice";

function UpdateBankAccounts() {
  const [bank, set_bank] = useState("");
  const [balance, set_balance] = useState("");

  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const navigate = useNavigate();

  //call Vehicle get query
  const { data: data, error, isLoading } = useGetBankByIdQuery(id);
  const [updatebank] = useUpdateBankMutation();
  console.log(error);
  useEffect(() => {
    if (id) {
    }
  }, [id, data]);

  useEffect(() => {
    if (id) {
      if (data) {
        set_bank(data?.data.bank_name);
        set_balance(data.data.bank_balance);
      }
    }
  }, [id, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updatebank({
        bank_id: id,
        balance,
      }).unwrap();

      if (result == "failed") {
        toast.error(error.message);
      } else {
        toast.success(result.message);
        navigate("../bankaccounts");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <span>
        *** Direct Bank Account Edit ***{" "}
        <span style={{ color: "red" }}>
          {" "}
          This function will be disable only availed at request. A general
          Journal will be used to effect the changes. Only a super user can edit
          the bank balance. This should be done when no other activities e.g
          sales orders, purchase, payment e.t.c has it can result to false
          reading or updating from invalid record.
        </span>
      </span>
      <Row>
        <div>
          {" "}
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="bank">
              <Form.Label>Bank </Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Bank"
                value={bank}
                onChange={(e) => set_bank(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="model">
              <Form.Label> Balance</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Balance"
                value={balance}
                onChange={(e) => set_balance(e.target.value)}
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

export default UpdateBankAccounts;
