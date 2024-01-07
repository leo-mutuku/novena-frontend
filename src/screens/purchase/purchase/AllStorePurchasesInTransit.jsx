import React from "react";
import Loader from "../../../components/Loader";
import { useGetAllStorePurchasesInTransitQuery } from "../../../slices/purchase/storePurchaseHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
const AllStorePurchasesInTransit = () => {
  const { data: purchase_order_intransit, isLoading } =
    useGetAllStorePurchasesInTransitQuery();

  const handleAdd = (e) => {};
  return (
    <>
      <p>*** All Store Purchases In Transit ***</p>
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
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : purchase_order_intransit.data[0] === null ? (
            <>No data</>
          ) : (
            purchase_order_intransit.data.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.store_purchase_number}</td>
                <td>{item.purchase_date}</td>

                <td>{item.prepared_by}</td>
                <td>{item.approved_by}</td>
                <td>{item.total_cost}</td>
                <td>
                  {item.status === "New" ? (
                    <span onClick={handleAdd} style={{ color: "orange" }}>
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
                <td>
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
