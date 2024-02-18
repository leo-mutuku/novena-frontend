import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

import {
  useDeleteMaintenanceMutation,
  useGetAllMaintenancesQuery,
} from "../../../slices/fleet/maintenanceApiSlice";

const MaintenanceDataTable = () => {
  const { data: maintenance, isLoading } = useGetAllMaintenancesQuery();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const [deleteMaintenance, { isLoading: isDeleting }] =
    useDeleteMaintenanceMutation();

  useEffect(() => {
    if (maintenance?.data) {
      setTableData(maintenance.data);
    }
  }, [maintenance]);

  // Check if data is still loading
  if (isDeleting) {
    return <Loader />;
  }

  // Check if data is still loading
  if (isLoading) {
    return <Loader />;
  }

  const handleDelete = async (maintenanceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this maintenance?"
    );
    if (confirmDelete) {
      deleteMaintenance(maintenanceId)
        .unwrap()
        .then((response) => {
          if (response.status === "failed") {
            toast.error(response.message);
          } else {
            toast.success(response.message);
            navigate("../allmaintenance");
          }
        })
        .catch((error) => {
          // Handle error during deletion
          toast.error("Error deleting maintenance" + error.message);
          console.error("Error deleting maintenance", error);
        });
    }
  };

  // Map the maintenance data to rows
  const rows = tableData.map((maintenance) => ({
    maintenance_id: maintenance.maintenance_id,
    registration_number: maintenance.registration_number,
    vehicle_id: maintenance.vehicle_id,
    maintenance_type: maintenance.maintenance_type,
    description: maintenance.description,
    cost: maintenance.cost,
    maintenance_date: moment(maintenance.maintenance_date).format("YYYY-MM-DD"),
    edit: (
      <Link to={`/fleet/maintanance/update/${maintenance.maintenance_id}`}>
        <button className="btn btn-edit">Edit</button>
      </Link>
    ),
    delete: (
      <button
        className="btn btn-edit"
        onClick={() => handleDelete(maintenance.maintenance_id)}
      >
        Delete
      </button>
    ),
  }));

  // Define the columns
  const columns = [
    { label: "ID", field: "maintenance_id", sort: "asc", width: 50 },
    {
      label: "Registration Number",
      field: "registration_number",
      sort: "asc",
      width: 150,
    },
    {
      label: "Maintenance Type",
      field: "maintenance_type",
      sort: "asc",
      width: 100,
    },
    {
      label: "Description",
      field: "description",
      sort: "asc",
      width: 120,
    },
    {
      label: "Maintenance Cost",
      field: "cost",
      sort: "asc",
      width: 120,
    },
    {
      label: "Maintenance Date",
      field: "maintenance_date",
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

export default MaintenanceDataTable;
