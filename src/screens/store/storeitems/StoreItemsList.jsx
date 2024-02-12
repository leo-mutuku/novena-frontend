import React from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllStoreItemsQuery } from "../../../slices/store/storeItemsApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

const StoreItemsList = () => {
  const { data, isLoading } = useGetAllStoreItemsQuery();

  return (
    <>
      <p>Store items Register List</p>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Item Code</th>
            <th>Store Name</th>
            <th>Store code</th>
            <th>Item quantity</th>
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
                <td>{item.store_name}</td>
                <td>{item.store_code}</td>
                <td>{item.item_quantity}</td>
                <td>
                  <Link to={`/store/storeitems/update/${item.store_item_id}`}>
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
export default StoreItemsList;
