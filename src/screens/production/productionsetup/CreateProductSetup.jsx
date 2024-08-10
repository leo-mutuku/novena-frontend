import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Button } from "@mui/material";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGetAllFinalProductsQuery } from "../../../slices/store/itemregisterApiSlice";
import { useGetAllStoreItemsQuery } from "../../../slices/store/storeItemsApiSlice";
import { useCreateProductSetupMutation } from "../../../slices/productionsetup/productSettingApliSlice";
import { toast } from "react-toastify";

const CreateProductSetup = () => {
  const { data: finalProduct } = useGetAllFinalProductsQuery();
  const { data: storeItems } = useGetAllStoreItemsQuery();
  const [createProduct, { isLoading }] = useCreateProductSetupMutation();
  const [store_id, set_store_id] = useState(null);
  const [product_code, set_product_code] = useState(null);
  const handleProduct = async (e) => {
    const res = await createProduct({
      store_id,
      product_code,
    }).unwrap();

    if (res.status == "failed") {
      toast.error("An error occoured");
    } else {
      toast.success("Product added successfully");
    }

    try {
    } catch (error) {
      toast.error(error.message);
    }
  };
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
              value={product_code}
              onChange={(e) => set_product_code(parseInt(e.target.value))}
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
              value={store_id}
              onChange={(e) => set_store_id(parseInt(e.target.value))}
            >
              <option value={""}>Select store</option>
              {storeItems?.data.map((item, index) => (
                <option
                  key={index}
                  value={item.store_item_id}
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
          <Button onClick={handleProduct} variant="outlined">
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CreateProductSetup;
