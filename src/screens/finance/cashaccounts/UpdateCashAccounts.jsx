import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

import { useGetCashAccountByIdQuery } from "../../../slices/finance/cashAccountApiSlice";

function UpdateCashAccounts() {
  const [cash_account, set_cash_account] = useState("");
  const [balance, set_balance] = useState("");

  // const [updateGL, { isError, isSuccess, error: errorUpdate }] =
  //   useUpdateGLAccountByIdMutation();

  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const navigate = useNavigate();

  //call Vehicle get query
  const { data: cash, error, isLoading } = useGetCashAccountByIdQuery(id);
  console.log(cash?.data);
  console.log(error);
  useEffect(() => {
    if (id) {
    }
  }, [id, cash]);
  cash_account;

  useEffect(() => {
    if (id) {
      if (cash) {
        set_cash_account(cash.data.cash_account_name);
        set_balance(parseFloat(cash.data.cash_account_balance));
      }
    }
  }, [id, cash]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    cash_account;

    // try {
    //   const result = await updateGL({
    //     id: id,
    //     data: { cash_account, balance },
    //   }).unwrap();

    //   if (result == "failed") {
    //     toast.error(error.message);
    //   } else {
    //     toast.success(result.message);
    //     navigate("../allcash");
    //   }
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };
  return (
    <>
      <span>
        *** Direct Cash Account Editting ***
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
            <Form.Group className="my-2" controlId="cash_account">
              <Form.Label>Cash Account </Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Cash Account"
                value={cash_account}
                onChange={(e) => set_cash_account(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="model">
              <Form.Label>Balance</Form.Label>
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

export default UpdateCashAccounts;
