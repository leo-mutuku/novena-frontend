import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllDailyPackHouseHeadersQuery } from "../../../slices/production/dailyPackhouseHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
// import AddDailyPackModal from "./lines/AddDailyPackModal";
// import DeletePurchaseModal from "./lines/DeletePurchaseModal";
import TimeDate from "../../../components/TimeDate";

const PayrollHeadersList = () => {
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
  const { data, isLoading } = useGetAllDailyPackHouseHeadersQuery();
  const navigate = useNavigate();
  useEffect(() => {}, [data]);
  console.log(data);
  return (
    <>
      <>
        {/* <div style={{ display: `${mode}` }}>
          <AddDailyPackModal
            store_purchase_id={store_purchase_id}
            set_mode={set_mode}
          />
        </div> */}
        {/* <div style={{ display: `${mode_delete}` }}>
          <DeletePurchaseModal
            store_purchase_id={store_purchase_id}
            set_mode_delete={set_mode_delete}
          />
        </div> */}
      </>
      <p>*** Daily Pack house ***</p>

      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Pack Date</th>
            <th>Pack Type</th>
            <th>Total</th>
            <th>Bales</th>
            <th>Cost @ Bale</th>
            <th>Total Cost</th>
            <th>Status</th>
            <th>Add</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : data?.data[0] === null ? (
            <>No data</>
          ) : (
            data?.data?.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{`${timeDate.date(item.pack_date)}`}</td>
                <td>{item.pack_type}</td>

                <td>{item.total}</td>
                <td>{item.total_bales}</td>
                <td>{item.pay_per_bale}</td>
                <td>{item.total_packing_cost}</td>
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
export default PayrollHeadersList;
