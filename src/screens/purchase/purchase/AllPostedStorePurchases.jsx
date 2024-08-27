import React, { useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllPostedStoredPurchasesQuery } from "../../../slices/purchase/storePurchaseHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import PostedPurchaseModal from "./lines/PostedPurchaseModal";
import TimeDate from "../../../components/TimeDate";
const AllPostedStorePurchases = () => {
  const timeDate = new TimeDate();
  const handleAdd = (e) => {};
  const { data: posted_purchase_orders, isLoading } =
    useGetAllPostedStoredPurchasesQuery();
  const [posted_mode, set_posted_mode] = useState("");
  return (
    <>
      <p>*** All Posted Store Purchases ***</p>
      <div>
        <PostedPurchaseModal />
      </div>

      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th style={{ position: "initial" }}>#</th>
            <th style={{ position: "initial" }}>Purchase no </th>
            <th style={{ position: "initial" }}>Purchase date</th>
            <th style={{ position: "initial" }}>Prepared by</th>
            <th style={{ position: "initial" }}>Aproved by</th>
            <th style={{ position: "initial" }}>Total cost</th>
            <th style={{ position: "initial" }}>Status</th>
            <th style={{ position: "initial" }}>View</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : posted_purchase_orders?.data[0] === null ? (
            <>No data</>
          ) : (
            posted_purchase_orders?.data.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.store_purchase_number}</td>
                <td>{`${timeDate.date(item.purchase_date)} : ${timeDate.time(
                  item.purchase_date
                )}`}</td>

                <td>{item.prepared_by}</td>
                <td>{item.approved_by}</td>
                <td>{item.total_cost}</td>
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
                  {item.status === "Posted" ? (
                    <Link to={`#`}>
                      <IoMdEye />
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
export default AllPostedStorePurchases;
