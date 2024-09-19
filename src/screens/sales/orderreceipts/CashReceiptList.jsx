import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllSalesCashReceptsQuery } from "../../../slices/finance/cashAccountApiSlice";
import { useReverseCashSalesOrderReceiptMutation } from "../../../slices/finance/cashAccountApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

import TimeDate from "../../../components/TimeDate";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";
import axios from "axios";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";
import { GrRevert } from "react-icons/gr";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

const CashReceiptList = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const su = 9999;
  let isAdmin = userInfo.roles.includes(su) ? true : false;
  const { data: orders, isLoading } = useGetAllSalesCashReceptsQuery();
  const [reverseCashSalesOrderReceipt] =
    useReverseCashSalesOrderReceiptMutation();

  console.log(orders?.data);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
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

  const handleReverse = async (e) => {
    try {
      const res = await reverseCashSalesOrderReceipt({ id: e }).unwrap();
      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.data.message);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Date",
        accessor: "formatted_created_at",
      },
      {
        Header: "Cash Account",
        accessor: "cash_account_name",
      },

      {
        Header: "Amount",
        accessor: "amount",
      },
      { Header: "SP", accessor: "related_name" },
      { Header: "Created By", accessor: "create_by" },
      {
        Header: "Reverse",
        accessor: "reserve",
        Cell: ({ row }) => {
          const isReversed = row.original.amount.startsWith("-");

          return (
            <Button
              variant={isReversed ? "outline-danger" : "outline-primary"}
              onClick={() => handleReverse(row.original.entry_id)}
              disabled={isReversed || !isAdmin} // Disable button if reference ends with '-R'
            >
              <GrRevert />
            </Button>
          );
        },
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
        <p>*** All Sales Cash Receipts ***</p>

        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};
export default CashReceiptList;
