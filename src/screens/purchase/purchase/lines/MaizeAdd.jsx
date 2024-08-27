import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useCreateMaizePurchaseMutation } from "../../../../slices/purchase/maizePurchaseApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const MaizeAdd = ({ set_item_edit_state, items_to_edit }) => {
  const [item_to_edit, set_item_to_edit] = useState(items_to_edit);
  const [driver_name, set_driver_name] = useState("");
  const [driver_phone_number, set_driver_phone_number] = useState("");
  const [moisture, set_moisture] = useState("");
  const [aflotoxin, set_aflotoxin] = useState("");
  const [created_by, set_created_by] = useState("");

  const [store_purchase_number, set_store_purchase_number] = useState("");

  const [maize_details, { isLoading }] = useCreateMaizePurchaseMutation();
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
      const res = await maize_details({
        store_purchase_number: items_to_edit?.purchase_header_id,
        store_purchase_line_number: items_to_edit?.store_purchase_line_id,
        driver_name,
        driver_phone_number,
        moisture_content: moisture,
        aflotoxin_level: aflotoxin,
        prepared_by: created_by,
      }).unwrap();
      if (res.status === "failed") {
        toast.error("An error occurred");
        navigate("../allstorepurchasesintransit");
      } else {
        toast.success("Maize details added successfully");
        navigate("../allstorepurchasesintransit");
      }
      navigate("../allstorepurchase");
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  return (
    <div
      style={{
        background: "rgb(52 51 51 / 99%)",
        width: "85%",
        position: "absolute",
        padding: "2%",
        marginTop: "2%",
        marginLeft: "5%",
        zIndex: "99999",
      }}
    >
      <div style={{ color: "white" }}>
        <Row>
          <span
            style={{
              textAlign: "right",
              marginRight: "0px",
              cursor: "pointer",
              zIndex: "9999",
            }}
            onClick={(e) => set_item_edit_state("none")}
          >
            X
          </span>
          <span style={{ marginTop: "-2%" }}>
            Purchase order Item: {items_to_edit?.purchase_header_id}{" "}
            &nbsp;&nbsp;&nbsp; Item No: {items_to_edit?.store_purchase_line_id}{" "}
            &nbsp;&nbsp;&nbsp; Supplier Name: {items_to_edit?.supplier_name}
            &nbsp;&nbsp;&nbsp; Supplier No:{items_to_edit?.supplier_number}{" "}
            &nbsp;&nbsp;&nbsp; Total Cost: {items_to_edit?.total_cost_per_item}
          </span>
        </Row>
      </div>
      <div>
        <hr style={{ color: "white" }} />
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="my-2" controlId="driver_name">
                <Form.Label style={{ color: "white" }}>Driver Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={driver_name}
                  placeholder="Enter Driver's name"
                  onChange={(e) => set_driver_name(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="my-2" controlId="driver_phone_number">
                <Form.Label style={{ color: "white" }}>
                  Driver Phone number
                </Form.Label>
                <Form.Control
                  type="number"
                  required
                  value={driver_phone_number}
                  placeholder="Driver Phone number"
                  onChange={(e) => set_driver_phone_number(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="my-2" controlId="moisture">
                <Form.Label style={{ color: "white" }}>
                  Moisture content
                </Form.Label>
                <Form.Control
                  type="number"
                  required
                  value={moisture}
                  onChange={(e) => set_moisture(e.target.value)}
                  placeholder="Moisture content"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="my-2" controlId="account_number">
                <Form.Label style={{ color: "white" }}>
                  Aflatoxin level
                </Form.Label>
                <Form.Control
                  type="number"
                  required
                  value={aflotoxin}
                  onChange={(e) => set_aflotoxin(e.target.value)}
                  placeholder="Aflatoxin level"
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ display: "flex", alignItems: "center" }}>
            <Form.Group className="my-2" controlId="account_number">
              <Button
                style={{ width: "20%", textAlign: "center" }}
                type="submit"
              >
                Submit
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default MaizeAdd;
