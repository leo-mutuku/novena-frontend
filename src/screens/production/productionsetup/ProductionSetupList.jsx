import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Button } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import {
  useGetAllproductSetupQuery,
  useDeleteProductSetupMutation,
} from "../../../slices/productionsetup/productSettingApliSlice";
import { toast } from "react-toastify";

const ProductionSetupList = () => {
  const { data: productSetup } = useGetAllproductSetupQuery();
  const [deleteProductSetup] = useDeleteProductSetupMutation();

  const handleDelete = async (id) => {
    try {
      const result = await deleteProductSetup(id);
      if (result.data.success) {
        toast.success("Product deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      toast.error(
        " Sorry it is not you it's is! Product not deleted ask for assistance"
      );
    }
  };

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

              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {productSetup?.data.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.item_name} - {item.item_code}
                </td>
                <td>
                  {item.store_name} - {item.product_code}
                </td>

                <td onClick={() => handleDelete(item.product_setup_id)}>
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
