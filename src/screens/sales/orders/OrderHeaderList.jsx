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
import PrintSalesOrder from "./lines/PrintSalesOrder";
import { TiPrinter } from "react-icons/ti";
import AddOrders from "./lines/AddOrders";

const OrderHeaderList = () => {
  let timeDate = new TimeDate();

  const [sales_order_number, set_sales_order_number] = useState("");
  const [sales_person_name, set_sales_person_name] = useState("");

  const handleDelete = (e, id, style) => {
    set_mode_delete(style);
  };
  const { data, isLoading } = useGetAllSalesOrderHeadersQuery();

  const navigate = useNavigate();
  useEffect(() => {}, [data]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (e, id, name) => {
    setOpen(true);
    set_sales_order_number(parseInt(id));
    set_sales_person_name(name);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <>
        <div>
          <AddOrders
            sales_person_name={sales_person_name}
            sales_order_number={sales_order_number}
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        </div>
      </>
      <div>
        <p>*** All Sales Orders ***</p>

        <Table striped style={{ border: "1px solid #ccc", position: "static" }}>
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
              <th>Del</th>
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
                            handleClickOpen(
                              e,
                              item.sales_order_number,
                              item.first_name
                            )
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
      </div>
    </>
  );
};
export default OrderHeaderList;
