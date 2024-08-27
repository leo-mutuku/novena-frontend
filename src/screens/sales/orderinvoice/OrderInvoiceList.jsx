import React, { useEffect, useMemo, useState, useRef } from "react";
import Loader from "../../../components/Loader";
import { useGetAllDispatchedOrdersQuery } from "../../../slices/sales/salesOrderHeadersApiSlice";
import { Table, Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

import TimeDate from "../../../components/TimeDate";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";
import axios from "axios";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";

import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { RoundedCorner } from "@mui/icons-material";

// Sample component to be printed

const OrderInvoiceList = () => {
  const { data: OrderInvoices, isLoading } = useGetAllDispatchedOrdersQuery();
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  let timeDate = new TimeDate();
  const [mode, set_mode] = useState("none");
  const [mode_delete, set_mode_delete] = useState("none");
  const [store_purchase_id, set_store_purchase_id] = useState("");
  const handleAdd = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode(style);
  };
  const handleDelete = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode_delete(style);
  };

  useEffect(() => {
    if (OrderInvoices?.data) {
      setTableData(OrderInvoices.data);
    }
  }, [OrderInvoices]);

  const componentRef = useRef();

  const handlePrint = async () => {
    const input = componentRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("download.pdf");
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

  const navigate = useNavigate();

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
        Header: "Sale Date",
        accessor: "sales_order_date",
        Cell: ({ value }) => <span>{moment(value).format("YYYY-MM-DD")}</span>,
      },
      {
        Header: "Sales Type",
        accessor: "sale_order_type",
      },
      {
        Header: "Order No.",
        accessor: "sales_order_number",
      },
      {
        Header: "Total",
        accessor: "total",
      },
      {
        Header: "No. of Items",
        accessor: "pay_per_bale",
      },
      {
        Header: "Cust Name",
        accessor: "customer_name",
      },
      {
        Header: "Sales .P",
        accessor: "first_name",
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
          <span>
            {row.original.status === "Posted" ? (
              <Link
                to={`/sales/orderinvoice/orderinvoicepreview/${row.original.sales_order_number}`}
              >
                <IoMdEye />
              </Link>
            ) : (
              "--"
            )}
          </span>
        ),
      },
    ],
    [getStatusColor]
  );

  return (
    <>
      <div>
        <p>*** All Posted Sales Orders ***</p>

        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};
export default OrderInvoiceList;
