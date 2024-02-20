import React from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllStoreRegisterQuery } from "../../../slices/store/storeRegisterApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

const StoreRegisterList = () => {
  const { data, isLoading } = useGetAllStoreRegisterQuery();

  return (
    <>
      {" "}
      <p>*** All Stores ***</p>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Store name</th>
            <th>Store code</th>
            <th>Store location</th>
            <th>Edit</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>
                <Loader />
              </td>
            </tr>
          ) : (
            data?.data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.store_name}</td>
                <td>{item.store_code}</td>
                <td>{item.store_location}</td>

                <td>{item.updated_at}</td>
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
export default StoreRegisterList;
