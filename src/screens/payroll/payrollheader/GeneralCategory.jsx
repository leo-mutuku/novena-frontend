import React, { useEffect, useState, useMemo } from "react";
import Loader from "../../../components/Loader";
import { useGetPayrollHeaderGeneralCategoryQuery } from "../../../slices/payroll/payrollHeadersApiSlice";

import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FcProcess } from "react-icons/fc";
import TimeDate from "../../../components/TimeDate";
import { IoMdEye } from "react-icons/io";
import moment from "moment";
import DataTable from "../../../components/general/DataTable";

const GeneralCategory = () => {
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
  const { data, isLoading } = useGetPayrollHeaderGeneralCategoryQuery();

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
        Header: "Created At",
        accessor: "created_at",
        Cell: ({ value }) => (
          <span>{`${moment(value).format("YYYY-MM-DD")} : ${moment(
            value
          ).format("HH:mm A")}`}</span>
        ),
      },

      {
        Header: "Staff Count",
        accessor: "number_of_staff",
        Cell: ({ row }) => <Link to="#">{row.original.number_of_staff}</Link>,
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
        Header: "Deductions",
        accessor: "total_deductions",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <Link
            to={`/payroll/payrollheader/actions/${row.original.payroll_header_id}`}
          >
            <FcProcess size={20} />
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <>
      <></>
      <p>*** General Payroll List ***</p>
      <DataTable columns={columns} data={tableData} />
    </>
  );
};
export default GeneralCategory;
