import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetAllStoreRegisterQuery } from "../../../slices/store/storeRegisterApiSlice";
// import { use } from "../../../slices/store/itemregisterApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateStockTake() {
  const [item_name, set_item_name] = useState("");
  const [item_code, set_item_code] = useState("");
  const [store_name, set_store_name] = useState("");
  const [system_balance, set_system_balance] = useState("");
  const [store_balance, set_store_balance] = useState("");
  const [created_by, set_created_by] = useState("");
  const [stock_take_list, set_stock_take_list] = useState([]);

  const { data: store_items } = useGetAllStoreRegisterQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   // const res = await CreateAccount({
    //   //   account_name,
    //   //   account_number,
    //   //   gl_number,
    //   //   account_balance,
    //   //   created_by,
    //   // }).unwrap();
    //   // console.log(res);
    //   navigate("../allaccounts");
    //   toast.success("Account created successfully");
    // } catch (err) {
    //   toast.error(err?.data?.message || err.error);
    // }
  };
  const handleStore = (e) => {};
  const handleItem = (e) => {};
  return (
    <>
      <span>*** Stock Take *** </span>

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
              <Form.Label>Item Name</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="account_name"
                value={item_code}
                onChange={handleItem}
              >
                <option value={""}>Select Acccount</option>
                {store_items?.data.map((item, key) => (
                  <option key={key} value={item.item_code}>
                    {item.item_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="item_name">
              <Form.Label>Store</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="Description"
                value={item_name}
                onChange={handleStore}
              >
                <option value={""}>Select Store</option>
                {store_items?.data.map((item, key) => (
                  <>
                    <option key={key} value={item.store_code}>
                      {" "}
                      {item.store_name}
                    </option>
                  </>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* <Row>
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
        </Row> */}
        <div>
          <Button>Add</Button>
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

export default CreateStockTake;
