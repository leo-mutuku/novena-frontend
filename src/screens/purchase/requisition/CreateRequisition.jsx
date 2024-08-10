import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useCreateAccountMutation,
  useGetAllAccountsQuery,
} from "../../../slices/finance/accountsApiSlice";

// import { useGetAllAccountsQuery } from "../../../slices/finance/accountsApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateRequisition() {
  const [created_by, set_created_by] = useState("");

  const [purchase_list, set_purchase_list] = useState([]);
  const [purcharse_item, set_purchase_item] = useState({
    item_name: "",
    account_number: "",
    quantity: "",
    account_balance: "",
    unit_cost: "",
  });

  const [CreateAccount, { isLoading }] = useCreateAccountMutation();
  const { data: accountsData } = useGetAllAccountsQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);
  const handleAdd = () => {
    if (
      purcharse_item.item_name &&
      purcharse_item.account_number &&
      purcharse_item.quantity &&
      purcharse_item.unit_cost
    ) {
      set_purchase_list([...purchase_list, purcharse_item]);
      return;
    }
    toast.error("All fields are required!");
    return;
  };
  const removeItem = (index) => {
    const item = purchase_list.filter((item) => item !== purchase_list[index]);
    set_purchase_list(item);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await CreateAccount({
        item_name,
        account_number,
        quantity,
        account_balance,
        created_by,
      }).unwrap();

      navigate("../allstorerequisitions");
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Purchase order *** </span>

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
            <Form.Group className="my-2" controlId="item_name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="item_name"
                value={purcharse_item.item_name}
                onChange={(e) =>
                  set_purchase_item({
                    ...purcharse_item,
                    item_name: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="account_number">
              <Form.Label>Account Name</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="account_number"
                value={purcharse_item.account_number}
                onChange={(e) =>
                  set_purchase_item({
                    ...purcharse_item,
                    account_number: e.target.value,
                  })
                }
              >
                <option value={""}> Account Name</option>
                {accountsData?.data.map((item, key) => (
                  <option value={item.account_number}>
                    {item.account_number} | {item.account_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Quantity"
                value={purcharse_item.quantity}
                onChange={(e) =>
                  set_purchase_item({
                    ...purcharse_item,
                    quantity: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="unit_cost">
              <Form.Label>@ cost</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="unit_cost"
                value={purcharse_item.unit_cost}
                onChange={(e) =>
                  set_purchase_item({
                    ...purcharse_item,
                    unit_cost: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col xs={1} style={{ marginTop: "40px" }}>
            <Button onClick={handleAdd}>Add</Button>
          </Col>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th> Name</th>
                <th>Account</th>
                <th>Quantity</th>
                <th>@</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {purchase_list?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.item_name}</td>
                  <td>{item.account_number}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit_cost}</td>
                  <td>
                    {parseFloat(item.quantity) * parseFloat(item.unit_cost)}
                  </td>
                  <td onClick={() => removeItem(index)}>Remove</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>

        <Button type="submit" variant="primary" className="mt-3">
          submit
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
}

export default CreateRequisition;
