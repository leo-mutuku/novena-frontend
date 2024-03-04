import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useCreatePackagingSetupMutation } from "../../../slices/productionsetup/packageSettingApiSlice";
import {
  useGetAllFinalProductsQuery,
  useGetAllPackagingMaterialQuery,
} from "../../../slices/store/itemregisterApiSlice";
import { useGetAllStoreItemsQuery } from "../../../slices/store/storeItemsApiSlice";

const CreatePackageSetup = () => {
  const [createPackageSetup, { isLoading }] = useCreatePackagingSetupMutation();
  const { data: itemRegister } = useGetAllFinalProductsQuery();
  const { data: packagingMaterial } = useGetAllPackagingMaterialQuery();
  const { data: storeItem } = useGetAllStoreItemsQuery();
  return (
    <>
      <Row>
        <Col>** Create Packaging setup **</Col>

        <Col sm={1}>
          <Link to={"../packagesetuplist"}>
            <IoIosArrowRoundBack size={45} style={{ color: "red" }} />
          </Link>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Product Name</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Product Store"
              value={""}
              onChange={""}
            >
              <option value={""}>Select product</option>
              {itemRegister?.data.map((item, index) => (
                <option key={index} value={item.item_code}>
                  {item.item_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Package 1 Name</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Product Store"
              value={""}
              onChange={""}
            >
              <option value={0}> Select packaging</option>
              {storeItem?.data.map((item, index) => (
                <option key={index} value={item.item_code}>
                  {`${item.item_code}  -- ${item.item_name}`}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Re-Order level</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Re-Order level"
              value={""}
              onChange={""}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Package 1 Name</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Product Store"
              value={""}
              onChange={""}
            >
              <option value={0}> Select packaging</option>
              {storeItem?.data.map((item, index) => (
                <option key={index} value={item.item_code}>
                  {`${item.item_code}  -- ${item.item_name}`}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Re-Order level</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Re-Order level"
              value={""}
              onChange={""}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col></Col>
        <Col sm={2}>
          <Button variant={"outlined"}>Submit</Button>
        </Col>
      </Row>
    </>
  );
};

export default CreatePackageSetup;
