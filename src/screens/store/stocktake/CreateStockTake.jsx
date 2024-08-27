import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateAccountMutation } from "../../../slices/finance/accountsApiSlice";
import { useGetAllStoreItemsQuery } from "../../../slices/store/storeItemsApiSlice";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateStokTake() {
  const [item_code, set_item_code] = useState(null);
  const [store_item, set_store_item] = useState(null);
  const [current_value, set_current_value] = useState(null);
  const [stock_take_list, set_stock_take_list] = useState([]);

  const [created_by, set_created_by] = useState("");

  const [CreateAccount, { isLoading }] = useCreateAccountMutation();
  const { data: storeItemsData, isLoading: storeItemsIsLoading } =
    useGetAllStoreItemsQuery();
  const { data: itemRegisterData, isLoading: itemRegisterIsLoading } =
    useGetAllItemRegisterQuery();
  const { userInfo } = useSelector((state) => state.auth);

  console.log({ storeItemsData, itemRegisterData });

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);

  const handleAdd = (e) => {
    if (!item_code || !store_item || !current_value) {
      return toast.error("All fields are required");
    }
    set_stock_take_list({
      ...stock_take_list,
      item_code,
      store_item,
      current_value,
    });
  };

  console.log(stock_take_list);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await CreateAccount({
        item_code,
        store_item,
        current_value,
        account_balance,
        created_by,
      }).unwrap();
      console.log(res);
      navigate("../allaccounts");
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Stock take *** </span>

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
            <Form.Group className="my-2" controlId="item_code">
              <Form.Label>Item Name</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="item_code"
                value={item_code}
                onChange={(e) => set_item_code(e.target.value)}
              >
                <option value={""}>Select Item name</option>
                {itemRegisterData?.data.map((item, key) => (
                  <option value={item.item_code} key={key}>
                    {item.item_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="store_item">
              <Form.Label>Store & Item</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="Store Item"
                value={store_item}
                onChange={(e) => set_store_item(e.target.value)}
              >
                <option value="">Select store item</option>
                {storeItemsData?.data.map((item, key) => (
                  <option value={item.store_item_id}>
                    {item.store_name} & {item.item_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="current_value">
              <Form.Label>Current Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Quantity"
                value={current_value}
                onChange={(e) => set_current_value(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col xs={1} style={{ marginTop: "40px" }}>
            {" "}
            <Button onClick={handleAdd} variant="primary">
              add
            </Button>
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

export default CreateStokTake;
