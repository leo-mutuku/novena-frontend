import React, { useState } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllAccountsQuery } from "../../../slices/finance/accountsApiSlice";
import { useGetAllAccountEntriesQuery } from "../../../slices/finance/accountEntriesApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

const AllAccountEntries = () => {
  const { data, isLoading } = useGetAllAccountEntriesQuery();
  const [account_entries, set_account_entries] = useState([]);

  if (data?.data) {
    let state = data?.data;
    const result = Object.keys(state).map((key) => ({
      [key]: state[key].account_entry_id,
    }));
    console.log(result);
  }

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
        <tbody></tbody>
      </Table>
    </>
  );
};
export default AllAccountEntries;
