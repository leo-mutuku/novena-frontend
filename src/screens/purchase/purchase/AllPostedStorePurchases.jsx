import React from "react";
import Loader from "../../../components/Loader";
import { useGetAllPostedStoredPurchasesQuery } from "../../../slices/purchase/storePurchaseHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
const AllPostedStorePurchases = () => {
  const handleAdd = (e) => {
    alert("Hi");
  };
  const { data, isLoading } = useGetAllPostedStoredPurchasesQuery();
  console.log(data);
  return (
    <>
      <p>*** All Posted Store Purchases ***</p>
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
            <th>View</th>
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
                <td>{item.purchase_date}</td>

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
