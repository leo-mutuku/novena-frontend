import React from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllPackHousePeopleQuery } from "../../../slices/production/packHousePeopleApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

const PackhosePeopleList = () => {
  const { data, isLoading } = useGetAllPackHousePeopleQuery();

  return (
    <>
      <p>*** All packhouse people ***</p>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Pack.h no</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>phone</th>
            <th>Edit</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : (
            data?.data?.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.packhouse_person_number}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>

                <td>
                  <Link to="#">
                    <CiEdit />
                  </Link>
                </td>
                <td>
                  <Link to="#">
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
export default PackhosePeopleList;
