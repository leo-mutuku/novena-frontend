import React, { useEffect, useState, useMemo } from "react";
import Loader from "../../../components/Loader";
import { useGetAllPayRollHeadersQuery } from "../../../slices/payroll/payrollHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import moment from "moment";
import DataTable from "../../../components/general/DataTable";

import TimeDate from "../../../components/TimeDate";

const PayrollHeadersList = () => {
  let timeDate = new TimeDate();
  const [mode, set_mode] = useState("none");
  const [mode_delete, set_mode_delete] = useState("none");
  const [store_purchase_id, set_store_purchase_id] = useState("");
  const [tableData, setTableData] = useState([]);
  const handleAdd = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode(style);
  };
  const handleDelete = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode_delete(style);
  };
  const { data, isLoading } = useGetAllPayRollHeadersQuery();
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.data) {
      setTableData(data.data);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Payroll no",
        accessor: "payroll_header_id",
      },

      {
        Header: "Start Date",
        accessor: "start_date",
        Cell: ({ row }) => <>{timeDate.date(row.original.start_date)}</>,
      },
      {
        Header: "End Date",
        accessor: "end_date",
        Cell: ({ row }) => <>{timeDate.date(row.original.end_date)}</>,
      },
      {
        Header: "Category",
        accessor: "category_name",
        Cell: ({ row }) => (
          <Link
            to={`/payroll/payrollheader/actions/${row.original.payroll_header_id}`}
          >
            {row.original.category_name}
          </Link>
        ),
      },

      {
        Header: "Gross Pay",
        accessor: "gross_pay",
      },
      {
        Header: "Net pay",
        accessor: "net_pay",
      },
      {
        Header: "Total Deductions",
        accessor: "total_deductions",
      },

      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  return (
    <>
      <></>
      <p>*** All Payroll Lists ***</p>
      <DataTable columns={columns} data={tableData} />
    </>
  );
};
export default PayrollHeadersList;
