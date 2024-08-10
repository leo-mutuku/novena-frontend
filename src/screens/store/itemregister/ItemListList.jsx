import React, { useEffect, useMemo, useState } from "react";
import {
  useDeleteDriverMutation,
  useGetAllDriversQuery,
} from "../../../slices/fleet/driverApislice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";
import axios from "axios";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";

const ItemListList = () => {
  const { data: items, isLoading } = useGetAllItemRegisterQuery();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const [deleteDriver, { isLoading: isDeleting }] = useDeleteDriverMutation();
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  useEffect(() => {
    if (items?.data) {
      setTableData(items.data);
    }
  }, [items]);

  const handleDelete = async (itemId) => {
    // const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this driver?"
    // );
    // if (confirmDelete) {
    //   deleteDriver(itemId)
    //     .unwrap()
    //     .then((response) => {
    //       if (response.status === "failed") {
    //         toast.error(response.message);
    //       } else {
    //         toast.success(response.message);
    //         navigate("../allitems");
    //       }
    //     })
    //     .catch((error) => {
    //       // Handle error during deletion
    //       toast.error("Error deleting driver" + error.message);
    //       console.error("Error deleting driver", error);
    //     });
    // }
  };
  const handleDownloadPDF = async (next) => {
    setLoadingPdf(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/store/items/register/pdf`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-store-items-register-report.pdf");
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
        url: `${baseUrlJasper}/all/store/items/register/excel`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-store-items-register-report.xlsx");
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

  const columns = useMemo(
    () => [
      {
        Header: "Item Name",
        accessor: "item_name",
      },
      {
        Header: "Item Code",
        accessor: "item_code",
      },
      {
        Header: "Account Number",
        accessor: "account_number",
      },
      {
        Header: "Current Price",
        accessor: "current_price",
      },
      {
        Header: "Item Units",
        accessor: "item_units",
      },
      {
        Header: "Item Units Value",
        accessor: "item_units_value",
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link
            to={`/store/storeitemregister/update/${row.original.item_register_id}`}
          >
            <button className="btn btn-edit">Edit</button>
          </Link>
        ),
      },
    ],
    [handleDelete]
  );

  if (isLoading || isDeleting) {
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

export default ItemListList;
