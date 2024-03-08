import React, { useEffect, useMemo, useState } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import DataTable from "../../../components/general/DataTable";
import { toast } from "react-toastify";
import axios from "axios";

const StaffList = () => {
  const { data: staffs, isLoading } = useGetAllStaffQuery();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (staffs?.data) {
      setTableData(staffs.data);
    }
  }, [staffs]);

  const handleDownloadPDF = async () => {
    try {
      await axios({
        url: "http://localhost:3000/api/v1/reports/all/staffs/pdf", // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      }).then((response) => {
        // Create a blob object from the binary data
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Create a link element to trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "all-staffs-report.pdf");
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up
        window.URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.log(error.message);
      // toast.error(error.message);
    }
  };
  const handleDownloadExcel = async () => {
    try {
      await axios({
        url: "http://localhost:3000/api/v1/reports/all/staffs/excel", // Endpoint on your Node.js server
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
        link.setAttribute("download", "all-staffs-report.xlsx");
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up
        window.URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.log(error.message);
      // toast.error(error.message);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Contact",
        accessor: "phone_number",
      },
      {
        Header: "Email",
        accessor: "staff_email",
      },
      {
        Header: "Bank Acc #",
        accessor: "bank_account_number",
      },
      {
        Header: "Category",
        accessor: "category_name",
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link to={`/administration/staff/update/${row.original.staff_id}`}>
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
          <Link to={`/administration/staff/delete/${row.original.staff_id}`}>
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
        <p>*** All Staffs ***</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ marginLeft: "10px" }}>
            <button onClick={handleDownloadPDF}>
              <FaFilePdf />
            </button>
          </div>
          <div style={{ marginLeft: "10px" }}>
            <button onClick={handleDownloadExcel}>
              <FaFileExcel />
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};
export default StaffList;
