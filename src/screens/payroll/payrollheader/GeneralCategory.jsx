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

      {
        Header: "View",
        accessor: "view",
        Cell: () => (
          <Link to="#">
            <IoMdEye />
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

      {/* <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Payroll no</th>
            <th>Date</th>
            <th>Staff Count</th>
            <th>Gross Pay</th>
            <th>Net Pay</th>
            <th>Deductions</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : data?.data[0] === null ? (
            <>No data</>
          ) : (
            data?.data?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.payroll_header_id}</td>
                <td style={{ fontSize: "10px" }}>{`${timeDate.date(
                  item.start_date
                )} - ${timeDate.date(item.end_date)}`}</td>

                <td>{item.number_of_staff}</td>
                <td>{item.gross_pay}</td>
                <td>{item.net_pay}</td>
                <td>{item.total_deductions}</td>
                <td>
                  <Link
                    to={`/payroll/payrollheader/actions/${item.payroll_header_id}`}
                  >
                    <FcProcess size={20} />
                  </Link>
                </td>
                <td>
                  {item.status === "New" ? (
                    <span style={{ color: "orange" }}>{item.status}</span>
                  ) : item.status === "In Transit" ? (
                    <span style={{ color: "blue" }}>{item.status}</span>
                  ) : item.status === "Posted" ? (
                    <span style={{ color: "green" }}>{item.status}</span>
                  ) : (
                    item.status
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table> */}
    </>
  );
};
export default GeneralCategory;
