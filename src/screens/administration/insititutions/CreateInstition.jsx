import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useCreateInstitutionMutation } from "../../../slices/administration/institutionsApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateInstition() {
  const [institution_email, set_institution_email] = useState("NULL@NULL");
  const [institution_name, set_institution_name] = useState("");
  const [institution_phone_number, set_institution_phone_number] =
    useState("NULL");
  const [institution_location, set_institution_location] = useState("");

  const [createSupplier, { isLoading }] = useCreateInstitutionMutation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createSupplier({
        institution_email,
        institution_name,
        institution_phone_number,
        institution_location,
      }).unwrap();
      if (res.status === "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        navigate("../allinstitution");
        toast.success("Instituition created successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Institution ***</span>
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
            <Form.Group className="my-2" controlId="institution_email">
              <Form.Label>Institution Email</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="institution_email"
                value={institution_email}
                onChange={(e) => set_institution_email(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="institution_name">
              <Form.Label>Institution name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Institution name"
                value={institution_name}
                onChange={(e) => set_institution_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* staff_number field */}
            <Form.Group className="my-2" controlId="institution_phone_number">
              <Form.Label>Institution phone number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Institution phone number"
                value={institution_phone_number}
                onChange={(e) => set_institution_phone_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="institution_location">
              <Form.Label>Institution location</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Supplier location"
                value={institution_location}
                onChange={(e) => set_institution_location(e.target.value)}
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

export default CreateInstition;
