import React, { useEffect, useMemo, useState } from "react";
import DataTable from "../../../components/general/DataTable";
import {
  useDeleteDriverMutation,
  useGetAllDriversQuery,
} from "../../../slices/fleet/driverApislice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
const ItemListList = () => {
  const { data: items, isLoading } = useGetAllItemRegisterQuery();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const [deleteDriver, { isLoading: isDeleting }] = useDeleteDriverMutation();

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
  const handleDownloadPDF = async () => {
    await axios({
      url: "http://localhost:3000/api/v1/reports/all/drivers/pdf", // Endpoint on your Node.js server
      method: "GET",
      responseType: "blob", // Important: responseType 'blob' for binary data
    }).then((response) => {
      // Create a blob object from the binary data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-drivers-report.pdf");
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
    });
  };
  const handleDownloadExcel = async () => {
    await axios({
      url: "http://localhost:3000/api/v1/reports/all/drivers/excel", // Endpoint on your Node.js server
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
      link.setAttribute("download", "all-drivers-report.xlsx");
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
    });
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
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row }) => (
          <button onClick={() => handleDelete(row.original.item_register_id)}>
            Delete
          </button>
        ),
      },
    ],
    [handleDelete]
  );

  if (isLoading || isDeleting) {
    return <Loader />;
  }

  return (
    <div>
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
  );
};

export default ItemListList;
