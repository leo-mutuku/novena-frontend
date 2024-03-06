import React, { useState } from "react";
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
import { toast } from "react-toastify";

const CreatePackageSetup = () => {
  const [product_code, set_product_code] = useState(null);

  const [store_id_one, set_store_id_one] = useState("");
  const [store_item_id, set_store_item_id] = useState("");
  const [store_item_id_2, set_store_item_id_2] = useState("");

  const [package_code_one, set_package_code_one] = useState("");
  const [package_one_restock, set_package_one_restock] = useState(null);
  const [store_id_two, set_store_id_two] = useState(0);
  const [store_name_two, set_store_name_two] = useState("null");
  const [package_code_two, set_package_code_two] = useState(0);
  const [package_name_two, set_package_name_two] = useState(0);
  const [package_two_restock, set_package_two_restock] = useState(0);
  const [createPackageSetup, { isLoading }] = useCreatePackagingSetupMutation();
  const { data: itemRegister } = useGetAllFinalProductsQuery();
  const { data: storeItem, error } = useGetAllStoreItemsQuery();

  //

  const handleProductName = (e) => {
    let x = itemRegister?.data?.filter((a) => {
      if (a.item_code == e.target.value) {
        return a.item_code;
      }
    });

    set_product_code(parseInt(e.target.value));
  };
  const handlePackageOne = (e) => {
    let x = storeItem?.data?.filter((a) => {
      if (a.store_item_id == e.target.value) {
        return a.store_item_id;
      }
    });

    set_store_id_one(parseInt(e.target.value));
    set_store_item_id(e.target.value);
    set_package_code_one(x[0].item_code);
  };
  const handPackageTwo = (e) => {
    let x = storeItem?.data?.filter((a) => {
      if (a.store_item_id == e.target.value) {
        return a.store_item_id;
      }
    });

    set_store_id_two(e.target.value);
    set_store_item_id_2(e.target.value);
    set_package_code_two(x[0].item_code);
  };
  const handleSubmit = async (e) => {
    try {
      const res = await createPackageSetup({
        product_code: product_code,
        store_id_one,
        package_code_one,
        package_one_restock,
        store_id_two,
        package_two_restock,
        package_code_two,
      }).unwrap();
      if (res.status == "failed") {
        toast.error(error.message);
      } else {
        toast.success("Created succefully");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  console.log({
    product_code: product_code,
    store_id_one,
    package_code_one,
    package_one_restock,
    store_id_two,
    package_two_restock,
    package_code_two,
  });

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
              placeholder="Product Name"
              value={product_code}
              onChange={handleProductName}
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
              value={store_item_id}
              onChange={handlePackageOne}
            >
              <option value={""}> Select packaging</option>
              {storeItem?.data.map((item, index) => (
                <option key={index} value={item.store_item_id}>
                  {`${item.item_name}`}
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
              value={package_one_restock}
              onChange={(e) =>
                set_package_one_restock(parseInt(e.target.value))
              }
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="product_name">
            <Form.Label>Package 2 Name</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Product Store"
              value={store_item_id_2}
              onChange={handPackageTwo}
            >
              <option value={0}> Select packaging</option>
              {storeItem?.data.map((item, index) => (
                <option key={index} value={item.store_item_id}>
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
              value={package_two_restock}
              onChange={(e) => set_package_two_restock(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col></Col>
        <Col sm={2}>
          <Button onClick={handleSubmit} variant={"outlined"}>
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CreatePackageSetup;
