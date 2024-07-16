import React, { useState } from "react";
import {
  useUpdateInstitutionMutation,
  useGetInstitutionByIdQuery,
} from "../../../slices/administration/institutionsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";

const UpdateInstitution = () => {
  const navigate = useNavigate();
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  console.log(id);
  const [institution_email, set_institution_email] = useState("");
  const [institution_name, set_institution_name] = useState("");
  const [institution_location, set_institution_location] = useState("");
  const [institution_phone_number, set_institution_phone_number] = useState("");
  const { data: institution } = useGetInstitutionByIdQuery(id);

  console.log(institution?.data);

  const handleSubmit = () => {};
  return (
    <>
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
};

export default UpdateInstitution;
