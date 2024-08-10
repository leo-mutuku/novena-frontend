import React, { useEffect, useMemo, useState } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllAccountsQuery } from "../../../slices/finance/accountsApiSlice";
import { useGetAllAccountEntriesQuery } from "../../../slices/finance/accountEntriesApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import TimeDate from "../../../components/TimeDate";
import axios from "axios";
import DataTable from "../../../components/general/DataTable";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";
import moment from "moment";

const SalesPeopleCommission = () => {
  const timeDate = new TimeDate();
  const { data: accounts, isLoading } = useGetAllAccountEntriesQuery();
  const [account_entries, set_account_entries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  useEffect(() => {
    if (accounts?.data) {
      setTableData(accounts.data);
    }
  }, [accounts]);

  const handleDownloadPDF = async () => {
    setLoadingPdf(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/accounts/pdf`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-accounts-report.pdf");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/accounts/excel`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-accounts-report.xlsx");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading Excel:", error);
    } finally {
      setLoadingExcel(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Entry ID",
        accessor: "account_entry_id",
      },
      {
        Header: "AC No.",
        accessor: "account_number",
      },
      {
        Header: "SRC. Doc. Id",
        accessor: "source_document_id",
      },
      {
        Header: "SRC. Doc. Name",
        accessor: "source_document_name",
      },
      {
        Header: "Adj Type",
        accessor: "adjustment_type",
      },
      {
        Header: "Value",
        accessor: "adjustment_value",
      },
      {
        Header: "Date-Time",
        accessor: "created_at",
        Cell: ({ value }) => (
          <span>{`${moment(value).format("YYYY-MM-DD")} : ${moment(
            value
          ).format("HH:mm")}`}</span>
        ),
      },
      {
        Header: "Created By",
        accessor: "created_by",
      },
    ],
    []
  );

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div>
        <p>*** All Sales Commission ***</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ marginLeft: "10px" }}>
            <button onClick={handleDownloadPDF} disabled={loadingPdf}>
              {loadingPdf ? <Loader /> : <FaFilePdf />}
            </button>
          </div>
          <div style={{ marginLeft: "10px" }}>
            <button onClick={handleDownloadExcel} disabled={loadingExcel}>
              {loadingExcel ? <Loader /> : <FaFileExcel />}
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};
export default SalesPeopleCommission;
