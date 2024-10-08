import React, { useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllStorePurchasesInTransitQuery } from "../../../slices/purchase/storePurchaseHeadersApiSlice";
import { useGetAllPurchaseLinesByHeaderIdQuery } from "../../../slices/purchase/storePurchaseLinesApiSlice";

import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import TimeDate from "../../../components/TimeDate";
import EditPurchaseModal from "./lines/EditPurchaseModal";
const AllStorePurchasesInTransit = () => {
  const [edit_mode, set_edit_mode] = useState("none");
  const [purchase_header_id, set_purchase_header_id] = useState("");
  const timeDate = new TimeDate();
  const { data: purchase_order_intransit, isLoading } =
    useGetAllStorePurchasesInTransitQuery();

  const handleAdd = (e) => {};
  const handleEdit = (e, id, mode) => {
    set_edit_mode(mode);
    set_purchase_header_id(parseInt(id));
  };
  return (
    <>
      <p>*** All Store Purchases In Transit ***</p>
      <div style={{ display: `${edit_mode}` }}>
        <EditPurchaseModal
          set_edit_mode={set_edit_mode}
          edit_mode={edit_mode}
          purchase_header_id={purchase_header_id}
        />
      </div>

      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th style={{ position: "initial" }}>#</th>
            <th style={{ position: "initial" }}>Purchase no </th>
            <th style={{ position: "initial" }}>Purchase date</th>
            <th style={{ position: "initial" }}>Prepared by</th>

            <th style={{ position: "initial" }}>Total cost</th>
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
                <td>{item.store_purchase_number}</td>
                <td>{`${timeDate.date(item.purchase_date)} : ${timeDate.time(
                  item.purchase_date
                )}`}</td>

                <td>{item.prepared_by}</td>

                <td>{item.total_cost}</td>
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
                    handleEdit(e, item.store_purchase_number, "block")
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
export default AllStorePurchasesInTransit;
