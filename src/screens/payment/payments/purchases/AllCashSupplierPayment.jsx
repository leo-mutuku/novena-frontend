import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../../components/Loader";
import { useGetAllCashSupplierPaymentsQuery } from "../../../../slices/finance/cashAccountApiSlice";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import DataTable from "../../../../components/general/DataTable";

const AllCashSupplierPayment = () => {
  const {
    data: vendors,
    isLoading,
    isError,
  } = useGetAllCashSupplierPaymentsQuery();
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
        Header: "Name",
        accessor: "supplier_name",
      },
      {
        Header: "Credit ",
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
        Header: "Description",
        accessor: (row) =>
          row.description?.slice(0, 40) +
          (row.description?.length > 40 ? "..." : ""),
      },
      {
        Header: "Date",
        accessor: "formatted_entry_date",
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
        <p>*** All Supplier payment entries ***</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};

export default AllCashSupplierPayment;
