import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllAccountsQuery } from "../../../slices/finance/accountsApiSlice";
import { Table, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import TimeDate from "../../../components/TimeDate";
import { IoMdEye } from "react-icons/io";
import PrintA4A5ExcelButton from "../../../components/PrintA4A5ExcelButton";
import axios from "axios";
import DataTable from "../../../components/general/DataTable";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";
import moment from "moment";

const StaffSetupList = () => {
  const timeDate = new TimeDate();
  const { data: accounts, isLoading } = useGetAllAccountsQuery();

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
        Header: "Account Name",
        accessor: "account_name",
      },
      {
        Header: "Account Number",
        accessor: "account_number",
      },
      {
        Header: "Created At",
        accessor: "created_at",
        Cell: ({ value }) => (
          <span>{`${moment(value).format("YYYY-MM-DD")} : ${moment(
            value
          ).format("HH:mm A")}`}</span>
        ),
      },
      {
        Header: "Account Balance",
        accessor: "account_balance",
      },
      {
        Header: "Gl Number",
        accessor: "gl_number",
      },

      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link to={`/finance/accounts/update/${row.original.account_id}`}>
            <CiEdit />
          </Link>
        ),
      },
      {
        Header: "View",
        accessor: "view",
        Cell: () => (
          <Link to="#">
            <IoMdEye />
          </Link>
        ),
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
        <p>*** Staff Setup List***</p>
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
export default StaffSetupList;
