import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllSalesOrderHeadersQuery } from "../../../slices/sales/salesOrderHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import AddOrderLines from "./lines/AddOrderLines";
// import DeletePurchaseModal from "./lines/DeletePurchaseModal";
import TimeDate from "../../../components/TimeDate";

const OrderHeaderList = () => {
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
  const { data, isLoading } = useGetAllSalesOrderHeadersQuery();
  console.log(data?.data);
  const navigate = useNavigate();
  useEffect(() => {}, [data]);
  console.log(data);
  return (
    <>
      <>
        <div style={{ display: `${mode}` }}>
          <AddOrderLines
            store_purchase_id={store_purchase_id}
            set_mode={set_mode}
          />
        </div>
        {/* <div style={{ display: `${mode_delete}` }}>
          <DeletePurchaseModal
            store_purchase_id={store_purchase_id}
            set_mode_delete={set_mode_delete}
          />
        </div> */}
      </>
      <p>*** All Sales Orders ***</p>

      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Sale Date</th>
            <th>Sales Type</th>
            <th>Order No.</th>
            <th>Total</th>
            <th>No. of Items</th>
            <th>Cust Name</th>
            <th>Sales .P</th>
            <th>Status</th>
            <th>Add</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : data?.data[0] === null ? (
            <>No data</>
          ) : (
            data?.data?.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{`${timeDate.date(item.sales_order_date)}`}</td>
                <td>{item.sale_order_type}</td>

                <td>{item.sales_order_number}</td>
                <td>{item.total}</td>
                <td>{item.pay_per_bale}</td>
                <td>{item.customer_name}</td>
                <td>{item.sales_person_number}</td>
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

                <td>
                  {item.status === "New" ? (
                    <Link to={`#`}>
                      <IoMdAdd
                        onClick={(e) =>
                          handleAdd(e, item.sales_order_number, "block")
                        }
                      />
                    </Link>
                  ) : (
                    "--"
                  )}
                </td>
                <td>
                  {item.status === "New" ? (
                    <Link to={`#`}>
                      <MdDelete
                        onClick={(e) =>
                          handleDelete(e, item.store_purchase_number, "block")
                        }
                      />
                    </Link>
                  ) : (
                    "--"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};
export default OrderHeaderList;
