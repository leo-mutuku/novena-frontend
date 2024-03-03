import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PackagingSetupList = () => {
  const navigate = useNavigate();

  return (
    <>
      <Row>
        <Col>** Packaging setup table **</Col>

        <Col sm={1}>
          <Link to={"../createpackagesetup"}>
            <IoAdd size={45} />
          </Link>
        </Col>
      </Row>

      <hr></hr>

      <Row>
        <Table aria-label="basic table">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Product name</th>
              <th>Package 1 Name</th>
              <th>Package 1 Store</th>
              <th>Package 2 Name</th>
              <th>Package 2 Store</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Frozen yoghurt</td>
              <td>159</td>
              <td>6</td>
              <td>24</td>
              <td>4</td>

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

export default PackagingSetupList;
