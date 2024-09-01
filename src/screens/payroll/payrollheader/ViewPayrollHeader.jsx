import React, { useEffect, useState, useMemo } from "react";
import Loader from "../../../components/Loader";
import { useGetPayrollEntriesQuery } from "../../../slices/payroll/payrollLinesApiSlice";
import { usePrintSinglepaySlipMutation } from "../../../slices/payroll/payrollLinesApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdImportExport } from "react-icons/md";
import { TiPrinter } from "react-icons/ti";
import { IoMdEye } from "react-icons/io";
import { useParams } from "react-router-dom";
import moment from "moment";
import DataTable from "../../../components/general/DataTable";

import TimeDate from "../../../components/TimeDate";

const ViewPayrollHeader = () => {
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
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
  const { data, isLoading } = useGetPayrollEntriesQuery(id);
  const [printSinglePaySlip] = usePrintSinglepaySlipMutation();
  const handlePrintPaySlip = async (e, payid) => {
    const res = await printSinglePaySlip({ id: payid });
    navigate(`../allpayroll`);
  };
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
        accessor: "payroll_line_id",
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
        Header: "Staff ",
        accessor: "staff",
        Cell: ({ row }) => (
          <>{`${row.original.first_name} ${row.original.last_name}`}</>
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
        Header: "Deductions",
        accessor: "total_deductions",
      },
      {
        Header: "POS",
        accessor: "pos",
        Cell: ({ row }) => (
          <Button
            onClick={(e) => handlePrintPaySlip(e, row.original.payroll_line_id)}
          >
            <TiPrinter />
          </Button>
        ),
      },
    ],
    []
  );
  return (
    <>
      <></>
      <p>*** Payroll Entry Number {id} ***</p>
      <DataTable columns={columns} data={tableData} />
    </>
  );
};
export default ViewPayrollHeader;
