import React from "react";
import { Row, Form, Col } from "react-bootstrap";
import { Button, Stack } from "@mui/material";

const SendToCustom = () => {
  return (
    <>
      <Row>
        <Col>
          <p>** Custom Subscriber!</p>
        </Col>
        <Col xs={3} md={3}>
          {" "}
          <Stack spacing={2} direction="row">
            <Button variant="outlined">Send Bulk SMS</Button>
          </Stack>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Form>
          <Stack>
            <Form.Group className="mb-3">
              <Form.Label>Type message</Form.Label>
              <Form.Control as="textarea" rows={4} />
            </Form.Group>
          </Stack>
        </Form>
      </Row>
      <Row>
        <Form>
          <Stack>
            <Form.Group className="mb-3">
              <Form.Label>Paste Comma Separate mobile number</Form.Label>
              <Form.Control as="textarea" rows={4} />
            </Form.Group>
          </Stack>
        </Form>
      </Row>
    </>
  );
};

export default SendToCustom;
