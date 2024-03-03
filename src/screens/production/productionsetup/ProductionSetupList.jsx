import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Button } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

const ProductionSetupList = () => {
  const handleAddSetting = (e) => {};
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Product name</td>
              <td>Store name</td>
              <td>
                <Link to={"#"}>
                  <FaEdit />
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default ProductionSetupList;
