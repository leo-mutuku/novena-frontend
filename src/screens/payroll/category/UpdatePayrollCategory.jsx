import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import {
  useUpdatePayrollCategoryMutation,
  useGetPayrollCategoryByIdQuery,
} from "../../../slices/payroll/categoryApiSlice";

function UpdatePayrollCategory() {
  const [category_name, set_category_name] = useState("");
  const [category_code, set_category_code] = useState("");
  const [pay_interval, set_pay_interval] = useState("");
  const [category_id, set_category_id] = useState("");

  const [updateCategory, { isError, isSuccess, error: errorUpdate }] =
    useUpdatePayrollCategoryMutation();

  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const navigate = useNavigate();

  const {
    data: category,
    error,
    isLoading,
  } = useGetPayrollCategoryByIdQuery(id);

  useEffect(() => {
    if (id && errorUpdate) {
      toast.error(`Error occured `);
    }
  }, [id, category]);

  useEffect(() => {
    if (id) {
      if (category) {
        set_category_name(category?.data.category_name);
        set_category_code(category?.data.category_code);
        set_pay_interval(category?.data.pay_interval);
        set_category_id(category?.data.payroll_category_id);
      }
    }
  }, [id, category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (category_name === "" || category_code === "" || pay_interval === "") {
        toast.error("All fields are required");
        return;
      }
      const result = await updateCategory({
        category_id: id,
        data: {
          category_name,
          category_code,
          pay_interval,
        },
      }).unwrap();

      if (result == "failed") {
        toast.error(error.message);
      } else {
        toast.success(result.message);
        navigate("../categories");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <span>*** Update Payroll Category ***</span>
      <Row>
        <div>
          <hr />
        </div>
      </Row>
      <Form>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="payroll_category_name">
              <Form.Label>Payroll Category Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Payroll Category Name"
                value={category_name}
                onChange={(e) => set_category_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="category_code">
              <Form.Label>Payrol Category Code</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Payroll Category Code"
                value={category_code}
                onChange={(e) => set_category_code(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="Pay_interval">
              <Form.Label>Pay Interval (Days)</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Pay Interval (Days)"
                value={pay_interval}
                onChange={(e) => set_pay_interval(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="primary"
          className="mt-3"
        >
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default UpdatePayrollCategory;
