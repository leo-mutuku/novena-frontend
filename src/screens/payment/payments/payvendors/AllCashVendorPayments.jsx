import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../../components/Loader";
import { useGetVendorsEntriesQuery } from "../../../../slices/fleet/vendorApiSlice";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import DataTable from "../../../../components/general/DataTable";

const AllCashVendorPayments = () => {
  const { data: vendors, isLoading, isError } = useGetVendorsEntriesQuery(); // Added isError
  const [tableData, setTableData] = useState([]);

  useEffect(() => {

    if (Array.isArray(vendors?.data)) {
      setTableData(vendors.data);
    } else {
      setTableData([]);
    }
  }, [vendors]);

  console.log(tableData)

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Date",
        accessor: "created_at",
      },
      {
        Header: "Vendor ",
        accessor: "vendor_name",
      },
      {
        Header: "Desc",
        accessor: "description",
      },
      {
        Header: "Credit",
        accessor: "credit",
      },
      {
        Header: "Debit",
        accessor: "debit",
      },
      {
        Header: "Balance",
        accessor: "balance",
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
        <p>*** All Vendor Payment Entries ***</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};

export default AllCashVendorPayments;
