import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateStockIssueMutation } from "../../../slices/store/stockAdjustmentHeadersApiSlice";
import { useGetAllStoreItemsQuery } from "../../../slices/store/storeItemsApiSlice";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewStoreIssue() {
  const [store_item_id, set_store_item_id] = useState("");

  const [issue_value, set_issue_value] = useState("");

  const [created_by, set_created_by] = useState("");

  const [CreateAccount, { isLoading }] = useCreateStockIssueMutation();
  const { data: storeItemsData, isLoading: storeItemsIsLoading } =
    useGetAllStoreItemsQuery();
  const { data: itemRegisterData, isLoading: itemRegisterIsLoading } =
    useGetAllItemRegisterQuery();
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
      const res = await CreateAccount({
        store_item_id,
        issue_value,
        created_by,
      }).unwrap();
      if (res.status == "success") {
        toast.success("Stock Issue created successfully");
        navigate("../allstoreissues");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Stock Issue Form *** </span>

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
            <Form.Group className="my-2" controlId="store_item_id">
              <Form.Label>Store & Item</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="store_item_id"
                value={store_item_id}
                onChange={(e) => set_store_item_id(e.target.value)}
              >
                <option value="">Store & Item</option>
                {storeItemsData?.data
                  .filter((item) => item.store_name === "Machinery Store")
                  .map((item, key) => (
                    <option value={item.store_item_id} key={key}>
                      {item.store_name} -- {item.item_code} -- {item.item_name}{" "}
                      --- {item.item_quantity}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="adjustment_value">
              <Form.Label>Issue Value</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Qty to issue"
                value={issue_value}
                onChange={(e) => set_issue_value(parseFloat(e.target.value))}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={1}>
            <Button type="submit" variant="primary" className="mt-3">
              submit
            </Button>
          </Col>
        </Row>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
}

export default NewStoreIssue;
