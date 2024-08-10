import React, { useEffect, useMemo, useState } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllStoreItemsQuery } from "../../../slices/store/storeItemsApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";
import axios from "axios";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";
import exportToCsv from "../../../components/csv/exportCSV";

const StoreItemsList = () => {
  const { data: items, isLoading } = useGetAllStoreItemsQuery();
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  useEffect(() => {
    if (items?.data) {
      setTableData(items.data);
    }
  }, [items]);

  const handleDownloadPDF = async (next) => {
    try {
    } catch (error) {
      toast.error(error.message);
      next(error);
    } finally {
    }
  };

  const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    try {
    } catch (error) {
      toast.error(error.message);
      next(error);
    } finally {
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },

      {
        Header: "Item Name",
        accessor: "item_name",
      },
      {
        Header: "Item Code",
        accessor: "item_code",
      },
      {
        Header: "Store Name",
        accessor: "store_name",
      },
      {
        Header: "Store Name",
        accessor: "store_code",
      },
      {
        Header: "Item Quantity",
        accessor: "item_quantity",
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <>
            {/* Uncomment this line if you want to include "Edit" button */}
            {/* add persmission check here */}
            <Link to={`/store/storeitems/update/${row.original.store_item_id}`}>
              <CiEdit />
            </Link>
          </>
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
    ],
    []
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <p>*** All Store Items ***</p>
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
export default StoreItemsList;
