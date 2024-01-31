import React from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllAccountsQuery } from "../../../slices/finance/accountsApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

const AccountsList = () => {
  const { data, isLoading } = useGetAllAccountsQuery();

  return (
    <>
      <p>*** All Accounts ***</p>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Account Name</th>
            <th>Account Number</th>
            <th>Created At</th>
            <th>Account_balance</th>
            <th>Gl Number</th>
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
                <td>{item.account_name}</td>
                <td>{item.account_number}</td>
                <td>{item.created_at}</td>
                <td>{item.account_balance}</td>
                <td>{item.gl_number}</td>
                {/* <td>{item.updated_at}</td> */}
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
export default AccountsList;
