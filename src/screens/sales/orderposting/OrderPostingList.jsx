import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllPostedSalesOrdersQuery } from "../../../slices/sales/salesOrderHeadersApiSlice";

import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

import TimeDate from "../../../components/TimeDate";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";

const OrderPostingList = () => {
  const { data: orders, isLoading } = useGetAllPostedSalesOrdersQuery();

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
        Header: "Sale Date",
        accessor: "sales_order_date",
        Cell: ({ value }) => <span>{moment(value).format("YYYY-MM-DD")}</span>,
      },
      {
        Header: "Sales Type",
        accessor: "sale_order_type",
      },
      {
        Header: "Order No.",
        accessor: "sales_order_number",
      },
      {
        Header: "Total",
        accessor: "total",
      },
      {
        Header: "No. of Items",
        accessor: "pay_per_bale",
      },
      {
        Header: "Cust Name",
        accessor: "customer_name",
      },
      {
        Header: "Sales .P",
        accessor: "first_name",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span style={{ color: getStatusColor(value) }}>{value}</span>
        ),
      },
      {
        Header: "Partial",
        accessor: "Partial",
        Cell: ({ row }) => (
          <>
            {row.original.status === "Posted" ? (
              <Link
                to={`/sales/returnorder/returnorder/${row.original.sales_order_number}`}
              >
                <IoMdEye />
              </Link>
            ) : (
              "--"
            )}
          </>
        ),
      },
      {
        Header: "Full",
        accessor: "Full",
        Cell: ({ row }) => (
          <>
            {row.original.status === "Posted" ? (
              <Link
                to={`/sales/returnorder/returnorder/${row.original.sales_order_number}`}
              >
                <IoMdEye />
              </Link>
            ) : (
              "--"
            )}
          </>
        ),
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
        <p>*** Order Clearing list ***</p>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};
export default OrderPostingList;
