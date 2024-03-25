import React, { useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllSalesOrdersInTransitQuery } from "../../../slices/sales/salesOrderHeadersApiSlice";

import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { CiEdit } from "react-icons/ci";

import TimeDate from "../../../components/TimeDate";
import EditOrder from "./lines/EditOrder";
const AllOrderHeadersInTransit = () => {
  const [sales_order_number, set_sales_order_number] = useState("");
  const timeDate = new TimeDate();
  const { data: purchase_order_intransit, isLoading } =
    useGetAllSalesOrdersInTransitQuery();

  const [open, setOpen] = useState(false);

  const handleClickOpen = (e, id, name) => {
    setOpen(true);
    set_sales_order_number(parseInt(id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <p>*** All Store Purchases In Transit ***</p>
      <div>
        <EditOrder
          sales_order_number={sales_order_number}
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      </div>

      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th style={{ position: "initial" }}>#</th>
            <th style={{ position: "initial" }}>Sale Date</th>
            <th style={{ position: "initial" }}>Sales Type</th>
            <th style={{ position: "initial" }}>Order No.</th>
            <th style={{ position: "initial" }}>Total</th>
            <th style={{ position: "initial" }}>No. of Items</th>
            <th style={{ position: "initial" }}>Cust Name</th>
            <th style={{ position: "initial" }}>Sales .P</th>
            <th style={{ position: "initial" }}>Status</th>
            <th style={{ position: "initial" }}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <Loader />
            </tr>
          ) : purchase_order_intransit?.data[0] === null ? (
            <>No data</>
          ) : (
            purchase_order_intransit?.data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{`${timeDate.date(item.sales_order_date)}`}</td>
                <td>{item.sale_order_type}</td>

                <td>{item.sales_order_number}</td>
                <td>{item.total}</td>
                <td>{item.pay_per_bale}</td>
                <td>{item.customer_name}</td>
                <td>{item.first_name}</td>
                <td>
                  {item.status === "New" ? (
                    <span
                      onClick={(e) => handleAdd()}
                      style={{ color: "orange" }}
                    >
                      {item.status}
                    </span>
                  ) : item.status === "In Transit" ? (
                    <span style={{ color: "blue" }}>{item.status}</span>
                  ) : item.status === "Posted" ? (
                    <span style={{ color: "green" }}>{item.status}</span>
                  ) : (
                    item.status
                  )}
                </td>
                <td
                  onClick={(e) => handleClickOpen(e, item.sales_order_number)}
                >
                  {item.status === "In Transit" ? (
                    <Link to={`#`}>
                      <CiEdit />
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
export default AllOrderHeadersInTransit;
