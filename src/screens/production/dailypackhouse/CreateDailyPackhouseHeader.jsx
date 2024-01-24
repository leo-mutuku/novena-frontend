import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateProductionHeaderMutation } from "../../../slices/production/productionHeaderApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateDailyPackhouseHeader() {
  const [production_officer, set_production_officer] = useState("");
  const [production_input, set_production_input] = useState("");
  const [expected_output, set_expected_output] = useState("");
  const [pack_date, set_pack_date] = useState("");
  const [pack_officer, set_pack_officer] = useState("");
  const [created_by, set_created_by] = useState("");

  const [ProductionHeader, { isLoading }] = useCreateProductionHeaderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
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
        production_officer,
        production_input,
        expected_output,
        pack_date,
        pack_officer,
        created_by,
      }).unwrap();

      navigate("../allproductionheaders");
      toast.success("Production Iniated Successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** New Daily Pack House *** </span>

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
            <Form.Group className="my-2" controlId="expected_output">
              <Form.Label>Pack Type</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="Expected Output"
                value={expected_output}
                onChange={(e) => set_expected_output(e.target.value)}
              >
                <option>Pack Type</option>
                <option value={1}>1 KG Bale</option>
                <option value={0.5}>1/2 KG Bale</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="production_officer">
              <Form.Label>Pay Per bale</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Ksh 0.00 "
                value={production_officer}
                onChange={(e) => set_production_officer(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="pack_date">
              <Form.Label>Pack Date</Form.Label>
              <Form.Control
                type="date"
                required
                placeholder="Pack Date"
                value={pack_date}
                onChange={(e) => set_pack_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="pack_officer">
              <Form.Label>Pack Officer</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder=""
                value={pack_officer}
                onChange={(e) => set_pack_officer(e.target.value)}
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

export default CreateDailyPackhouseHeader;
