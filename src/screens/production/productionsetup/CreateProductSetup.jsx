import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Button } from "@mui/material";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGetAllFinalProductsQuery } from "../../../slices/store/itemregisterApiSlice";
import { useGetAllStoreItemsQuery } from "../../../slices/store/storeItemsApiSlice";

const CreateProductSetup = () => {
  const { data: finalProduct } = useGetAllFinalProductsQuery();
  const { data: storeItems } = useGetAllStoreItemsQuery();
  return (
    <>
      <Row>
        <Col>** Create Product setup **</Col>

        <Col sm={1}>
          <Link to={"../productssetuplist"}>
            <IoIosArrowRoundBack size={45} style={{ color: "red" }} />
          </Link>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="Name">
            <Form.Label>Product Name</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Product Name"
              value={""}
              onChange={""}
            >
              <option value={""}>Select Product</option>
              {finalProduct?.data.map((item, index) => (
                <option
                  key={index}
                  value={item.item_code}
                >{`${item.item_code}  -- ${item.item_name}`}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Product Store</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Product Store"
              value={""}
              onChange={""}
            >
              <option value={""}>Select store</option>
              {storeItems?.data.map((item, index) => (
                <option
                  key={index}
                >{`${item.item_name} --  ${item.store_name}`}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col sm={2}>
          {" "}
          <Button variant="outlined">Submit</Button>
        </Col>
      </Row>
    </>
  );
};

export default CreateProductSetup;
