import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateStockAdjustmentHeaderMutation } from "../../../slices/store/stockAdjustmentHeadersApiSlice";
import { useGetAllStoreItemsQuery } from "../../../slices/store/storeItemsApiSlice";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewStoreIssue() {
  const [store_item_id, set_store_item_id] = useState("");
  const [adjustment_value, set_adjustment_value] = useState("");
  const [naration, set_naration] = useState("");
  const [adjustment_type, set_adjustment_type] = useState("");
  const [qty_to_issue, set_qty_to_issue] = useState("");

  const [created_by, set_created_by] = useState("");

  const [CreateAccount, { isLoading }] =
    useCreateStockAdjustmentHeaderMutation();
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
        adjustment_value,
        adjustment_type,
        naration,
        created_by,
      }).unwrap();
      if (res.status == "success") {
        toast.success("Stock Adjustment created successfully");
        navigate("../allstockadjustment");
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
              <Form.Label>Qty To Issue</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Qty to issue"
                value={qty_to_issue}
                onChange={(e) => set_qty_to_issue(parseFloat(e.target.value))}
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
