import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetAllAccountsQuery } from "../../../slices/finance/accountsApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateRequisition() {
  const [account_number, set_account_number] = useState("");
  const [item_name, set_item_name] = useState("");
  const [item_qauntity, set_item_quantity] = useState("");
  const [unit_price, set_unit_price] = useState("");
  const [created_by, set_created_by] = useState("");
  const [requisition_list, set_requisition_list] = useState([]);

  const { data: accounts } = useGetAllAccountsQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);
  const handleSubmit = async (e) => {};
  const handleAccount = (e) => {};
  return (
    <>
      <span>*** Create Account *** </span>

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
            <Form.Group className="my-2" controlId="account_name">
              <Form.Label>Account name</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="account_name"
                value={account_number}
                onChange={handleAccount}
              >
                <option value={""}>Select Acccount</option>
                {accounts?.data.map((item, key) => (
                  <option key={key} value={item.account_number}>
                    {item.account_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="item_name">
              <Form.Label>Requisition Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Description"
                value={item_name}
                onChange={(e) => set_item_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="Quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Quantity"
                value={item_qauntity}
                onChange={(e) => set_item_quantity(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="unit_price">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Unit price"
                value={unit_price}
                onChange={(e) => set_unit_price(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <div>
          <Button>Add</Button>
        </div>
        <div>
          {requisition_list?.length === "" ? (
            <>Add items to purcharse</>
          ) : (
            <>
              <p>Add items to purcharse</p>
            </>
          )}
        </div>
        <div className="d-flex flex-row-reverse bd-highlight">
          <Button
            type="submit"
            variant="primary"
            className="mt-3 text-left float-right"
          >
            submit
          </Button>
        </div>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
}

export default CreateRequisition;
