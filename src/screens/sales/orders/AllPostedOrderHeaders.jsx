import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllPostedSalesOrdersQuery } from "../../../slices/sales/salesOrderHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import AddOrderLines from "./lines/AddOrderLines";
import TimeDate from "../../../components/TimeDate";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";

const AllPostedOrderHeaders = () => {
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
        Header: "Order #",
        accessor: "sales_order_number",
      },
      {
        Header: "Total",
        accessor: "total",
      },

      {
        Header: "Customer",
        accessor: "customer_name",
      },
      {
        Header: "SP",
        accessor: "first_name",
      },
      { Header: "By", accessor: "created_by" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span style={{ color: getStatusColor(value) }}>{value}</span>
        ),
      },
      {
        Header: "View",
        accessor: "view",
        Cell: ({ row }) => (
          <>
            {row.original.status === "Posted" ? (
              <Link
                to={`/sales/orders/postedorderpreview/${row.original.sales_order_number}`}
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
      <p>*** All Posted Sales Orders ***</p>

      <div>
        <p>*** All Sales Orders ***</p>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};
export default AllPostedOrderHeaders;
