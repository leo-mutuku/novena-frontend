import React from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllCustomersQuery } from "../../../slices/administration/customersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

const CustomerList = () => {
  const { data, isLoading } = useGetAllCustomersQuery();
  console.log(data);

  return (
    <>
      <p>*** All Customer ****</p>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Location</th>
            <th>Edit</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : (
            data?.data.map((customer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{customer.customer_name}</td>
                <td>{customer.customer_email}</td>
                <td>{customer.phone_number}</td>
                <td>{customer.customer_location}</td>
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
export default CustomerList;
