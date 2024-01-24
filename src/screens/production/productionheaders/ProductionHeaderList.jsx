import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllProductionHeadersQuery } from "../../../slices/production/productionHeaderApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
// import AddPurchaseModal from "./lines/AddPurchaseModal";
// import DeletePurchaseModal from "./lines/DeletePurchaseModal";
import TimeDate from "../../../components/TimeDate";

const ProductionHeaderList = () => {
  let timeDate = new TimeDate();
  const [mode, set_mode] = useState("none");
  const [mode_delete, set_mode_delete] = useState("none");
  const [store_purchase_id, set_store_purchase_id] = useState("");
  const handleAdd = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode(style);
  };
  const handleDelete = (e, id, style) => {
    set_store_purchase_id(parseInt(id));
    set_mode_delete(style);
  };
  const { data: production, isLoading } = useGetAllProductionHeadersQuery();
  const navigate = useNavigate();
  useEffect(() => {});
  console.log(production?.data);
  console.log(Error);
  return (
    <>
      <>
        {/* <div style={{ display: `${mode}` }}>
          <AddPurchaseModal
            store_purchase_id={store_purchase_id}
            set_mode={set_mode}
          />
        </div>
        <div style={{ display: `${mode_delete}` }}>
          <DeletePurchaseModal
            store_purchase_id={store_purchase_id}
            set_mode_delete={set_mode_delete}
          />
        </div> */}
      </>
      <p>*** All Production ***</p>

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
          ) : production?.data[0] === null ? (
            <>No data</>
          ) : (
            production?.data?.map((item, index) => (
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
export default ProductionHeaderList;
