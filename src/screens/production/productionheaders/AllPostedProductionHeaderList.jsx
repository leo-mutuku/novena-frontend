import React, { useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllPostedProductionHeadersQuery } from "../../../slices/production/productionHeaderApiSlice";
import { useGetAllPurchaseLinesByHeaderIdQuery } from "../../../slices/purchase/storePurchaseLinesApiSlice";

import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import TimeDate from "../../../components/TimeDate";
// import EditPurchaseModal from "./lines/EditPurchaseModal";
const AllPostedProductionHeaderList = () => {
  const [edit_mode, set_edit_mode] = useState("none");
  const [purchase_header_id, set_purchase_header_id] = useState("");
  const timeDate = new TimeDate();
  const {
    data: posted_production_headers,
    error,
    isLoading,
  } = useGetAllPostedProductionHeadersQuery();

  const handleEdit = (e, id, mode) => {
    set_edit_mode(mode);
    set_purchase_header_id(parseInt(id));
  };
  console.log(posted_production_headers?.data);
  return (
    <>
      <p>*** All Posted Production ***</p>
      {/* <div style={{ display: `${edit_mode}` }}>
        <EditPurchaseModal
          set_edit_mode={set_edit_mode}
          edit_mode={edit_mode}
          purchase_header_id={purchase_header_id}
        />
      </div> */}

      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Date </th>
            <th>Officer</th>
            <th>Batch No.</th>
            <th>Input</th>
            <th>Expected</th>
            <th>Output</th>
            <th>Variance</th>
            <th style={{ fontSize: 12 }}>Cost of Packaging</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : posted_production_headers?.data[0] === null ? (
            <>No data</>
          ) : (
            posted_production_headers?.data?.map((item, index) => (
              <tr>
                <td>{index + 1}</td>

                <td style={{ fontSize: "14px" }}>{`${timeDate.date(
                  item.production_date
                )}`}</td>
                <td>{item.production_officer}</td>

                <td style={{ fontSize: "14px" }}>{`${item.batch_number}`}</td>
                <td>{item.production_input}</td>
                <td>{item.expected_output}</td>
                <td>{item.actual_output}</td>
                <td>{item.production_variance}</td>
                <td>{item.packaging_cost}</td>

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
                    <Link
                      to={`/production/productionheaders/viewpostedproductionheade/${item.production_header_id}`}
                    >
                      <IoMdEye
                        onClick={(e) =>
                          handleAdd(e, item.store_purchase_number, "block")
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
export default AllPostedProductionHeaderList;
