import React, { useEffect } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import {
  useDeleteSalesPersonMutation,
  useGetAllSalesPeopleQuery,
  useValidateSalesperSonmakeOrderMutation,
  useEditSalesPersonLimitMutation,
} from "../../../slices/sales/salesPeopleApiSlice";

import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SalesPeoplelist = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [created_by, set_created_by] = React.useState("");

  const navigate = useNavigate();
  const role = 9999;
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);
  const [removePerson] = useDeleteSalesPersonMutation();
  const { data: data } = useGetAllSalesPeopleQuery();
  const [validateSales] = useValidateSalesperSonmakeOrderMutation();

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

  const handleValidatePerson = async (e, staff_id) => {
    try {
      const res = await validateSales({
        staff_id,
      }).unwrap();
      if (res.status == "success") {
        toast.success("Validated successfully!");
      } else {
        toast.error("Something went wrong try again!");
      }
    } catch (error) {
      toast.error("Something went wrong try again!");
    }
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
            <th>Limit</th>
            <th>Make Order</th>
            <th>Update Status</th>
            <th>Edit Limit</th>
            {/* <th>Remove</th> */}
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
              <td>{item.order_limit}</td>
              <td>{item.make_order === false ? <>No</> : <>Yes</>}</td>

              <td>
                <Button
                  onClick={(e) => handleValidatePerson(e, item.staff_id)}
                  variant="success"
                >
                  Validate
                </Button>
              </td>
              <td>
                <Link
                  to={
                    userInfo?.roles.includes(role)
                      ? `/sales/salespeople/edit/${item.staff_id}`
                      : "#"
                  }
                >
                  <Button variant="warning">
                    <CiEdit />
                  </Button>
                </Link>
              </td>
              {/* <td>
                <Link
                  to={"#"}
                  onClick={() => handleRemovePerson(item.staff_id)}
                >
                  {item.first_name}
                </Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default SalesPeoplelist;
