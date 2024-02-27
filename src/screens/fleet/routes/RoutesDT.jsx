import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {
  useDeleteRouteMutation,
  useGetAllRoutesQuery,
} from "../../../slices/fleet/routesApiSlice";
import DataTable from "../../../components/general/DataTable";

const RoutesDT = () => {
  const { data: routes, isLoading } = useGetAllRoutesQuery();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  console.log(JSON.stringify(routes));
  const [deleteRoute, { isLoading: isDeleting }] = useDeleteRouteMutation();

  useEffect(() => {
    if (routes?.data) {
      setTableData(routes.data);
    }
  }, [routes]);

  const handleDelete = async (routeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?"
    );
    if (confirmDelete) {
      deleteRoute(routeId)
        .unwrap()
        .then((response) => {
          navigate("../allroutes");
          console.log("Route deleted successfully", response);
          toast.success("Route deleted successfully");
        })
        .catch((error) => {
          // Handle error during deletion
          toast.error("Error deleting route" + error.message);
          console.error("Error deleting route", error);
        });
    }
  };

  // Define columns unconditionally
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "route_id" },
      { Header: "Name", accessor: "name" },
      {
        Header: "Start Location",
        accessor: "start_location",
      },
      {
        Header: "Destination",
        accessor: "end_location",
      },
      { Header: "Distance (KM)", accessor: "distance_km" },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link to={`/fleet/routes/update/${row.original.route_id}`}>
            <button className="btn btn-edit">Edit</button>
          </Link>
        ),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row }) => (
          <button onClick={() => handleDelete(row.original.route_id)}>
            Delete
          </button>
        ),
      },
    ],
    [] // No dependencies
  );

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

export default RoutesDT;
