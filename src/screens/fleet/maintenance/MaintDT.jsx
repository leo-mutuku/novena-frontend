import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {
  useDeleteMaintenanceMutation,
  useGetAllMaintenancesQuery,
} from "../../../slices/fleet/maintenanceApiSlice";
import DataTable from "../../../components/general/DataTable";



const MaintDT = () => {
  const { data: maintenance, isLoading } = useGetAllMaintenancesQuery();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { Header: "ID", accessor: "maintenance_id" },
    {
      Header: "Registration Number",
      accessor: "registration_number",
    },
    {
      Header: "Maintenance Type",
      accessor: "maintenance_type",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Maintenance Cost",
      accessor: "cost",
    },
    {
      Header: "Maintenance Date",
      accessor: "maintenance_date",
    },
    {
      Header: "Edit",
      accessor: "edit",
      Cell: ({ row }) => (
        <Link to={`/fleet/maintanance/update/${row.original.maintenance_id}`}>
          <button className="btn btn-edit">Edit</button>
        </Link>
      ),
    },
    {
      Header: "Delete",
      accessor: "delete",
      Cell: ({ row }) => (
        <button onClick={() => handleDelete(row.original.maintenance_id)}>
          Delete
        </button>
      ),
    },
  ];
  
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

  const [deleteMaintenance, { isLoading: isDeleting }] =
    useDeleteMaintenanceMutation();

  useEffect(() => {
    if (maintenance?.data) {
      setTableData(maintenance.data);
    }
  }, [maintenance]);

  // Check if data is still loading
  if (isDeleting || isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
};

export default MaintDT;
