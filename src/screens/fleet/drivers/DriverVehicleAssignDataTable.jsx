import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteDriverVehicleAssignMutation, useGetAllDriversVehicleAssignQuery } from "../../../slices/fleet/driverVehicleAssignApiSlice";

const DriverVehicleAssignDataTable = () => {
  const { data: driversVehiclesAssign, isLoading } = useGetAllDriversVehicleAssignQuery();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const [deleteDriverVehicleAssign, { isLoading: isDeleting }] = useDeleteDriverVehicleAssignMutation();

  useEffect(() => {
    if (driversVehiclesAssign?.data) {
      setTableData(driversVehiclesAssign.data);
    }
  }, [driversVehiclesAssign]);

  // Check if data is still loading
  if (isDeleting) {
    return <Loader />;
  }

  // const navigate = useNavigate();
  const handleEdit = (driver) => {
    // Implement your edit logic here using the driver data
    console.log("Editing driver:", driver);
    alert(JSON.stringify(driver));
  };

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

  // Map the drivers data to rows
  const rows = tableData.map((driverVehicleAssign) => ({
    assignment_id: driverVehicleAssign.assignment_id,
    staff_number: driverVehicleAssign.staff_number,
    license_number: driverVehicleAssign.license_number,
    first_name: driverVehicleAssign.first_name,
    last_name: driverVehicleAssign.last_name,
    phone_number: driverVehicleAssign.phone_number,
    model: driverVehicleAssign.model,
    registration_number: driverVehicleAssign.registration_number,
    edit: (
      <Link to={`/fleet/drivers/assignments/update/${driverVehicleAssign.assignment_id}`}>
        <button className="btn btn-edit">Edit</button>
      </Link>
    ),
    delete: (
      <button
        className="btn btn-edit"
        onClick={() => handleDelete(driverVehicleAssign.assignment_id)}
      >
        Delete
      </button>
    ),
  }));

  // Define the columns
  const columns = [
    { label: "ID", field: "assignment_id", sort: "asc", width: 50 },
    { label: "Staff Number", field: "staff_number", sort: "asc", width: 150 },
    { label: "License Number", field: "license_number", sort: "asc", width: 150 },
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
    { label: "Registration Number", field: "registration_number", sort: "asc", width: 200 },
    { label: "Vehicle Model", field: "model", sort: "asc", width: 200 },
    { label: "Edit", field: "edit", width: 50 },
    { label: "Delete", field: "delete", width: 50 },
  ];

  // Create the data object
  const data = { columns, rows };

  return <MDBDataTable striped bordered small data={data} />;
};

export default DriverVehicleAssignDataTable;
