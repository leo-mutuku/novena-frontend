import React, { useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllPostedProductionHeadersQuery } from "../../../slices/production/productionHeaderApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
// import PostedPurchaseModal from "./lines/PostedPurchaseModal";
import TimeDate from "../../../components/TimeDate";
const AllPostedProductionHeaderList = () => {
  const timeDate = new TimeDate();
  const handleAdd = (e) => {};
  const { data: posted_production, isLoading } =
    useGetAllPostedProductionHeadersQuery();
  const [posted_mode, set_posted_mode] = useState("");
  return (
    <>
      <p>*** All Posted Production ***</p>
      {/* <div>
        <PostedPurchaseModal />
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
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : posted_production?.data[0] === null ? (
            <>No data</>
          ) : (
            posted_production?.data?.map((item, index) => (
              <tr>
                <td>{index + 1}</td>

                <td style={{ fontSize: "14px" }}>{`${timeDate.date(
                  item.production_date
                )} : ${timeDate.time(item.production_date)}`}</td>
                <td>{item.production_officer}</td>

                <td style={{ fontSize: "14px" }}>{`${
                  item.production_batch_no
                }-${timeDate.date(item.production_date)}`}</td>
                <td>{item.production_input}</td>
                <td>{item.expected_output}</td>
                <td>{item.actual_output}</td>
                <td>{item.production_variance}</td>

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
                          handleAdd(e, item.store_purchase_number, "block")
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
export default AllPostedProductionHeaderList;
