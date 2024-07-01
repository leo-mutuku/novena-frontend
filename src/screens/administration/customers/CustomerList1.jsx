import React, { useEffect, useMemo, useState } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllCustomersQuery } from "../../../slices/administration/customersApiSlice";
import { Table, Row, Col } from "react-bootstrap";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { useSelector } from "react-redux";
import { handlePrintA4 } from "../../../components/printFunction";
import { handlePrintA4Color } from "../../../components/printFunctionColor";
import DataTable from "../../../components/general/DataTable";
import axios from "axios";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";

const CustomerList = () => {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const { data: customerData, isLoading } = useGetAllCustomersQuery();
  const [tableData, setTableData] = useState([]);
  const [customer, set_customer] = useState({
    customer_outlet_name: "",
    customer_contact_person: "",
    customer_contact: "",
    customer_location: "",
  });
  const [user, set_user] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [customers, set_customers] = useState([]);

  const date = new Date();

  useEffect(() => {
    if (customerData?.data) {
      setTableData(customerData.data);
    }
  }, [customerData]);

  useEffect(() => {
    if (userInfo) {
      set_user(userInfo.first_name);
    }
    set_customers(customerData?.data);
  }, [customerData, userInfo]);

  const handleDownloadPDF = async () => {
    setLoadingPdf(true);
    try {
      await axios({
        url: `${baseUrlJasper}/all/customers/pdf`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      }).then((response) => {
        // Create a blob object from the binary data
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Create a link element to trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "all-customers-report.pdf");
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up
        window.URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingPdf(false);
    }
  };
  const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    try {
      await axios({
        url: `${baseUrlJasper}/all/customers/excel`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      }).then((response) => {
        // Create a blob object from the binary data
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Create a link element to trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "all-customers-report.xlsx");
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up
        window.URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.log(error.message);
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
        Header: "Customer Name",
        accessor: "customer_outlet_name",
      },
      {
        Header: "Contact Person",
        accessor: "customer_contact_person",
      },
      {
        Header: "Contact",
        accessor: "customer_contact",
      },
      {
        Header: "Location",
        accessor: "customer_location",
      },
      { Header: "Cus ID", accessor: "customer_id" },
      { Header: "Balance", accessor: "balance" },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link to={`#`}>
            <CiEdit />
          </Link>
        ),
      },
      {
        Header: "View",
        accessor: "view",
        Cell: ({ row }) => (
          <Link to="#">
            <IoMdEye />
          </Link>
        ),
      },
      {
        Header: "Del",
        accessor: "del",
        Cell: ({ row }) => (
          <Link to="#">
            <MdDelete />
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
        <p>*** All Customers ***</p>
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
export default CustomerList;
