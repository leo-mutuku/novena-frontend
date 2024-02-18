import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";

import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteVehicleRunMutation,
  useGetAllVehicleRunsQuery,
} from "../../../slices/fleet/runsApiSlice";

const VehicleRunsDT = () => {
  const { data: runs, isLoading } = useGetAllVehicleRunsQuery();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const [deleteVehicleRun, { isLoading: isDeleting }] =
    useDeleteVehicleRunMutation();

  useEffect(() => {
    if (runs?.data) {
      setTableData(runs.data);
    }
  }, [runs]);

  // Check if data is still loading
  if (isLoading) {
    return <Loader />;
  }

  // const navigate = useNavigate()

  const handleDelete = async (journeyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle run?"
    );
    if (confirmDelete) {
      deleteVehicleRun(journeyId)
        .unwrap()
        .then((response) => {
          if (response.status === "failed") {
            toast.error(response.message);
          } else {
            toast.success(response.message);
            navigate("../allruns");
          }
        })
        .catch((error) => {
          // Handle error during deletion
          toast.error("Error deleting vehicle run" + error.message);
          console.error("Error deleting vehicle run", error);
        });
    }
  };

  // Map the drivers data to rows
  const rows = tableData.map((run) => ({
    journey_id: run.journey_id,
    registration_number: run.registration_number,
    name: run.name,
    start_mileage: run.start_mileage,
    start_fuel_capacity: run.start_fuel_capacity,
    end_mileage: run.end_mileage,
    end_fuel_capacity: run.end_fuel_capacity,
    edit: (
      <Link to={`/fleet/runs/update/${run.journey_id}`}>
        <button className="btn btn-edit">End Journey</button>
      </Link>
    ),
    delete: (
      <button
        className="btn btn-edit"
        onClick={() => handleDelete(run.journey_id)}
      >
        Delete
      </button>
    ),
  }));

  // Define the columns
  const columns = [
    { label: "ID", field: "journey_id", sort: "asc", width: 50 },
    {
      label: "Vehicle Reg #",
      field: "registration_number",
      sort: "asc",
      width: 150,
    },
    {
      label: "Route Name",
      field: "name",
      sort: "asc",
      width: 100,
    },
    {
      label: "start Mileage",
      field: "start_mileage",
      sort: "asc",
      width: 120,
    },
    {
      label: "Start Fuel Capacity",
      field: "start_fuel_capacity",
      sort: "asc",
      width: 200,
    },
    {
      label: "End Mileage",
      field: "end_mileage",
      sort: "asc",
      width: 120,
    },
    {
      label: "End Fuel Capacity",
      field: "end_fuel_capacity",
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

export default VehicleRunsDT;
