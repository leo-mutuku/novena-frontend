import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateStockAdjustmentHeaderMutation } from "../../../slices/store/stockAdjustmentHeadersApiSlice";
import { useGetAllStoreItemsQuery } from "../../../slices/store/storeItemsApiSlice";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateStockAdjustment() {
  const [store_item_id, set_store_item_id] = useState("");
  const [adjustment_value, set_adjustment_value] = useState("");
  const [naration, set_naration] = useState("");
  const [adjustment_type, set_adjustment_type] = useState("");

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
      <span>*** Stock Adjustment Form *** </span>

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
                {storeItemsData?.data.map((item, key) => (
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
              <Form.Label>Adjustment Value</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="adjustment_value"
                value={adjustment_value}
                onChange={(e) =>
                  set_adjustment_value(parseFloat(e.target.value))
                }
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="adjustment">
              <Form.Label>Type</Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="Naration"
                value={adjustment_type}
                onChange={(e) => set_adjustment_type(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="positive">Postive</option>
                <option value="negative">Negative</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="naration">
              <Form.Label>Naration</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Naration"
                value={naration}
                onChange={(e) => set_naration(e.target.value)}
              ></Form.Control>
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

export default CreateStockAdjustment;
