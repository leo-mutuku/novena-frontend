import React, { useEffect, useMemo, useState } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import {
  useGetAllBankAccountsQuery,
  useDeleteBankAccountMutation,
} from "../../../slices/finance/bankAccountsApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import axios from "axios";
import DataTable from "../../../components/general/DataTable";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";
import moment from "moment";
import { toast } from "react-toastify";
const BankAccountsList = () => {
  const { data: banks, isLoading } = useGetAllBankAccountsQuery();
  const [deleteAccount] = useDeleteBankAccountMutation();
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  useEffect(() => {
    if (banks?.data) {
      setTableData(banks.data);
    }
  }, [banks]);

  const handleDeleteAccount = async (bank_id) => {
    try {
      const res = await deleteAccount({
        bank_id,
      }).unwrap();
      if (res.status == "success") {
        toast.success("Delete success");
      } else {
        toast.error("Sorry an error occurred while deleteing bank account");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
        Header: "Bank Name",
        accessor: "bank_name",
      },
      {
        Header: "Account Number",
        accessor: "bank_number",
      },
      {
        Header: "Gl Number",
        accessor: "gl_number",
      },
      {
        Header: "Bank Balance",
        accessor: "bank_balance",
        Cell: ({ row }) => <Link to={"#"}>{row.original.bank_balance}</Link>,
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link to={`/finance/bankaccounts/update/${row.original.bank_id}`}>
            <CiEdit />
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
        <p>*** All Banks ***</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};
export default BankAccountsList;
