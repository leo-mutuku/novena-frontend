import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";

import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteRouteMutation,
  useGetAllRoutesQuery,
} from "../../../slices/fleet/routesApiSlice";

const RouteDataTable = () => {
  const { data: routes, isLoading } = useGetAllRoutesQuery();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const [deleteRoute, { isLoading: isDeleting }] = useDeleteRouteMutation();

  useEffect(() => {
    if (routes?.data) {
      setTableData(routes.data);
    }
  }, [routes]);

  // Check if data is still loading
  if (isLoading) {
    return <Loader />;
  }

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

  // Map the routes data to rows
  const rows = tableData.map((route) => ({
    route_id: route.route_id,
    name: route.name,
    start_location: route.start_location,
    end_location: route.end_location,
    distance_km: route.distance_km,
    edit: (
      <Link to={`/fleet/routes/update/${route.route_id}`}>
        <button className="btn btn-edit">Edit</button>
      </Link>
    ),
    delete: (
      <button
        className="btn btn-edit"
        onClick={() => handleDelete(route.route_id)}
      >
        Delete
      </button>
    ),
  }));

  // Define the columns
  const columns = [
    { label: "ID", field: "route_id", sort: "asc", width: 50 },
    { label: "Name", field: "name", sort: "asc", width: 150 },
    {
      label: "Start Location",
      field: "start_location",
      sort: "asc",
      width: 100,
    },
    {
      label: "Destination",
      field: "end_location",
      sort: "asc",
      width: 120,
    },
    { label: "Distance (KM)", field: "distance_km", sort: "asc", width: 200 },
    { label: "Edit", field: "edit", width: 50 },
    { label: "Delete", field: "delete", width: 50 },
  ];

  // Create the data object
  const data = { columns, rows };

  return <MDBDataTable striped bordered small data={data} />;
};

export default RouteDataTable;
