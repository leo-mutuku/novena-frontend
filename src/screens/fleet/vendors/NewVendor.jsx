import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useCreateVendorMutation } from "../../../slices/fleet/vendorApiSlice";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewVendor() {
  const [vendor_email, set_vendor_email] = useState("null@null");
  const [vendor_name, set_vendor_name] = useState("");
  const [vendor_phone_number, set_vendor_phone_number] = useState("");
  const [vendor_location, set_vendor_location] = useState("");
  const [balance, set_balance] = useState("");

  const [createvendor, { isLoading }] = useCreateVendorMutation();
  const { data: suppliers } = useGetAllItemRegisterQuery();
  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createvendor({
        vendor_email,
        vendor_name,
        vendor_phone_number,
        vendor_location,
        balance,
      }).unwrap();

      navigate("../allvendors");
      toast.success("vendor created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Vendor ***</span>
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
            <Form.Group className="my-2" controlId="supplier_email">
              <Form.Label>Vendor Email</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Vendor Email"
                value={vendor_email}
                onChange={(e) => set_vendor_email(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="supplier_name">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Vendor Name"
                value={vendor_name}
                onChange={(e) => set_vendor_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* staff_number field */}
            <Form.Group className="my-2" controlId="vendor_phone_number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Vendor Phone Number"
                value={vendor_phone_number}
                onChange={(e) => set_vendor_phone_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="supplier_location">
              <Form.Label>Vendor location</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="vendor location"
                value={vendor_location}
                onChange={(e) => set_vendor_location(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="my-2" controlId="balance">
              <Form.Label>Balance </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Balance "
                value={balance}
                onChange={(e) => set_balance(e.target.value)}
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

export default NewVendor;
