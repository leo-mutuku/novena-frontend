import React from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllGLAccountsQuery } from "../../../slices/finance/glApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

const AccountsList = () => {
  const { data, isLoading } = useGetAllGLAccountsQuery();

  return (
    <>
      <p>*** All GL ***</p>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Gl Name</th>
            <th>Gl Number</th>
            <th>Gl Balance</th>
            <th>Edit</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : (
            data?.data.map((item, index) => (
              <tr key={item.gl_id}>
                <td>{index + 1}</td>
                <td>{item.gl_name}</td>
                <td>{item.gl_number}</td>
                <td>{item.gl_balance}</td>
                {/* <td>{item.updated_at}</td> */}

                <td>
                  <Link to={`/finance/gl/updategl/${parseInt(item.gl_id)}`}>
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
export default AccountsList;
