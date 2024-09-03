import React, { useState, useEffect, useMemo } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import {
  useGetBaleSetupsQuery,
  useDeleteBaleSetupMutation,
} from "../../../slices/sales/salesPeopleApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPrint } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";

import { MdMonetizationOn } from "react-icons/md";
import PrintA4A5ExcelButton from "../../../components/PrintA4A5ExcelButton";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

const ProductslistSetup = () => {
  const [paying_account_type, set_paying_account_type] = useState("");
  const [paying_account_id, set_paying_account_id] = useState("");
  const [columns_header, set_columns_header] = useState([]);
  const [columns_body, set_columns_body] = useState([]);
  const [footer_header, set_footer_header] = useState([]);
  const [footer_data, set_footer_data] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const { data, isLoading } = useGetBaleSetupsQuery();
  const [deleteBaleSetup, { isSuccess: isDeleteSuccess }] =
    useDeleteBaleSetupMutation();
  useEffect(() => {
    if (data?.data) {
      setTableData(data.data);
    }
  }, [data]);

  const removeItem = async (id) => {
    try {
      const response = await deleteBaleSetup({ id }).unwrap();
      if (response.status === 200) {
        setTableData((prevData) => prevData.filter((item) => item.id !== id));
      }
    } catch (error) {
      toast.error("Error deleting item");
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },

      {
        Header: "Product",
        accessor: "item_name",
      },
      {
        Header: "Bale Units",
        accessor: "bale_units",
      },
      {
        Header: "Remove",
        accessor: "remove",
        Cell: (row) => (
          <Button onClick={() => removeItem(row.row.original.id)}>
            Remove
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <>
      <p>*** Bi Weekly staff List***</p>
      <DataTable columns={columns} data={tableData} />
    </>
  );
};
export default ProductslistSetup;
