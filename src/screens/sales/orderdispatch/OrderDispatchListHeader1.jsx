import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllDispatchedOrdersQuery } from "../../../slices/sales/salesOrderHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

import TimeDate from "../../../components/TimeDate";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";
import axios from "axios";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";

const OrderDispatchListHeader = () => {
  const { data: orders, isLoading } = useGetAllDispatchedOrdersQuery();
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
        Header: "Customer",
        accessor: "customer_name",
      },
      {
        Header: "Sale Date",
        accessor: "sales_order_date",
        Cell: ({ value }) => <span>{moment(value).format("YYYY-MM-DD")}</span>,
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
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span style={{ color: getStatusColor(value) }}>{value}</span>
        ),
      },
      {
        Header: "PDF",
        accessor: "view",
        Cell: ({ row }) => (
          <span>
            {row.original.status === "Posted" ? (
              <Link
                to={`/sales/orderdispatch/deliverynote/${row.original.sales_order_number}`}
              >
                <Button variant="outline-primary">
                  {" "}
                  <IoMdEye />
                </Button>
              </Link>
            ) : (
              "--"
            )}
          </span>
        ),
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
        <p>*** All Dispatch Sales Orders ***</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};
export default OrderDispatchListHeader;
