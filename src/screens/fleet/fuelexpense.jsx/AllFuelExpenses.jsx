import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetVendorsQuery } from "../../../slices/fleet/vendorApiSlice";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import DataTable from "../../../components/general/DataTable";

const AllFuelExpenses = () => {
  const { data: vendors, isLoading, isError } = useGetVendorsQuery(); // Added isError
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
        Header: "Vendor #",
        accessor: "vendor_number",
      },
      {
        Header: "Vendor Name",
        accessor: "vendor_name",
      },
      {
        Header: "Email",
        accessor: "vendor_email",
      },
      {
        Header: "Contact",
        accessor: "phone_number",
      },
      {
        Header: "Location",
        accessor: "vendor_location",
      },
      {
        Header: "Balance",
        accessor: "balance",
        Cell: ({ row }) => <Link to={"#"}>{row.original.balance}</Link>,
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <Link to={`/purchase/suppliers/update/${row.original.vendor_id}`}>
            <CiEdit />
          </Link>
        ),
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
        <p>*** All vendors ***</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};

export default AllFuelExpenses;
