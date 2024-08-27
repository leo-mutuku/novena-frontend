import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Button, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useBulkySMSMutation } from "../../../slices/administration/bulkSmsApiSlice";

const SendBulkSMS = () => {
  const [PostSMS, { isLoading }] = useBulkySMSMutation();
  const [suppliers, set_suppliers] = useState(false);
  const [staff, set_staff] = useState(false);
  const [customers, set_customers] = useState(false);
  const [pack_house, set_pack_house] = useState(false);
  const [sales, set_sales] = useState(false);

  const [to, set_to] = useState([]);
  const [preview, set_preview] = useState("none");

  const [message, set_message] = useState([]);
  function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }
  const handSendMessage = (e) => {
    if (to?.length !== 0 && message !== "") {
      const res = PostSMS({
        to,
        message,
      }).unwrap();
      if (res.status === "failed") {
        toast.error("Error, we could not send your message");
      } else {
        toast.success("Message send!");
      }
    } else {
      toast.error(
        "Heyy! please check if all the required field are set! Atleast one  group is required and message must not be empty!"
      );
    }
  };
  const handleStaff = (e) => {
    if (staff === true) {
      set_staff(!staff);
      removeItemAll(to, "staff");
    }
    if (staff === false) {
      set_to([...to, "staff"]);
      set_staff(!staff);
    }
  };
  const handleCustomers = (e) => {
    if (customers === true) {
      set_customers(!customers);
      removeItemAll(to, "customers");
    }
    if (customers === false) {
      set_to([...to, "customers"]);
      set_customers(!customers);
    }
  };
  const handlePackHouse = (e) => {
    if (pack_house === true) {
      set_pack_house(!pack_house);
      removeItemAll(to, "pack_house");
    }
    if (pack_house === false) {
      set_to([...to, "pack_house"]);
      set_pack_house(!pack_house);
    }
  };
  const handleSales = (e) => {
    if (sales === true) {
      set_sales(!sales);
      removeItemAll(to, "sales");
    }
    if (sales === false) {
      set_to([...to, "sales"]);
      set_sales(!sales);
    }
  };
  const handleSupplier = (e) => {
    if (suppliers === true) {
      set_suppliers(!suppliers);
      removeItemAll(to, "suppliers");
    }
    if (suppliers === false) {
      set_to([...to, "suppliers"]);
      set_suppliers(!suppliers);
    }
  };

  const handleReset = (e) => {
    set_to([]);
    set_customers(false);
    set_pack_house(false);
    set_staff(false);
    set_suppliers(false);
    set_sales(false);
    set_message("");
    set_preview("none");
  };

  const handleConfirm = (e) => {
    if (to?.length !== 0 && message !== "") {
      set_preview("block");
    } else {
      toast.error(
        "Atleast one  group is required and message must not be empty!"
      );
    }
  };
  useEffect(() => {}, [sales, pack_house, to]);

  return (
    <>
      <Row>
        <p>**Send bulk messages**</p>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Check // prettier-ignore
              type="switch"
              label="All Customers"
              id="customers"
              checked={customers}
              onChange={handleCustomers}
            />
            <Form.Check // prettier-ignore
              type="switch"
              label="All Suppliers"
              id="suppliers"
              checked={suppliers}
              onChange={handleSupplier}
            />
            <Form.Check // prettier-ignore
              type="switch"
              label="All Staff"
              id="staff"
              checked={staff}
              onChange={handleStaff}
            />
            <Form.Check // prettier-ignore
              type="switch"
              label="All Pack House"
              id="pack_house"
              checked={pack_house}
              onChange={handlePackHouse}
            />
            <Form.Check // prettier-ignore
              type="switch"
              label="All Sales"
              id="sales"
              checked={sales}
              onChange={handleSales}
            />
            <br />
            <Stack spacing={2} direction="row">
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="outlined" onClick={handleConfirm}>
                Confirm
              </Button>
            </Stack>
          </Form>
        </Col>

        <Col xs={9} md={9}>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={(e) => set_message(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <br></br>
      <Row>
        <hr></hr>
        <Col style={{ display: `${preview}` }}>
          <span>
            I have verified and confirmed the message has no errors. Please
            click the reset to start over incase of error!
          </span>
          <br></br>
          <br></br>
          {to?.map((item, index) => (
            <span key={index} style={{ fontWeight: "bold" }}>
              {item} {"  , "}
            </span>
          ))}
          <br></br>
          <br></br>
          <span style={{ fontWeight: "bold" }}> {message}</span>
          <br></br>
          <br></br>

          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handSendMessage}>
              Send Bulk SMS
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default SendBulkSMS;
