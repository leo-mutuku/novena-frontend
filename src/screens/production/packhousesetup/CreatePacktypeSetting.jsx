import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useCreatePackTypeMutation } from "../../../slices/packhousesetup/packTypeSettingApiSlice";
import { toast } from "react-toastify";

const CreatePacktypeSetting = () => {
  const [pack_type_name, set_pack_type_name] = useState();
  const [pay_per_bale, set_pay_per_bale] = useState();
  const [createPacktype, { isLoading, error }] = useCreatePackTypeMutation();
  console.log(error);
  console.log({ pack_type_name, pay_per_bale });

  const handlePackType = async (e) => {
    try {
      const res = await createPacktype({
        pack_type_name,
        pay_per_bale,
      }).unwrap();

      if (res.status == "failed") {
        toast.error("An error occurred");
      } else {
        toast.success("Created successfuly");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Row>
        <Col>** Create Packaging setup **</Col>

        <Col sm={1}>
          <Link to={"../packtypesettings"}>
            <IoIosArrowRoundBack size={45} style={{ color: "red" }} />
          </Link>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Pack type name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Pack type name"
              value={pack_type_name}
              onChange={(e) => set_pack_type_name(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Pay per bale</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Product Store"
              value={pay_per_bale}
              onChange={(e) => set_pay_per_bale(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <br></br>
      <Row>
        <Col></Col>
        <Col sm={2}>
          <Button onClick={handlePackType} variant={"outlined"}>
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CreatePacktypeSetting;
