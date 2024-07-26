import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetSalesExpenseQuery } from "../../../slices/sales/salesExpenseApiSlice";

import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdEye } from "react-icons/io";

import TimeDate from "../../../components/TimeDate";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";

const SalesExpenseList = () => {
  const { data: orders, isLoading } = useGetSalesExpenseQuery();

  const [tableData, setTableData] = useState([]);
  let timeDate = new TimeDate();
  const [mode, set_mode] = useState("none");
  const [mode_delete, set_mode_delete] = useState("none");
  const [store_purchase_id, set_store_purchase_id] = useState("");

  const handleAdd = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode(style);
  };

  const handleDelete = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode_delete(style);
  };

  const navigate = useNavigate();
  useEffect(() => {}, [orders]);

  useEffect(() => {
    if (orders?.data) {
      setTableData(orders.data);
    }
  }, [orders]);
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: "Entry Date",
        accessor: "created_at",
        Cell: ({ value }) => <span>{moment(value).format("YYYY-MM-DD")}</span>,
      },
      {
        Header: "Staff",
        accessor: "staff_id",
      },
      {
        Header: "description",
        accessor: "description",
      },

      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Captured By",
        accessor: "created_by",
      },
    ],
    []
  );

  // Function to determine status color...
  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "orange";
      case "In Transit":
        return "blue";
      case "Posted":
        return "green";
      default:
        return "inherit";
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <p>*** Sales Expense list ***</p>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};
export default SalesExpenseList;
