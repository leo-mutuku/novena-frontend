import React from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllSuppliersQuery } from "../../../slices/administration/suppliersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const SupplierList = () => {
  const { data, isLoading } = useGetAllSuppliersQuery();

  return (
    <>
      <p>*** All Suppliers ***</p>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Edit</th>
            <th>View</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : (
            data?.data.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.supplier_name}</td>
                <td>{user.supplier_email}</td>
                <td>{user.supplier_phone_number}</td>
                <td>
                  <Link
                    to={`/administration/suppliers/update/${user.supplier_id}`}
                  >
                    <CiEdit />
                  </Link>
                </td>
                <td>
                  <Link to="#">
                    <IoMdEye />
                  </Link>
                </td>
                <td>
                  <Link to="#">
                    <MdDelete />
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
export default SupplierList;
