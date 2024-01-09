import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllStorePurchaseHeadersQuery } from "../../../slices/purchase/storePurchaseHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import AddPurchaseModal from "./lines/AddPurchaseModal";
import DeletePurchaseModal from "./lines/DeletePurchaseModal";
import TimeDate from "../../../components/TimeDate";

const PurchaseList = () => {
  let timeDate = new TimeDate();
  const [mode, set_mode] = useState("none");
  const [mode_delete, set_mode_delete] = useState("none");
  const [store_purchase_id, set_store_purchase_id] = useState("");
  const handleAdd = (e, id, style) => {
    set_store_purchase_id(id);
    set_mode(style);
  };
  const handleDelete = (e, id, style) => {
    set_store_purchase_id(id);
    set_mode_delete(style);
  };
  const { data, isLoading } = useGetAllStorePurchaseHeadersQuery();
  const navigate = useNavigate();
  useEffect(() => {}, [data]);
  return (
    <>
      <>
        <div style={{ display: `${mode}` }}>
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
        </div>
      </>
      <p>*** All Store Purchases ***</p>

      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Purchase no </th>
            <th>Purchase date</th>
            <th>Prepared by</th>
            <th>Aproved by</th>
            <th>Total cost</th>
            <th>Status</th>
            <th>Add</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : data.data[0] === null ? (
            <>No data</>
          ) : (
            data.data.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.store_purchase_number}</td>
                <td>{`${timeDate.date(item.purchase_date)}`}</td>

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
export default PurchaseList;
