import React, { useEffect, useState, useMemo } from "react";
import Loader from "../../../components/Loader";
import { useGetAllDailyPackHouseHeadersQuery } from "../../../slices/production/dailyPackhouseHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { CiEdit } from "react-icons/ci";
import { IoIosAdd, IoIosEye } from "react-icons/io";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import AddDailyPackModal from "./lines/AddDailyPackModal";
import DataTable from "../../../components/general/DataTable";
// import DeletePurchaseModal from "./lines/DeletePurchaseModal";
import TimeDate from "../../../components/TimeDate";
import { FaRegFileExcel, FaFilePdf, FaFileExcel } from "react-icons/fa";

const DailyPackHouseHeadersList = () => {
  const [tableData, setTableData] = useState([]);
  let timeDate = new TimeDate();
  const [mode, set_mode] = useState("none");
  const [batch_no, set_batch_no] = useState("");
  const [mode_delete, set_mode_delete] = useState("none");
  const [store_purchase_id, set_store_purchase_id] = useState("");
  const handleAdd = (e, id, batch_no, style) => {
    set_batch_no(batch_no);
    set_store_purchase_id(parseInt(id));
    set_mode(style);
  };
  const handleDelete = (e, id, style) => {
    set_store_purchase_id(parseInt(id));

    set_mode_delete(style);
  };
  const { data: productionData, isLoading } =
    useGetAllDailyPackHouseHeadersQuery();

  console.log(productionData);
  useEffect(() => {
    if (productionData?.data) {
      setTableData(productionData.data);
    }
  }, [productionData]);
  const navigate = useNavigate();

  console.log(productionData);
  const handleEdit = () => {};

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

  const handleDownloadPDF = () => {};
  const handleDownloadExcel = () => {};
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Batch no#",
        accessor: "batch_no",
      },
      {
        Header: "Pack Date #",
        accessor: "pack_date",
        Cell: ({ value }) => <span>{moment(value).format("YYYY-MM-DD")}</span>,
      },

      {
        Header: "Weight In KG",
        accessor: "total_in_nity_kg",
      },
      {
        Header: "Number Packed",
        accessor: "number_packed",
        Cell: ({ row }) => <Link to="#">{row.original.number_packed}</Link>,
      },
      {
        Header: "Total Cost",
        accessor: "total_cost",
      },
      {
        Header: "Item Name",
        accessor: "item_name",
      },
      {
        Header: "Pack Type",
        accessor: "pack_type",
      },

      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => <span>{row.original.status}</span>,
      },
      {
        Header: "Action",
        accessor: "add",
        Cell: ({ row }) => (
          <Link
            to={
              row.original.status == "Posted"
                ? "#"
                : `/production/dailypackhouse/postdailypackhouse/${row.original.daily_packhouse_header_id}`
            }
          >
            {" "}
            {row.original.status == "Posted" ? (
              <Button className="success">
                {" "}
                <IoIosEye />
              </Button>
            ) : (
              <Button className="primary">
                {" "}
                <IoIosAdd />
              </Button>
            )}
          </Link>
        ),
      },
    ],
    [handleEdit, getStatusColor]
  );

  return (
    <>
      <>
        <div style={{ display: `${mode}` }}>
          <AddDailyPackModal
            store_purchase_id={store_purchase_id}
            set_mode={set_mode}
            batch_no={batch_no}
          />
        </div>
        {/* <div style={{ display: `${mode_delete}` }}>
          <DeletePurchaseModal
            store_purchase_id={store_purchase_id}
            set_mode_delete={set_mode_delete}
          />
        </div> */}
      </>

      <>
        <div>
          <p>*** Daily Pack house ***</p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ marginLeft: "10px" }}>
              <button onClick={handleDownloadPDF} disabled={"#"}>
                <FaFilePdf />
              </button>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <button onClick={handleDownloadExcel} disabled={"#"}>
                <FaFileExcel />
              </button>
            </div>
          </div>
          <DataTable columns={columns} data={tableData} />
        </div>
      </>
    </>
  );
};
export default DailyPackHouseHeadersList;
