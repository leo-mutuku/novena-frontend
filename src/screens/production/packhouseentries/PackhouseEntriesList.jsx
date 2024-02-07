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
import TimeDate from "../../../components/TimeDate";

const PackhouseEntriesList = () => {
  const timeDate = new TimeDate();
  const { data, isLoading } = useGetAllAccountEntriesQuery();
  const [account_entries, set_account_entries] = useState([]);

  return (
    <>
      <p>*** Pack House Entries ***</p>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Entry ID</th>
            <th>AC No.</th>
            <th>SRC. Doc. Id</th>
            <th>SRC. Doc. Name</th>
            <th>Adj Type</th>
            <th>Value</th>
            <th>Date-Time</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((item, index) => (
            <>
              <tr>
                <td>{index + 1}</td>
                <td>{item.account_entry_id}</td>
                <td>{item.account_number}</td>
                <td>{item.source_document_id}</td>
                <td>{item.source_document_name}</td>
                <td>{item.adjustment_type}</td>
                <td>{item.adjustment_value}</td>
                <td>
                  {timeDate.date(item.created_at)}:
                  {timeDate.time(item.created_at)}
                </td>
                <td>{item.created_by}</td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default PackhouseEntriesList;
