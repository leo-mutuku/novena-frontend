import React, { useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllReturnOrdersheadersIntransitQuery } from "../../../slices/sales/salesOrderReturnApiSlice";

import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { CiEdit } from "react-icons/ci";

import TimeDate from "../../../components/TimeDate";
import EditOrderLines from "./lines/EditOrderLines";
const AllReurnOrdersInTransit = () => {
  const [edit_mode, set_edit_mode] = useState("none");
  const [purchase_header_id, set_purchase_header_id] = useState("");
  const timeDate = new TimeDate();
  const { data: returnOrdersIntransit, isLoading } =
    useGetAllReturnOrdersheadersIntransitQuery();

  const handleAdd = (e) => {};

  const handleEdit = (e, id, mode) => {
    set_edit_mode(mode);
    set_purchase_header_id(parseInt(id));
  };
  return (
    <>
      <p>*** All Return Order In Transit ***</p>
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
            <th style={{ position: "initial" }}>#</th>
            <th style={{ position: "initial" }}>Sale Date</th>
            <th style={{ position: "initial" }}>RO. NO#</th>
            <th style={{ position: "initial" }}>Sales Type</th>

            <th style={{ position: "initial" }}>Total</th>

            <th style={{ position: "initial" }}>Status</th>
            <th style={{ position: "initial" }}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <Loader />
            </tr>
          ) : returnOrdersIntransit?.data[0] === null ? (
            <>No data</>
          ) : (
            returnOrdersIntransit?.data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{`${timeDate.date(item.created_at)}`}</td>
                <td>{item.header_id}</td>
                <td>{item.sales_type_name}</td>

                <td>{item.total}</td>

                <td>
                  {item.status === "New" ? (
                    <span
                      onClick={(e) => handleAdd()}
                      style={{ color: "orange" }}
                    >
                      {item.status}
                    </span>
                  ) : item.status === "Intransit" ? (
                    <span style={{ color: "blue" }}>{item.status}</span>
                  ) : item.status === "Posted" ? (
                    <span style={{ color: "green" }}>{item.status}</span>
                  ) : (
                    item.status
                  )}
                </td>
                <td>
                  {item.status === "Intransit" ? (
                    <Link
                      to={`/sales/returnorder/postreturnorder/${item.header_id}`}
                    >
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
export default AllReurnOrdersInTransit;
