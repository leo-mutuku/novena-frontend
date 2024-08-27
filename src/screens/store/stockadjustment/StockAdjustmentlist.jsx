import React, { useState, useEffect, useMemo } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllStockAdjustmentHeadersQuery } from "../../../slices/store/stockAdjustmentHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPrint } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";

import { CiEdit } from "react-icons/ci";
import PrintA4A5ExcelButton from "../../../components/PrintA4A5ExcelButton";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";
import axios from "axios";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const StockAdjustmentlist = () => {
  const [columns_header, set_columns_header] = useState([]);
  const [columns_body, set_columns_body] = useState([]);
  const [footer_header, set_footer_header] = useState([]);
  const [footer_data, set_footer_data] = useState([]);
  const [tableData, setTableData] = useState([]);

  const { data: stockAdj, isLoading } = useGetAllStockAdjustmentHeadersQuery();
  console.log(stockAdj);

  useEffect(() => {
    if (stockAdj?.data) {
      setTableData(stockAdj.data);
    }
  }, [stockAdj]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Item_Name",
        accessor: "item_name",
      },

      {
        Header: "Previous Stock",
        accessor: "previous_value",
      },

      {
        Header: "Current Stock",
        accessor: "current_value",
      },

      {
        Header: "Adj Value",
        accessor: "adjustment_value",
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ row }) => moment(row.original.created_at).format("DD-MM-YYYY"),
      },
      {
        Header: "By",
        accessor: "created_by",
      },
    ],
    []
  );

  return (
    <>
      <p>*** All Adjusment ***</p>
      <DataTable columns={columns} data={tableData} />
    </>
  );
};
export default StockAdjustmentlist;
