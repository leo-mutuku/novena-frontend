// import React, { useEffect, useMemo, useState } from "react";
// import Loader from "../../../components/Loader";
// import { useGetAllSalesOrderHeadersQuery } from "../../../slices/sales/salesOrderHeadersApiSlice";
// import { Table, Button } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { FaRegFileExcel } from "react-icons/fa6";
// import { CiEdit } from "react-icons/ci";
// import { BsFileEarmarkPdf } from "react-icons/bs";
// import { IoMdAdd } from "react-icons/io";
// import { MdDelete } from "react-icons/md";
// import AddOrderLines from "./lines/AddOrderLines";
// // import DeletePurchaseModal from "./lines/DeletePurchaseModal";
// import TimeDate from "../../../components/TimeDate";
// import PrintSalesOrder from "./lines/PrintSalesOrder";
// import { TiPrinter } from "react-icons/ti";
// import DataTable from "../../../components/general/DataTable";
// import moment from "moment";

// const OrderHeaderList = () => {
//   const { data: orders, isLoading } = useGetAllSalesOrderHeadersQuery();
//   const [tableData, setTableData] = useState([]);
//   let timeDate = new TimeDate();
//   const [mode_print, set_mode_print] = useState("none");
//   const [mode, set_mode] = useState("none");
//   const [mode_delete, set_mode_delete] = useState("none");
//   const [store_purchase_id, set_store_purchase_id] = useState("");

//   const handleAdd = (e, id, style) => {
//     set_store_purchase_id(parseInt(id));
//     set_mode(style);
//   };

//   useEffect(() => {
//     if (orders?.data) {
//       setTableData(orders.data);
//     }
//   }, [orders]);

//   const handleDelete = (e, id, style) => {
//     set_store_purchase_id(parseInt(id));
//     set_mode_delete(style);
//   };

//   const navigate = useNavigate();
//   // useEffect(() => {}, [data]);

//   const handlePrint = (e, id, style) => {
//     set_store_purchase_id(parseInt(id));
//     set_print_mode(style);
//   };

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Sale Date",
//         accessor: "sales_order_date",
//         Cell: ({ value }) => <span>{moment(value).format("YYYY-MM-DD")}</span>,
//       },
//       {
//         Header: "Sale Type",
//         accessor: "sale_order_type",
//       },
//       {
//         Header: "Order #",
//         accessor: "sales_order_number",
//       },
//       {
//         Header: "Total",
//         accessor: "total",
//       },
//       {
//         Header: "No Of Items",
//         accessor: "pay_per_bale",
//       },
//       {
//         Header: "Customer Name",
//         accessor: "customer_name",
//       },
//       {
//         Header: "Sale Person",
//         accessor: "sales_person_number",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => (
//           <span style={{ color: getStatusColor(value) }}>{value}</span>
//         ),
//       },
//       {
//         Header: "Add",
//         accessor: "add",
//         Cell: ({ row }) => (
//           <button
//             onClick={(e) =>
//               handleAdd(e, row.original.sales_order_number, "block")
//             }
//             disabled={row.original.status !== "New"}
//           >
//             <IoMdAdd />
//           </button>
//         ),
//       },
//       {
//         Header: "Delete",
//         accessor: "delete",
//         Cell: ({ row }) => (
//           <button
//             onClick={(e) =>
//               handleDelete(e, row.original.store_purchase_number, "block")
//             }
//             disabled={row.original.status !== "New"}
//           >
//             <MdDelete />
//           </button>
//         ),
//       },
//     ],
//     [handleDelete, handleAdd]
//   );

//   // Function to determine status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "New":
//         return "orange";
//       case "In Transit":
//         return "blue";
//       case "Posted":
//         return "green";
//       default:
//         return "inherit";
//     }
//   };

//   if (isLoading) {
//     return <Loader />;
//   }
//   return (
//     <>
//       <>
//         <div style={{ display: `${mode}` }}>
//           <AddOrderLines
//             store_purchase_id={store_purchase_id}
//             set_mode={set_mode}
//           />
//         </div>
//         {/* <div style={{ display: `${mode_delete}` }}>
//           <DeletePurchaseModal
//             store_purchase_id={store_purchase_id}
//             set_mode_delete={set_mode_delete}
//           />
//         </div> */}
//         <div style={{ display: `${mode_print}` }}>
//           <PrintSalesOrder
//             purchase_header_id={store_purchase_id}
//             set_mode_print={set_mode_print}
//           />
//         </div>
//       </>
//       <div>
//         <p>*** All Sales Orders ***</p>

//         <DataTable columns={columns} data={tableData} />
//       </div>
//     </>
//   );
// };
// export default OrderHeaderList;

import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllSalesOrderHeadersQuery } from "../../../slices/sales/salesOrderHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import AddOrderLines from "./lines/AddOrderLines";
import TimeDate from "../../../components/TimeDate";
import PrintSalesOrder from "./lines/PrintSalesOrder";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";
import "./order.css";

const OrderHeaderList = () => {
  const { data: orders, isLoading } = useGetAllSalesOrderHeadersQuery();
  const [tableData, setTableData] = useState([]);
  const [isAddButtonActive, setIsAddButtonActive] = useState(false); // Step 1: State variable to track IoMdAdd button
  let timeDate = new TimeDate();
  const [mode_print, set_mode_print] = useState("none");
  const [mode, set_mode] = useState("none");
  const [mode_delete, set_mode_delete] = useState("none");
  const [store_purchase_id, set_store_purchase_id] = useState("");

  const handleAdd = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode(style);
    setIsAddButtonActive(true); // Step 2: Set IoMdAdd button active
  };

  useEffect(() => {
    if (orders?.data) {
      setTableData(orders.data);
    }
  }, [orders]);

  const handleDelete = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode_delete(style);
  };

  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "Sale Date",
        accessor: "sales_order_date",
        Cell: ({ value }) => <span>{moment(value).format("YYYY-MM-DD")}</span>,
      },
      {
        Header: "Sale Type",
        accessor: "sale_order_type",
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
        Header: "No Of Items",
        accessor: "pay_per_bale",
      },
      {
        Header: "Customer Name",
        accessor: "customer_name",
      },
      {
        Header: "Sale Person",
        accessor: "sales_person_number",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span style={{ color: getStatusColor(value) }}>{value}</span>
        ),
      },
      {
        Header: "Add",
        accessor: "add",
        Cell: ({ row }) => (
          <button
            onClick={(e) =>
              handleAdd(e, row.original.sales_order_number, "block")
            }
            disabled={row.original.status !== "New"}
          >
            <IoMdAdd />
          </button>
        ),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row }) => (
          <button
            onClick={(e) =>
              handleDelete(e, row.original.store_purchase_number, "block")
            }
            disabled={row.original.status !== "New"}
          >
            <MdDelete />
          </button>
        ),
      },
    ],
    [handleDelete, handleAdd]
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
      <>
        <div style={{ display: `${mode}` }}>
          <AddOrderLines
            store_purchase_id={store_purchase_id}
            set_mode={set_mode}
          />
        </div>
        <div style={{ display: `${mode_print}` }}>
          <PrintSalesOrder
            purchase_header_id={store_purchase_id}
            set_mode_print={set_mode_print}
          />
        </div>
      </>
      <div className="datatable-container">
        <p>*** All Sales Orders ***</p>
        <DataTable columns={columns} data={tableData} />
      </div>
    </>
  );
};
export default OrderHeaderList;
