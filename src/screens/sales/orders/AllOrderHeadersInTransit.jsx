import React, { useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllSalesOrdersInTransitQuery } from "../../../slices/sales/salesOrderHeadersApiSlice";

import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { CiEdit } from "react-icons/ci";

import TimeDate from "../../../components/TimeDate";
import EditOrderLines from "./lines/EditOrderLines";
const AllOrderHeadersInTransit = () => {
  const [edit_mode, set_edit_mode] = useState("none");
  const [purchase_header_id, set_purchase_header_id] = useState("");
  const timeDate = new TimeDate();
  const { data: purchase_order_intransit, isLoading } =
    useGetAllSalesOrdersInTransitQuery();

  const handleAdd = (e) => {};

  const handleEdit = (e, id, mode) => {
    set_edit_mode(mode);
    set_purchase_header_id(parseInt(id));
  };
  return (
    <>
      <p>*** All Store Purchases In Transit ***</p>
      <div style={{ display: `${edit_mode}` }}>
        <EditOrderLines
          set_edit_mode={set_edit_mode}
          edit_mode={edit_mode}
          purchase_header_id={purchase_header_id}
        />
      </div>

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
            <th>Edit</th>
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
                <td>{item.sales_person_number}</td>
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
                  onClick={(e) =>
                    handleEdit(e, item.sales_order_number, "block")
                  }
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
