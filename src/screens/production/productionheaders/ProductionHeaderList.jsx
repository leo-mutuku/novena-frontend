import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllProductionHeadersQuery } from "../../../slices/production/productionHeaderApiSlice";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";

import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdAdd, IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import AddProductionModal from "./lines/AddProductionModal";

import TimeDate from "../../../components/TimeDate";
import { GiReturnArrow } from "react-icons/gi";

const ProductionHeaderList = () => {
  let timeDate = new TimeDate();
  const [mode, set_mode] = useState("none");
  const [mode_delete, set_mode_delete] = useState("none");
  const [store_purchase_id, set_store_purchase_id] = useState("");
  const [batch_number, set_batch_number] = useState("");
  const handleAdd = (e, id, batch_number, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode(style);
    set_batch_number(batch_number);
  };
  const handleDelete = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode_delete(style);
  };
  const { data: production, isLoading } = useGetAllProductionHeadersQuery();
  const navigate = useNavigate();
  useEffect(() => {});
  console.log(production?.data);

  return (
    <>
      <>
        <div style={{ display: `${mode}` }}>
          <AddProductionModal
            store_purchase_id={store_purchase_id}
            set_mode={set_mode}
            batch_number={batch_number}
          />
        </div>
      </>
      <p>*** All Production ***</p>

      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th style={{ position: "initial" }}>#</th>
            <th style={{ position: "initial" }}>Date </th>
            <th style={{ position: "initial" }}>Officer</th>
            <th style={{ position: "initial" }}>Batch No.</th>
            <th style={{ position: "initial" }}>Input</th>
            <th style={{ position: "initial" }}>Expected</th>
            <th style={{ position: "initial" }}>Output</th>
            <th style={{ position: "initial" }}>Variance</th>
            <th style={{ position: "initial" }}>By</th>
            <th style={{ position: "initial" }}>Status</th>
            <th style={{ position: "initial" }}>Action</th>
            <th style={{ position: "initial" }}> Rev</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : production?.data[0] === null ? (
            <>No data</>
          ) : (
            production?.data?.map((item, index) => (
              <tr>
                <td>{index + 1}</td>

                <td style={{ fontSize: "14px" }}>{`${timeDate.date(
                  item.production_date
                )} `}</td>
                <td style={{ fontSize: "14px" }}>
                  {item.production_officer_first_name}
                </td>

                <td style={{ fontSize: "14px" }}>{item.batch_number}</td>
                <td style={{ fontSize: "14px" }}>{item.production_input}</td>
                <td style={{ fontSize: "14px" }}>{item.expected_output}</td>
                <td style={{ fontSize: "14px" }}>{item.actual_output}</td>
                <td style={{ fontSize: "14px" }}>{item.production_variance}</td>
                <td style={{ fontSize: "14px" }}>{item.created_by}</td>
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
                      <Button className="btn btn-primary" size="sm">
                        <IoMdAdd
                          onClick={(e) =>
                            handleAdd(
                              e,
                              item.production_batch_no,
                              item.batch_number,
                              "block"
                            )
                          }
                        />
                      </Button>
                    </Link>
                  ) : item.status === "Posted" ? (
                    <Link
                      to={`/production/productionheaders/productioncertificate/${item.production_batch_no}`}
                    >
                      <Button className="btn btn-success" size="sm">
                        <IoMdEye
                          onClick={(e) =>
                            handleAdd(
                              e,
                              item.production_batch_no,
                              item.batch_number,
                              "none"
                            )
                          }
                        />
                      </Button>
                    </Link>
                  ) : (
                    "--"
                  )}
                </td>
                <td>
                  {item.status === "Posted" ? (
                    <Link to={`#`}>
                      <GiReturnArrow
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
export default ProductionHeaderList;
