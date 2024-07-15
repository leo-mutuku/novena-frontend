import React from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import {
  useDeleteSalesPersonMutation,
  useGetAllSalesPeopleQuery,
} from "../../../slices/sales/salesPeopleApiSlice";

import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { toast } from "react-toastify";

const SalesPeoplelist = () => {
  const [removePerson] = useDeleteSalesPersonMutation();
  const { data: data } = useGetAllSalesPeopleQuery();

  const handleRemovePerson = async (staff_id) => {
    toast.error(
      "Sorry account can only be removed after 6 months of in activity"
    );
    // const res = await removePerson({
    //   staff_id,
    // }).unwrap();
    // if (res.status == "success") {
    //   F;
    //   toast.success("Removed!");
    // } else {
    //   toast.error("Something went wrong try again!");
    // }
  };
  return (
    <>
      <p>*** All sales people people ***</p>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Sales.P no</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Balance</th>
            <th>Bales</th>
            <th>Clear</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.sales_person_number}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.balance}</td>
              <td>{item.bales}</td>

              <td>
                <Link to={`/sales/salespeople/clear/${item.staff_id}`}>
                  {"Clear"}
                </Link>
              </td>
              <td>
                <Link
                  to={"#"}
                  onClick={() => handleRemovePerson(item.staff_id)}
                >
                  {item.first_name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default SalesPeoplelist;
