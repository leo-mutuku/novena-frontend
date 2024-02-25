import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { useGetAllPostedSalesOrdersQuery } from "../../../slices/sales/salesOrderHeadersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import AddOrderLines from "./lines/AddOrderLines";
import TimeDate from "../../../components/TimeDate";

const AllPostedOrderHeaders = () => {
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
  const { data, isLoading } = useGetAllPostedSalesOrdersQuery();

  const navigate = useNavigate();
  useEffect(() => {}, [data]);

  return (
    <>
      <>
        <div style={{ display: `${mode}` }}>
          <AddOrderLines
            store_purchase_id={store_purchase_id}
            set_mode={set_mode}
          />
        </div>
      </>
      <p>*** All Posted Sales Orders ***</p>

      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Sale Date</th>
            <th>Sales Type</th>
            <th>Order No.</th>
            <th>Total</th>
            <th>No. of Items</th>
            <th>Cust Name</th>
            <th>Sales .P</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>
                <Loader />
              </td>
            </tr>
          ) : data?.data[0] === null ? (
            <>No data</>
          ) : (
            data?.data?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{`${timeDate.date(item.sales_order_date)}`}</td>
                <td>{item.sale_order_type}</td>

                <td>{item.sales_order_number}</td>
                <td>{item.total}</td>
                <td>{item.pay_per_bale}</td>
                <td>{item.customer_name}</td>
                <td>{item.sales_person_number}</td>
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

                <td>
                  {item.status === "Posted" ? (
                    <Link
                      to={`/sales/orders/postedorderpreview/${item.sales_order_number}`}
                    >
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
export default AllPostedOrderHeaders;
