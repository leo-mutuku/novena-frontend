import React from "react";
import { Row, Form, Col } from "react-bootstrap";
import { Button, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useSingleSMSMutation } from "../../../slices/administration/bulkSmsApiSlice";

const SendToCustom = () => {
  const [sendSingleSMS] = useSingleSMSMutation();
  const handleSendSms = async () => {
    try {
      if (!message || !mobileNumbers) {
        toast.error("Please fill all fields");
        return;
      }
      if (mobileNumbers.length !== 10) {
        toast.error("Please enter valid mobile number, it should be 10 digits");
        return;
      }
      const res = await sendSingleSMS({
        message,
        mobileNumbers,
      }).unwrap();
      if (res.status === 200 || res.status === "success") {
        toast.success("Message sent successfully");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.data.message || "Something went wrong");
    }

    // TODO: Implement send sms functionality
  };
  const [message, setMessage] = React.useState("");
  const [mobileNumbers, setMobileNumbers] = React.useState("");
  return (
    <>
      <Row>
        <Col>
          <p>** Custom Subscriber!</p>
        </Col>
        <Col xs={3} md={3}>
          {" "}
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleSendSms}>
              Send SMS
            </Button>
          </Stack>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Form>
          <Stack>
            <Form.Group className="mb-3">
              <Form.Label>Type message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
          </Stack>
        </Form>
      </Row>
      <Row>
        <Form>
          <Stack>
            <Form.Group className="mb-3">
              <Form.Label>Paste or Type mobile number</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={mobileNumbers}
                onChange={(e) => setMobileNumbers(e.target.value)}
              />
            </Form.Group>
          </Stack>
        </Form>
      </Row>
    </>
  );
};

export default SendToCustom;
