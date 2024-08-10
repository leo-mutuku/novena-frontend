import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllPostedStoredPurchasesQuery } from "../../../slices/purchase/storePurchaseHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import PostedPurchaseModal from "./lines/PostedPurchaseModal";
import TimeDate from "../../../components/TimeDate";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";
import axios from "axios";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";

const AllPostedStorePurchases = () => {
  const timeDate = new TimeDate();
  const handleAdd = (e) => {};
  const { data: posted_purchase_orders, isLoading } =
    useGetAllPostedStoredPurchasesQuery();
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  useEffect(() => {
    if (posted_purchase_orders?.data) {
      setTableData(posted_purchase_orders.data);
    }
  }, [posted_purchase_orders]);

  const [posted_mode, set_posted_mode] = useState("");

  const handleDownloadPDF = async (next) => {
    setLoadingPdf(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/store/purchases/posted/pdf`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-posted-store-purchases-report.pdf");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);

      toast.error(error.message);
      next(error);
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/store/purchases/posted/excel`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-posted-store-purchases-report.xlsx");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading Excel:", error);
      toast.error(error.message);
      next(error);
    } finally {
      setLoadingExcel(false);
    }
  };
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

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
        style: { position: "initial" },
      },
      {
        Header: "Purchase no",
        accessor: "store_purchase_number",
        style: { position: "initial" },
      },
      {
        Header: "Purchase date",
        accessor: "purchase_date",
        Cell: ({ value }) => (
          <span>{`${timeDate.date(value)} : ${timeDate.time(value)}`}</span>
        ),
        style: { position: "initial" },
      },
      {
        Header: "Prepared by",
        accessor: "prepared_by",
        style: { position: "initial" },
      },
      {
        Header: "Approved by",
        accessor: "approved_by",
        style: { position: "initial" },
      },
      {
        Header: "Total cost",
        accessor: "total_cost",
        style: { position: "initial" },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span style={{ color: getStatusColor(value) }}>{value}</span>
        ),
        style: { position: "initial" },
      },
      {
        Header: "View",
        accessor: "view",
        Cell: ({ row }) =>
          row.original.status === "Posted" ? (
            <Link to={`#`}>
              <IoMdEye />
            </Link>
          ) : (
            "--"
          ),
        style: { position: "initial" },
      },
    ],
    [posted_purchase_orders, timeDate]
  );
  return (
    <>
      <p>*** All Posted Store Purchases ***</p>
      {/* <div>
        <PostedPurchaseModal />
      </div> */}

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
    </>
  );
};
export default AllPostedStorePurchases;
