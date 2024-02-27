import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {
  useDeleteDriverRouteAssignMutation,
  useGetAllDriversRouteAssignQuery,
} from "../../../slices/fleet/driverRouteAssignApiSlice";
import DataTable from "../../../components/general/DataTable";

const DriverRouteAssignDT = () => {
  const { data: driversRoutesAssign, isLoading } =
    useGetAllDriversRouteAssignQuery();

  const [tableData, setTableData] = useState([]);

  const [deleteDriverRouteAssign, { isLoading: isDeleting }] =
    useDeleteDriverRouteAssignMutation();

  useEffect(() => {
    if (driversRoutesAssign?.data) {
      setTableData(driversRoutesAssign.data);
    }
  }, [driversRoutesAssign]);

  // Check if data is still loading
  if (isDeleting) {
    return <Loader />;
  }

  const handleDelete = async (assignment_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this driver route assignment?"
    );
    if (confirmDelete) {
      deleteDriverRouteAssign(assignment_id)
        .unwrap()
        .then((response) => {
          if (response.status === "failed") {
            toast.error(response.message);
          } else {
            toast.success(response.message);
          }
        })
        .catch((error) => {
          // Handle error during deletion
          toast.error("Error deleting driver" + error.message);
          console.error("Error deleting driver", error);
        });
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "assignment_id" },
      { Header: "Staff Number", accessor: "staff_number"},
      {
        Header: "License Number",
        accessor: "license_number"
      },
      {
        Header: "First Name",
        accessor: "first_name"
      },
      {
        Header: "Last Name",
        accessor: "last_name"
      },
      {
        Header: "Contact Number",
        accessor: "phone_number"
      },
      { Header: "Route Name", accessor: "name"},
      {
        Header: "Start Location",
        accessor: "start_location"
      },
      {
        Header: "End Location",
        accessor: "end_location"
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link to={`/fleet/routes/assignments/update/${row.original.assignment_id}`}>
            <button className="btn btn-edit">Edit</button>
          </Link>
        ),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row }) => (
          <button onClick={() => handleDelete(row.original.assignment_id)}>
            Delete
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
};

export default DriverRouteAssignDT;
