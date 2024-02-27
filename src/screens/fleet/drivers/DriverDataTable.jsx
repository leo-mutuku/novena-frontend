import React, { useEffect, useMemo, useState } from "react";
import DataTable from "../../../components/general/DataTable";
import {
  useDeleteDriverMutation,
  useGetAllDriversQuery,
} from "../../../slices/fleet/driverApislice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";

const DriverDataTable = () => {
  const { data: drivers, isLoading } = useGetAllDriversQuery();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const [deleteDriver, { isLoading: isDeleting }] = useDeleteDriverMutation();

  useEffect(() => {
    if (drivers?.data) {
      setTableData(drivers.data);
    }
  }, [drivers]);

  const handleDelete = async (driverId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this driver?"
    );
    if (confirmDelete) {
      deleteDriver(driverId)
        .unwrap()
        .then((response) => {
          if (response.status === "failed") {
            toast.error(response.message);
          } else {
            toast.success(response.message);
            navigate("../alldrivers");
          }
        })
        .catch((error) => {
          // Handle error during deletion
          toast.error("Error deleting driver" + error.message);
          console.error("Error deleting driver", error);
        });
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Driver ID",
        accessor: "driver_id",
      },
      {
        Header: "Driver Name",
        accessor: "driver_name",
      },
      {
        Header: "Email",
        accessor: "staff_email",
      },
      {
        Header: "National ID",
        accessor: "national_id",
      },
      {
        Header: "Phone Number",
        accessor: "phone_number",
      },
      {
        Header: "License Number",
        accessor: "license_number",
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link to={`/fleet/drivers/update/${row.original.driver_id}`}>
            <button className="btn btn-edit">Edit</button>
          </Link>
        ),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row }) => (
          <button onClick={() => handleDelete(row.original.driver_id)}>
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
      <DataTable columns={columns} data={tableData} />
    </div>
  );
};

export default DriverDataTable;
