import React, { useEffect, useMemo, useState } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import {
  useGetAllPackHousePeopleQuery,
  useDeletePackhousePersonMutation,
} from "../../../slices/production/packHousePeopleApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import DataTable from "../../../components/general/DataTable";
import axios from "axios";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const PackhosePeopleList = () => {
  const { data: persons, isLoading } = useGetAllPackHousePeopleQuery();
  const [deletePackhousePerson] = useDeletePackhousePersonMutation();
  const [tableData, setTableData] = useState([]);

  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  useEffect(() => {
    if (persons?.data) {
      setTableData(persons.data);
    }
  }, [persons]);

  const handleDownloadPDF = async () => {
    setLoadingPdf(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/packhousepple/pdf`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-packhousepple-report.pdf");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      let result = await deletePackhousePerson(id).unwrap();
      if (result) {
        toast.success("Packhouse person deleted successfully");
        const newData = tableData.filter((item) => item.id !== id);
        setTableData(newData);
      }
    } catch (error) {
      toast.error("Error deleting packhouse person");
    }
  };
  const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/packhousepple/excel`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-packhousepple-report.xlsx");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading Excel:", error);
    } finally {
      setLoadingExcel(false);
    }
  };
  console.log();

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },

      {
        Header: "First name",
        accessor: "first_name",
      },
      {
        Header: "Last name",
        accessor: "last_name",
      },

      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Balance",
        accessor: "balance",
      },

      {
        Header: "Remove",
        accessor: "remove",
        Cell: ({ row }) => (
          <Link
            to={`#`}
            onClick={() => {
              handleDelete(`${row.original.packhouse_person_id}`);
            }}
          >
            {`${row.original.first_name}`}
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div>
        <p>*** All Pack House people ***</p>
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
export default PackhosePeopleList;
