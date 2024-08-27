import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {
  useDeleteVehicleRunMutation,
  useGetAllVehicleRunsQuery,
} from "../../../slices/fleet/runsApiSlice";
import DataTable from "../../../components/general/DataTable";

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

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "journey_id" },
      {
        Header: "Vehicle Reg #",
        accessor: "registration_number",
      },
      {
        Header: "Route Name",
        accessor: "name",
      },
      {
        Header: "start Mileage",
        accessor: "start_mileage",
      },
      {
        Header: "Start Fuel Capacity",
        accessor: "start_fuel_capacity",
      },
      {
        Header: "End Mileage",
        accessor: "end_mileage",
      },
      {
        Header: "End Fuel Capacity",
        accessor: "end_fuel_capacity",
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link to={`/fleet/runs/update/${row.original.journey_id}`}>
            <button className="btn btn-edit">End Journey</button>
          </Link>
        ),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row }) => (
          <button onClick={() => handleDelete(row.original.journey_id)}>
            Delete
          </button>
        ),
      },
    ],
    [handleDelete]
  );

  // Check if data is still loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
};

export default VehicleRunsDT;
