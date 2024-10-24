import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetMileageQuery } from "../../../slices/fleet/mialageApiSlice";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import DataTable from "../../../components/general/DataTable";

const AllMialage = () => {
  const { data: vendors, isLoading, isError } = useGetMileageQuery(); // Added isError
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log(vendors); // Check the structure of vendors
    if (Array.isArray(vendors?.data)) {
      setTableData(vendors.data);
    } else {
      setTableData([]);
    }
  }, [vendors]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Vehicle",
        accessor: "registration_number",
      },
      {
        Header: "Driver ",
        accessor: "full_name",
      },
      {
        Header: "Start",
        accessor: "start_mialage",
      },
      {
        Header: "End",
        accessor: "end_mialage",
      },
      // {
      //   Header: "Balance",
      //   accessor: "balance",
      // },
      {
        Header: "Date",
        accessor: "created_at",
      },
      {
        Header: "By",
        accessor: "created_by",
      },
    ],
    []
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Error loading vendors.</p>;
  }

  return (
    <>
      <div>
        <p>*** All Fleet Fuel Expenses ***</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};

export default AllMialage;
