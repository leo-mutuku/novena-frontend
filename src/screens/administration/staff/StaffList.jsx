import React from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

const StaffList = () => {
  const { data, isLoading } = useGetAllStaffQuery();

  return (
    <>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>EMAIL</th>
            <th>Bank</th>
            <th>Payroll_code</th>
            <th>Edit</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : (
            data?.data.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.phone_number}</td>
                <td>{user.staff_email}</td>
                <td>{user.bank_account_number}</td>
                <td>{user.payroll_category_code}</td>
                <td>
                  <Link to={`/administration/staff/update/${user.staff_id}`}>
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
export default StaffList;
