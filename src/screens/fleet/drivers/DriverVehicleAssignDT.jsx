import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import DataTable from "../../../components/general/DataTable";
import {
  useGetAllDriversVehicleAssignQuery,
  useDeleteDriverVehicleAssignMutation,
} from "../../../slices/fleet/driverVehicleAssignApiSlice";

// Define columns outside the component
const columns = [
  { Header: "ID", accessor: "assignment_id" },
  { Header: "Staff Number", accessor: "staff_number" },
  { Header: "License Number", accessor: "license_number" },
  { Header: "First Name", accessor: "first_name" },
  { Header: "Last Name", accessor: "last_name" },
  { Header: "Contact Number", accessor: "phone_number" },
  { Header: "Registration Number", accessor: "registration_number" },
  { Header: "Vehicle Model", accessor: "model" },
  {
    Header: "Edit",
    accessor: "edit",
    Cell: ({ row }) => (
      <Link
        to={`/fleet/drivers/assignments/update/${row.original.assignment_id}`}
      >
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
];

const DriverVehicleAssignDT = () => {
  const { data: driversVehiclesAssign, isLoading } =
    useGetAllDriversVehicleAssignQuery();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const [deleteDriverVehicleAssign, { isLoading: isDeleting }] =
    useDeleteDriverVehicleAssignMutation();

  useEffect(() => {
    if (driversVehiclesAssign?.data) {
      setTableData(driversVehiclesAssign.data);
    }
  }, [driversVehiclesAssign]);

  const handleDelete = async (assignment_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this driver vehicle assignment?"
    );
    if (confirmDelete) {
      deleteDriverVehicleAssign(assignment_id)
        .unwrap()
        .then((response) => {
          console.log("Driver deleted successfully", response);
          toast.success(response.message);
        })
        .catch((error) => {
          // Handle error during deletion
          toast.error("Error deleting driver" + error.message);
          console.error("Error deleting driver", error);
        });
    }
  };

  // Check if data is still loading
  if (isLoading || isDeleting) {
    return <Loader />;
  }

  return (
    <div>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
};

export default DriverVehicleAssignDT;
