import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllStorePurchasesInTransitQuery } from "../../../slices/purchase/storePurchaseHeadersApiSlice";
import { useGetAllPurchaseLinesByHeaderIdQuery } from "../../../slices/purchase/storePurchaseLinesApiSlice";

import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import TimeDate from "../../../components/TimeDate";
import moment from "moment";
import axios from "axios";
import DataTable from "../../../components/general/DataTable";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";
// import EditPurchaseModal from "./lines/EditPurchaseModal";
const AllDailyPackhouseHeaderInTransit = () => {
  const [edit_mode, set_edit_mode] = useState("none");
  const [purchase_header_id, set_purchase_header_id] = useState("");
  const timeDate = new TimeDate();
  const { data: purchase_order_intransit, isLoading } =
    useGetAllStorePurchasesInTransitQuery();
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  useEffect(() => {
    if (purchase_order_intransit?.data) {
      setTableData(purchase_order_intransit.data);
    }
  }, [purchase_order_intransit]);

  const handleAdd = (e) => {};
  const handleEdit = (e, id, mode) => {
    set_edit_mode(mode);
    set_purchase_header_id(parseInt(id));
  };
  const handleDownloadPDF = async () => {
    setLoadingPdf(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/storepurchases/intransit/pdf`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-storepurchases-in-transit-report.pdf");
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
        url: `${baseUrlJasper}/all/storepurchases/intransit/excel`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        "all-storepurchases-in-transit-report.xlsx"
      );
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
        Header: "Purchase #",
        accessor: "store_purchase_number",
      },
      {
        Header: "Purchase Date",
        accessor: "purchase_date",
        Cell: ({ value }) => <span>{moment(value).format("YYYY-MM-DD")}</span>,
      },
      {
        Header: "Prepared By",
        accessor: "prepared_by",
      },
      {
        Header: "Approved By",
        accessor: "approved_by",
      },
      {
        Header: "Total Cost",
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
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <button
            onClick={(e) =>
              handleEdit(e, row.original.store_purchase_number, "block")
            }
            disabled={row.original.status !== "New"}
          >
            <CiEdit />
          </button>
        ),
      },
    ],
    [handleEdit, getStatusColor]
  );

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div>
        <p>*** All Pack House In Transit***</p>
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
export default AllDailyPackhouseHeaderInTransit;
