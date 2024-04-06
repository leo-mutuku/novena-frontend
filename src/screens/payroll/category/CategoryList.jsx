import React from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllPayrollcategoriesQuery } from "../../../slices/payroll/categoryApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";

const CategoryList = () => {
  const { data, isLoading, error } = useGetAllPayrollcategoriesQuery();

  return (
    <>
      <p>*** All Payroll Categories ****</p>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Category code</th>
            <th>Pay Interval(days)</th>
            <th>Edit</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : (
            data?.data.map((category, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{category.category_name}</td>
                <td>{category.category_code}</td>
                <td>{category.pay_interval}</td>

                <td>
                  <Link
                    to={`/payroll/category/updatepayrollcategory/${category.payroll_category_id}`}
                  >
                    <CiEdit />
                  </Link>
                </td>
                <td>
                  <Link to={`#`}>
                    <IoMdEye />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};
export default CategoryList;
