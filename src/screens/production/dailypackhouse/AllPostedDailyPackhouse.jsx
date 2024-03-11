import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllPostedStoredPurchasesQuery } from "../../../slices/purchase/storePurchaseHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
// import PostedPurchaseModal from "./lines/PostedPurchaseModal";
import TimeDate from "../../../components/TimeDate";
import DataTable from "../../../components/general/DataTable";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";
import moment from "moment";
import axios from "axios";

const AllPostedDailyPackhouse = () => {
  const timeDate = new TimeDate();
  const [posted_mode, set_posted_mode] = useState("");
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

  const handleDownloadPDF = async () => {
    setLoadingPdf(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/storepurchases/posted/pdf`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-storepurchases-posted-report.pdf");
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
        url: `${baseUrlJasper}/all/storepurchases/posted/excel`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-storepurchases-posted-report.xlsx");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading Excel:", error);
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
      },
      {
        Header: "Purchase no",
        accessor: "store_purchase_number",
      },
      {
        Header: "Purchase date",
        accessor: "purchase_date",
        Cell: ({ value }) => (
          <span>{`${moment(value).format("YYYY-MM-DD")} : ${moment(
            value
          ).format("hh:mm A")}`}</span>
        ),
      },
      {
        Header: "Prepared by",
        accessor: "prepared_by",
      },
      {
        Header: "Approved by",
        accessor: "approved_by",
      },
      {
        Header: "Total cost",
        accessor: "total_cost",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span style={{ color: getStatusColor(value) }}>{value}</span>
        ),
      },
      {
        Header: "View",
        accessor: "view",
        Cell: ({ row }) => (
          <td>
            {row.original.status === "Posted" ? (
              <Link to={`#`}>
                <IoMdEye />
              </Link>
            ) : (
              "--"
            )}
          </td>
        ),
      },
    ],
    [getStatusColor]
  );
  return (
    <>
      <div>
        <p>*** All Posted Store Purchases***</p>
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
export default AllPostedDailyPackhouse;
