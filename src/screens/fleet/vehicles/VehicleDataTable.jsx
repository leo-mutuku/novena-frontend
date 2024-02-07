import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteVehicleMutation, useGetAllVehiclesQuery } from "../../../slices/fleet/vehicleApiSlice";

const VehicleDataTable = () => {
  const { data: vehicles, isLoading } = useGetAllVehiclesQuery();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
 
  const [deleteVehicle, { isLoading: isDeleting }] = useDeleteVehicleMutation();

  useEffect(() => {
    if (vehicles?.data) {
      setTableData(vehicles.data);
    }
  }, [vehicles]);

  // Check if data is still loading
  if (isDeleting) {
    return <Loader />;
  }

  const handleDelete = async (vehicleId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?"
    );
    if (confirmDelete) {
      deleteVehicle(vehicleId)
        .unwrap()
        .then((response) => {
          navigate("../allvehicles");
          console.log("Vehicle deleted successfully", response);
          toast.success("Vehicle deleted successfully");
        })
        .catch((error) => {
          // Handle error during deletion
          toast.error("Error deleting vehicle" + error.message);
          console.error("Error deleting vehicle", error);
        });
    }
  };

  // Map the routes data to rows
  const rows = tableData.map((vehicle) => ({
    vehicle_id: vehicle.vehicle_id,
    registration_number: vehicle.registration_number,
    model: vehicle.model,
    year: vehicle.year,
    edit: (
      <Link to={`/fleet/vehicles/update/${vehicle.vehicle_id}`}>
        <button className="btn btn-edit">Edit</button>
      </Link>
    ),
    delete: (
      <button
        className="btn btn-edit"
        onClick={() => handleDelete(vehicle.vehicle_id)}
      >
        Delete
      </button>
    ),
  }));

  // Define the columns
  const columns = [
    { label: "ID", field: "vehicle_id", sort: "asc", width: 50 },
    { label: "Registration Number", field: "registration_number", sort: "asc", width: 150 },
    {
      label: "Vehicle Model",
      field: "model",
      sort: "asc",
      width: 100,
    },
    {
      label: "Year of Registration",
      field: "year",
      sort: "asc",
      width: 120,
    },
    { label: "Edit", field: "edit", width: 50 },
    { label: "Delete", field: "delete", width: 50 },
  ];

  // Create the data object
  const data = { columns, rows };

  return <MDBDataTable striped bordered small data={data} />;
};

export default VehicleDataTable;
