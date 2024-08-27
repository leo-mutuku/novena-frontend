import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useGetPackagingSetupByIdQuery,
  useUpdatePackingSetupMutation,
} from "../../../slices/productionsetup/packageSettingApiSlice";
const UpdatePackagingSetup = () => {
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const { data: getPackagingById, error } = useGetPackagingSetupByIdQuery(id);
  const [UpdatePackang, { isLoading, error: errorUpdate }] =
    useUpdatePackingSetupMutation();

  const [product_name, set_product_name] = useState("");
  const [product_code, set_product_code] = useState("");
  const [store_id_one, set_store_id_one] = useState("");
  const [store_name_one, set_store_name_one] = useState("");
  const [package_code_one, set_package_code_one] = useState("");
  const [package_name_one, set_package_name_one] = useState("");
  const [package_one_restock, set_package_one_restock] = useState(0);
  const [store_id_two, set_store_id_two] = useState(0);
  const [store_name_two, set_store_name_two] = useState("");
  const [package_code_two, set_package_code_two] = useState(0);
  const [package_name_two, set_package_name_two] = useState("");
  const [package_two_restock, set_package_two_restock] = useState(0);

  useEffect(() => {
    if (id && errorUpdate) {
      toast.error(`Error occured `);
    }
    set_product_name(getPackagingById?.data.product_name);
    set_product_code(getPackagingById?.data.product_code);
    set_store_id_one(getPackagingById?.data.store_id_one);
    set_package_code_one(getPackagingById?.data.package_code_one);
    set_store_name_one(getPackagingById?.data.store_name_one);
    set_package_name_one(getPackagingById?.data.package_name_one);
    set_package_one_restock(getPackagingById?.data.package_one_restock);
    set_store_name_two(getPackagingById?.data.store_name_two);
    set_store_id_two(getPackagingById?.data.store_id_two);
    set_package_code_two(getPackagingById?.data.package_code_two);
    set_package_name_two(getPackagingById?.data.package_name_two);
    set_package_two_restock(getPackagingById?.data.package_two_restock);
  }, [id, getPackagingById]);

  return (
    <>
      <Row>
        <Col>** Create Product setup **</Col>

        <Col sm={1}>
          <Link to={"../packagesetuplist"}>
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
              onChange={""}
            >
              <option value={product_code}>{product_name}</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="packaging_one">
            <Form.Label>Packaging 1</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Packaging_one"
              value={store_id_one}
              onChange={""}
            >
              <option
                value={store_id_one}
              >{`${package_name_one} -- ${store_name_one} `}</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="Packaging_One_Restock_Level">
            <Form.Label>Packaging 1 Restock Level</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Packaging 1 Restock Level"
              value={package_one_restock}
              onChange={(e) => set_package_one_restock(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="packaging_2">
            <Form.Label>Packaging 2</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Packaging 2"
              value={store_id_two}
              onChange={""}
            >
              <option
                value={store_id_two}
              >{`${package_name_two}  -- ${store_name_two}`}</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="packaging_two">
            <Form.Label>Packagin 2 Restock level</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Packagin 2 Restock level"
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
          {" "}
          <Button variant="outlined">Submit</Button>
        </Col>
      </Row>
    </>
  );
};

export default UpdatePackagingSetup;
