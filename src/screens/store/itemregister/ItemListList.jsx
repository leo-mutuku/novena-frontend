import React from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

const ItemListList = () => {
  const { data, isLoading } = useGetAllItemRegisterQuery();

  return (
    <>
      <p>*** Item Register List ***</p>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Item name</th>
            <th>Item code</th>
            <th>Account_number</th>
            <th>Current Price</th>
            <th>Item Units </th>
            <th>item_unit_value</th>
            <th>Edit</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : (
            data?.data.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.item_name}</td>
                <td>{item.item_code}</td>
                <td>{item.account_number}</td>
                <td>{item.current_price}</td>
                <td>{item.item_units}</td>
                <td>{item.item_units_value}</td>
                <td>
                  <Link to="#">
                    <CiEdit />
                  </Link>
                </td>
                <td>
                  <Link to="#">
                    <IoMdEye />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};
export default ItemListList;
