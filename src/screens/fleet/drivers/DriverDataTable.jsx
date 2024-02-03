import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import {
  useDeleteDriverMutation,
  useGetAllDriversQuery,
} from "../../../slices/fleet/driverApislice";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

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

  // Check if data is still loading
  if (isLoading) {
    return <Loader />;
  }

  // const navigate = useNavigate();

  const handleEdit = (driver) => {
    // Implement your edit logic here using the driver data
    console.log("Editing driver:", driver);
    alert(JSON.stringify(driver));
  };

  const handleDelete = async (driverId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this driver?"
    );
    if (confirmDelete) {
      deleteDriver(driverId)
        .unwrap()
        .then((response) => {
          navigate("../alldrivers");
          console.log("Driver deleted successfully", response);
          toast.success("Driver deleted successfully");
        })
        .catch((error) => {
          // Handle error during deletion
          toast.error("Error deleting driver" + error.message);
          console.error("Error deleting driver", error);
        });
    }
  };

  // Map the drivers data to rows
  const rows = tableData.map((driver) => ({
    driver_id: driver.driver_id,
    name: driver.name,
    license_number: driver.license_number,
    contact_number: driver.contact_number,
    email: driver.email,
    edit: (
      <Link to={`/fleet/drivers/update/${driver.driver_id}`}>
        <button className="btn btn-edit">Edit</button>
      </Link>
    ),
    delete: (
      <button
        className="btn btn-edit"
        onClick={() => handleDelete(driver.driver_id)}
      >
        Delete
      </button>
    ),
  }));

  // Define the columns
  const columns = [
    { label: "ID", field: "driver_id", sort: "asc", width: 50 },
    { label: "Name", field: "name", sort: "asc", width: 150 },
    {
      label: "License Number",
      field: "license_number",
      sort: "asc",
      width: 100,
    },
    {
      label: "Contact Number",
      field: "contact_number",
      sort: "asc",
      width: 120,
    },
    { label: "Email", field: "email", sort: "asc", width: 200 },
    { label: "Edit", field: "edit", width: 50 },
    { label: "Delete", field: "delete", width: 50 },
  ];

  // Create the data object
  const data = { columns, rows };

  return <MDBDataTable striped bordered small data={data} />;
};

export default DriverDataTable;
