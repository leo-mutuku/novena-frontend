import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateProductionHeaderMutation } from "../../../slices/production/productionHeaderApiSlice";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

function CreateProductionHeader() {
  const [production_officer, set_production_officer] = useState("");
  const [production_input, set_production_input] = useState("");
  const [expected_output, set_expected_output] = useState("");
  const [production_date, set_production_date] = useState("");
  const [naration, set_naration] = useState("");
  const [created_by, set_created_by] = useState("");

  const [ProductionHeader, { isLoading }] = useCreateProductionHeaderMutation();
  const { data: staff } = useGetAllStaffQuery();

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
      const res = await ProductionHeader({
        production_officer,
        production_input,
        expected_output,
        production_date,
        naration,
        created_by,
      }).unwrap();
      if (res.status == "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        toast.success("Production Iniated Successfully");
        navigate("../allproductionheaders");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** New Production *** </span>

      <Row>
        <div>
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        {/* */}
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="production_input">
              <Form.Label>Input</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="production_input"
                value={production_input}
                onChange={(e) => set_production_input(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="expected_output">
              <Form.Label>Expected Output</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Expected Output"
                value={expected_output}
                onChange={(e) => set_expected_output(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="production_date">
              <Form.Label>Production Date</Form.Label>
              <Form.Control
                type="date"
                required
                placeholder="production_date"
                value={production_date}
                onChange={(e) => set_production_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="expected_output">
              <Form.Label>Naration</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Shift"
                value={naration}
                onChange={(e) => set_naration(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="production_officer">
              <Form.Label>Production officer</Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="Officer "
                value={production_officer}
                onChange={(e) => set_production_officer(e.target.value)}
              >
                <option>Staff</option>
                {staff?.data.map((item) => (
                  <>
                    <option value={item.staff_id}>{item.first_name}</option>
                  </>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          submit
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default CreateProductionHeader;
