import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllPostedSalesOrdersQuery } from "../../../slices/sales/salesOrderHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

import TimeDate from "../../../components/TimeDate";
import DataTable from "../../../components/general/DataTable";

const OrderDispatchListHeader = () => {
  const { data: orders, isLoading } = useGetAllPostedSalesOrdersQuery();
  let timeDate = new TimeDate();
  const [tableData, setTableData] = useState([]);
  const [mode, set_mode] = useState("none");
  const [mode_delete, set_mode_delete] = useState("none");
  const [store_purchase_id, set_store_purchase_id] = useState("");
  const handleAdd = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode(style);
  };

  useEffect(() => {
    if (orders?.data) {
      setTableData(orders.data);
    }
  }, [orders]);
  const handleDelete = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode_delete(style);
  };

  const navigate = useNavigate();
  useEffect(() => {}, [orders]);

  const columns = useMemo(
    () => [
      {
        Header: "Sale Date",
        accessor: "sales_order_date",
        Cell: ({ value }) => <span>{moment(value).format("YYYY-MM-DD")}</span>,
      },
      {
        Header: "Sale Type",
        accessor: "sale_order_type",
      },
      {
        Header: "Order #",
        accessor: "sales_order_number",
      },
      {
        Header: "Total",
        accessor: "total",
      },
      {
        Header: "No Of Items",
        accessor: "pay_per_bale",
      },
      {
        Header: "Customer Name",
        accessor: "customer_name",
      },
      {
        Header: "Sale Person",
        accessor: "sales_person_number",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span style={{ color: getStatusColor(value) }}>{value}</span>
        ),
      },
      {
        Header: "Add",
        accessor: "add",
        Cell: ({ row }) => (
          <button
            onClick={(e) =>
              handleAdd(e, row.original.sales_order_number, "block")
            }
            disabled={row.original.status !== "New"}
          >
            <IoMdAdd />
          </button>
        ),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row }) => (
          <button
            onClick={(e) =>
              handleDelete(e, row.original.store_purchase_number, "block")
            }
            disabled={row.original.status !== "New"}
          >
            <MdDelete />
          </button>
        ),
      },
    ],
    [handleDelete, handleAdd]
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
      <p>*** All Posted Sales Orders ***</p>

      <div>
        <p>*** All Sales Orders ***</p>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};
export default OrderDispatchListHeader;
