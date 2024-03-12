import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetAllPackTypeQuery } from "../../../slices/packhousesetup/packTypeSettingApiSlice";

const PacktypeSettingList = () => {
  const { data: packhousesetup } = useGetAllPackTypeQuery();
  return (
    <>
      <Row>
        <Col>** Pack type setup table **</Col>
        <Col></Col>
        <Col></Col>
        <Col sm={1}>
          <Link to={"../createpacktypesettings"}>
            <IoAdd size={45} />
          </Link>
        </Col>
      </Row>

      <Row>
        <Table aria-label="basic table">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Pack type</th>
              <th>Pay per Bale</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {packhousesetup?.data.map((item, index) => (
              <tr key={index}>
                <td>{item.pack_type_name}</td>
                <td>{item.pay_per_bale}</td>
                <td>
                  <Link to={"#"}>
                    <FaEdit />
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

export default PacktypeSettingList;
