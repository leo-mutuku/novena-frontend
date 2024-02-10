import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  useDeleteDriverRouteAssignMutation,
  useGetAllDriversRouteAssignQuery,
} from "../../../slices/fleet/driverRouteAssignApiSlice";

const DriverRouteAssignDataTable = () => {
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

  // Map the drivers data to rows
  const rows = tableData.map((driverRouteAssign) => ({
    assignment_id: driverRouteAssign.assignment_id,
    staff_number: driverRouteAssign.staff_number,
    license_number: driverRouteAssign.license_number,
    first_name: driverRouteAssign.first_name,
    last_name: driverRouteAssign.last_name,
    phone_number: driverRouteAssign.phone_number,
    name: driverRouteAssign.name,
    start_location: driverRouteAssign.start_location,
    end_location: driverRouteAssign.end_location,
    edit: (
      <Link
        to={`/fleet/routes/assignments/update/${driverRouteAssign.assignment_id}`}
      >
        <button className="btn btn-edit">Edit</button>
      </Link>
    ),
    delete: (
      <button
        className="btn btn-edit"
        onClick={() => handleDelete(driverRouteAssign.assignment_id)}
      >
        Delete
      </button>
    ),
  }));

  // Define the columns
  const columns = [
    { label: "ID", field: "assignment_id", sort: "asc", width: 50 },
    { label: "Staff Number", field: "staff_number", sort: "asc", width: 150 },
    {
      label: "License Number",
      field: "license_number",
      sort: "asc",
      width: 150,
    },
    {
      label: "First Name",
      field: "first_name",
      sort: "asc",
      width: 100,
    },
    {
      label: "Last Name",
      field: "last_name",
      sort: "asc",
      width: 100,
    },
    {
      label: "Contact Number",
      field: "phone_number",
      sort: "asc",
      width: 120,
    },
    { label: "Route Name", field: "name", sort: "asc", width: 200 },
    {
      label: "Start Location",
      field: "start_location",
      sort: "asc",
      width: 200,
    },
    {
      label: "End Location",
      field: "end_location",
      sort: "asc",
      width: 200,
    },
    { label: "Edit", field: "edit", width: 50 },
    { label: "Delete", field: "delete", width: 50 },
  ];

  // Create the data object
  const data = { columns, rows };

  return <MDBDataTable striped bordered small data={data} />;
};

export default DriverRouteAssignDataTable;
