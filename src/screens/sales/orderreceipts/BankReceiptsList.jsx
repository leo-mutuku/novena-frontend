import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllSalesBankReceptsQuery } from "../../../slices/finance/bankAccountsApiSlice";
import { useReverseBankReceiptMutation } from "../../../slices/finance/bankAccountsApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

import TimeDate from "../../../components/TimeDate";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";
import axios from "axios";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";
import { GrRevert } from "react-icons/gr";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

const BankReceipts = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const su = 9999;
  let isAdmin = userInfo.roles.includes(su) ? true : false;
  const { data: orders, isLoading } = useGetAllSalesBankReceptsQuery();
  const [reverseBankReceipt] = useReverseBankReceiptMutation();

  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  let timeDate = new TimeDate();
  const [tableData, setTableData] = useState([]);
  const [mode, set_mode] = useState("none");
  const [mode_delete, set_mode_delete] = useState("none");
  const [store_purchase_id, set_store_purchase_id] = useState("");
  const handleAdd = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode(style);
  };

  useEffect(() => {
    if (orders?.data) {
      setTableData(orders.data);
    }
  }, [orders]);

  const handleDelete = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode_delete(style);
  };

  const navigate = useNavigate();
  useEffect(() => {}, [orders]);

  const handleDownloadPDF = async () => {
    setLoadingPdf(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/sales/orders/posted/pdf`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-salesorder-posted-report.pdf");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleReverse = async (entry_id) => {
    try {
      const res = await reverseBankReceipt({
        id: entry_id,
        create_by: userInfo?.first_name,
      }).unwrap();
      if (res.status === "success") {
        toast.success("Receipt reversed successfully");
      } else {
        toast.error("Failed to reverse receipt");
      }
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/sales/orders/posted/excel`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-salesorder-posted-report.xlsx");
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
        Header: "Date",
        accessor: "entry_date",
        Cell: ({ value }) => <span>{moment(value).format("YYYY-MM-DD")}</span>,
      },
      { Header: "Rpt No", accessor: "entry_id" },
      {
        Header: "Bank",
        accessor: "bank_name",
      },
      {
        Header: "Ref.No",
        accessor: "reference",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      { Header: "SP", accessor: "own" },
      { Header: "by", accessor: "create_by" },
      {
        Header: "Reverse",
        accessor: "reverse",
        Cell: ({ row }) => {
          const isReversed = row.original.reference.endsWith("-R"); // Check if the reference ends with '-R'

          return (
            <Button
              variant={isReversed ? "outline-danger" : "outline-primary"}
              onClick={() => handleReverse(row.original.entry_id)}
              disabled={isReversed || !isAdmin} // Disable button if reference ends with '-R'
            >
              <GrRevert />
            </Button>
          );
        },
      },
    ],
    []
  );

  // Function to determine status color...
  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "orange";
      case "In Transit":
        return "blue";
      case "Posted":
        return "green";
      default:
        return "inherit";
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div>
        <p>*** All Sales Bank Receipts ***</p>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};
export default BankReceipts;
