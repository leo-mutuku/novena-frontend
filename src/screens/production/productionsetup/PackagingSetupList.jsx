import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import {
  useGetAllPackagingSetupQuery,
  useDeletePackingSetupMutation,
} from "../../../slices/productionsetup/packageSettingApiSlice";

const PackagingSetupList = () => {
  const { data: packagingSetup } = useGetAllPackagingSetupQuery();
  const [deletePackagingSetup, { response }] = useDeletePackingSetupMutation();

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
              <th style={{ width: "15%" }}>Product name</th>
              <th>Package 1 Name</th>
              <th>Package 1 Store</th>
              <th>Package 1 Restock</th>
              <th>Package 2 Name</th>
              <th>Package 2 Store</th>
              <th>Package 2 Restock</th>

              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {packagingSetup?.data.map((item, index) => (
              <tr key={index}>
                <td>{item.product_name}</td>
                <td>{item.package_name_one}</td>
                <td>{item.store_name_one}</td>
                <td>{item.package_one_restock}</td>
                <td>{item.package_name_two}</td>
                <td>{item.store_name_two}</td>
                <td>{item.package_two_restock}</td>

                <td
                  onClick={() => deletePackagingSetup(item.packaging_setup_id)}
                >
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

export default PackagingSetupList;
