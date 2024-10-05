import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetRepairExpensesQuery } from "../../../slices/fleet/repairExpnesApiSlice";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import DataTable from "../../../components/general/DataTable";

const MaintenanceList = () => {
  const { data: vendors, isLoading, isError } = useGetRepairExpensesQuery(); // Added isError
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (Array.isArray(vendors?.data)) {
      setTableData(vendors.data);
    } else {
      setTableData([]); // Fallback to empty array if not an array
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
        Header: "Vendor ",
        accessor: "vendor_name",
      },
      {
        Header: "Credit",
        accessor: "credit",
      },
      {
        Header: "Debit",
        accessor: "debit",
      },
      // {
      //   Header: "Balance",
      //   accessor: "balance",
      // },
      {
        Header: "Date XP",
        accessor: "formatted_expense_date",
      },
      {
        Header: "Date Entry",
        accessor: "formatted_created_at",
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
        <p>*** All Fleet Maintance Expenses ***</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};

export default MaintenanceList;
