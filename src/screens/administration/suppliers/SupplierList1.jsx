import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllSuppliersQuery } from "../../../slices/administration/suppliersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import DataTable from "../../../components/general/DataTable";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";

const SupplierList = () => {
  const { data: suppliers, isLoading } = useGetAllSuppliersQuery();
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  useEffect(() => {
    if (suppliers?.data) {
      setTableData(suppliers.data);
    }
  }, [suppliers]);

  const handleDownloadPDF = async () => {
    setLoadingPdf(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/suppliers/pdf`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-suppliers-report.pdf");
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
        url: `${baseUrlJasper}/all/suppliers/excel`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-suppliers-report.xlsx");
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
        Header: "Supplier #",
        accessor: "supplier_number",
      },
      {
        Header: "Supplier Name",
        accessor: "supplier_name",
      },
      {
        Header: "Email",
        accessor: "supplier_email",
      },
      {
        Header: "Contact",
        accessor: "supplier_phone_number",
      },
      {
        Header: "Location",
        accessor: "supplier_location",
      },
      {
        Header: "Item code",
        accessor: "item_supplied_code",
      },
      {
        Header: "Bank Acc. Name",
        accessor: "supplier_bank_account_name",
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link to={`/purchase/suppliers/update/${row.original.supplier_id}`}>
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
        <p>*** All Suppliers ***</p>
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
export default SupplierList;
