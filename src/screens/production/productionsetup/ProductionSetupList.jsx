import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Button } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { useGetAllproductSetupQuery } from "../../../slices/productionsetup/productSettingApliSlice";

const ProductionSetupList = () => {
  const { data: productSetup } = useGetAllproductSetupQuery();
  return (
    <>
      <Row>
        <Col>** Products setup table **</Col>
        <Col></Col>
        <Col></Col>
        <Col sm={1}>
          <Link to={"../createproductsetup"}>
            <IoAdd size={45} />
          </Link>
        </Col>
      </Row>
      <br></br>

      <Row>
        <Table aria-label="basic table">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Product name</th>
              <th>Product store</th>
              <th>Edit</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {productSetup?.data.map((item, index) => (
              <tr key={index}>
                <td>{item.item_name}</td>
                <td>{item.store_name}</td>
                <td>
                  <Link to={"#"}>
                    <FaEdit />
                  </Link>
                </td>
                <td>
                  <Link to={"#"}>
                    <MdDelete />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default ProductionSetupList;
