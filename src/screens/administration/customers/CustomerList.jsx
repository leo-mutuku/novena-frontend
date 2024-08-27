import React, { useEffect, useState } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllCustomersQuery } from "../../../slices/administration/customersApiSlice";
import { Table, Row, Col } from "react-bootstrap";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { useSelector } from "react-redux";
import { handlePrintA4 } from "../../../components/printFunction";
import { handlePrintA4Color } from "../../../components/printFunctionColor";

const CustomerList = () => {
  const [customer, set_customer] = useState({
    customer_outlet_name: "",
    customer_contact_person: "",
    customer_contact: "",
    customer_location: "",
  });
  const [user, set_user] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [customers, set_customers] = useState([]);
  const { data, isLoading } = useGetAllCustomersQuery();
  const date = new Date();
  useEffect(() => {
    if (userInfo) {
      set_user(userInfo.first_name);
    }
    set_customers(data?.data);
  }, [data, userInfo]);
  const columns = [
    { header: "Outlet", dataKey: "customer_outlet_name" },
    { header: "Contact Person", dataKey: "customer_contact_person" },
    { header: "Contact", dataKey: "customer_contact" },
    { header: "Location", dataKey: "customer_location" },
  ];
  const footer_header = [
    { header: "Outlet", dataKey: "customer_outlet_name" },
    { header: "Outlet", dataKey: "customer_outlet_name" },
  ];
  const footer_body = [
    { header: "Outlet", dataKey: "customer_outlet_name" },
    { header: "Outlet", dataKey: "customer_outlet_name" },
  ];
  const headers = {
    file_name: customers,
    file_title: `List of All customer`,
    created_by: user,
    date: date,
  };
  const handleExcel = () => {};
  const handleA4PDF = (e) => {
    handlePrintA4Color(columns, customers, footer_header, footer_body);
  };
  const handleA5PDF = (e) => {
    handlePrintA4(columns, customers, footer_header, footer_body);
  };

  return (
    <>
      <Row>
        <Col>
          <p>*** All Customer ****</p>
        </Col>

        <Col>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleExcel}>
              Excel
            </Button>
            <Button variant="outlined" onClick={handleA4PDF}>
              PDF Grid
            </Button>
            <Button variant="outlined" onClick={handleA5PDF}>
              PDF Plain
            </Button>
          </Stack>
        </Col>
      </Row>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Outlet Name</th>
            <th>Contact Person</th>
            <th>Contact</th>
            <th>Location</th>
            <th>Edit</th>
            <th>View</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : (
            data?.data.map((customer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{customer.customer_outlet_name}</td>
                <td>{customer.customer_contact_person}</td>
                <td>{customer.customer_contact}</td>
                <td>{customer.customer_location}</td>
                <td>
                  <Link
                    to={`/administration/customers/update/${customer.customer_id}`}
                  >
                    <CiEdit />
                  </Link>
                </td>
                <td>
                  <Link to="#">
                    <IoMdEye />
                  </Link>
                </td>
                <td>
                  <Link to="#">
                    <MdDelete />
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
export default CustomerList;
