import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import {
  useGetAllSalesOrderHeadersQuery,
  useCancelOrderMutation,
} from "../../../slices/sales/salesOrderHeadersApiSlice";
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
import PrintSalesOrder from "./lines/PrintSalesOrder";
import { TiPrinter } from "react-icons/ti";
import { toast } from "react-toastify";

const OrderHeaderList = () => {
  let timeDate = new TimeDate();
  const [mode_print, set_mode_print] = useState("none");
  const [mode, set_mode] = useState("none");
  const [mode_delete, set_mode_delete] = useState("none");
  const [store_purchase_id, set_store_purchase_id] = useState("");
  const [order_number, set_order_number] = useState(0);

  const handleAdd = (e, id, style, order_number_id) => {
    set_store_purchase_id(parseInt(id));
    set_order_number(parseInt(order_number_id));
    set_mode(style);
  };

  const handleDelete = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode_delete(style);
  };
  const { data, isLoading } = useGetAllSalesOrderHeadersQuery();
  const [cancleOrder] = useCancelOrderMutation();

  const handleCancelOrder = async (id) => {
    try {
      const res = await cancleOrder({ id }).unwrap();
      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.data.message || "Error occurred");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {}, [data]);

  const handlePrint = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_print_mode(style);
  };
  return (
    <>
      <>
        <div style={{ display: `${mode}` }}>
          <AddOrderLines
            store_purchase_id={store_purchase_id}
            order_number={order_number}
            set_mode={set_mode}
          />
        </div>
        {/* <div style={{ display: `${mode_delete}` }}>
          <DeletePurchaseModal
            store_purchase_id={store_purchase_id}
            set_mode_delete={set_mode_delete}
          />
        </div> */}
        <div style={{ display: `${mode_print}` }}>
          <PrintSalesOrder
            purchase_header_id={store_purchase_id}
            set_mode_print={set_mode_print}
          />
        </div>
      </>
      <div>
        <p>*** All Sales Orders ***</p>

        <Table striped style={{ border: "1px solid #ccc", position: "static" }}>
          <thead>
            <tr style={{ position: "static" }}>
              <th style={{ position: "initial" }}>#</th>
              <th style={{ position: "initial" }}>Sale Date</th>

              <th style={{ position: "initial" }}>Order No.</th>
              <th style={{ position: "initial" }}>Total</th>
              <th style={{ position: "initial" }}>No. of Items</th>
              <th style={{ position: "initial" }}>Customer</th>
              <th style={{ position: "initial" }}>SP</th>
              <th style={{ position: "initial" }}>Status</th>
              <th style={{ position: "initial" }}>Add</th>
              <th style={{ position: "initial" }}>Del</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>
                  <Loader />
                </td>
              </tr>
            ) : data?.data[0] === null ? (
              <>No data</>
            ) : (
              data?.data?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{`${timeDate.date(item.sales_order_date)}`}</td>

                  <td>{item.sales_order_number}</td>
                  <td>{item.total}</td>
                  <td>{item.number_of_items}</td>
                  <td>{item.customer_name}</td>
                  <td>{item.first_name}</td>
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
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={(e) =>
                          handleAdd(
                            e,
                            item.sales_order_number,
                            "block",
                            item.sales_person_number
                          )
                        }
                      >
                        <IoMdAdd />
                      </Button>
                    ) : (
                      "--"
                    )}
                  </td>
                  <td>
                    {item.status === "New" ? (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={(e) =>
                          handleCancelOrder(item.sales_order_number)
                        }
                      >
                        <MdDelete />
                      </Button>
                    ) : (
                      "--"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default OrderHeaderList;
