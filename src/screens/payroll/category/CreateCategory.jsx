import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useCreatePayrollCategoryMutation } from "../../../slices/payroll/categoryApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateCategory() {
  const [category_name, set_category_name] = useState("");
  const [category_code, set_category_code] = useState("");
  const [pay_interval, set_pay_interval] = useState("");
  const [created_by, set_created_by] = useState("");

  const [createPayrollCategory, { isLoading, error }] =
    useCreatePayrollCategoryMutation();
  console.log(error);
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
      const res = await createPayrollCategory({
        category_name,
        category_code,
        pay_interval,
        created_by,
      }).unwrap();
      if (res.status == "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        navigate("../categories");
        toast.success("Payroll Category created successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Payroll Category ***</span>
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
            <Form.Group className="my-2" controlId="category_name">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Category Name"
                value={category_name}
                onChange={(e) => set_category_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="category_code">
              <Form.Label>Category_code</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="category code"
                value={category_code}
                onChange={(e) => set_category_code(parseInt(e.target.value))}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* staff_number field */}
            <Form.Group className="my-2" controlId="pay_interval">
              <Form.Label>Pay Interval</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="pay_interval"
                value={pay_interval}
                onChange={(e) => set_pay_interval(parseInt(e.target.value))}
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

export default CreateCategory;
