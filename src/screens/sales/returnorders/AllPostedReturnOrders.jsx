import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllPostedSaleReturnOrdersQuery } from "../../../slices/sales/salesOrderReturnApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

import TimeDate from "../../../components/TimeDate";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";

const AllPostedReturnOrders = () => {
  const { data: orders, isLoading } = useGetAllPostedSaleReturnOrdersQuery();

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
        accessor: "created_at",
        Cell: ({ value }) => <span>{moment(value).format("YYYY-MM-DD")}</span>,
      },
      {
        Header: "RO . No#",
        accessor: "header_id",
      },
      {
        Header: "By",
        accessor: "sales_type_name",
      },

      {
        Header: "Total",
        accessor: "total",
      },

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
                to={`/sales/returnorder/returnorderview/${row.original.header_id}`}
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
      <p>*** All Posted Return Orders ***</p>

      <div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};
export default AllPostedReturnOrders;
