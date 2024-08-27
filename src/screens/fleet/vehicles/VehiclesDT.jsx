import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {
  useDeleteVehicleMutation,
  useGetAllVehiclesQuery,
} from "../../../slices/fleet/vehicleApiSlice";
import DataTable from "../../../components/general/DataTable";

const VehiclesDT = () => {
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
          if (response.status === "failed") {
            toast.error(response.message);
          } else {
            toast.success(response.message);
            navigate("../allvehicles");
          }
        })
        .catch((error) => {
          // Handle error during deletion
          toast.error("Error deleting vehicle" + error.message);
          console.error("Error deleting vehicle", error);
        });
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "vehicle_id" },
      {
        Header: "Registration Number",
        accessor: "registration_number",
      },
      {
        Header: "Vehicle Model",
        accessor: "model",
      },
      {
        Header: "Year of Registration",
        accessor: "year",
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link to={`/fleet/vehicles/update/${row.original.vehicle_id}`}>
            <button className="btn btn-edit">Edit</button>
          </Link>
        ),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row }) => (
          <button onClick={() => handleDelete(row.original.vehicle_id)}>
            Delete
          </button>
        ),
      },
    ],
    [handleDelete]
  );

  return (
    <div>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
};

export default VehiclesDT;
