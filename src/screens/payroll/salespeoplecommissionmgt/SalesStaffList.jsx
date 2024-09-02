import React, { useState, useEffect, useMemo } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useSalesQuery } from "../../../slices/administration/staffApiSlice";
import { useGetAllBankAccountsQuery } from "../../../slices/finance/bankAccountsApiSlice";
import { useGetAllCashAccountsQuery } from "../../../slices/finance/cashAccountApiSlice";
import { MdAddTask } from "react-icons/md";

import { Link } from "react-router-dom";
import { FaPrint } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { Row, Col, Button, Form } from "react-bootstrap";

import { MdAdd, MdMonetizationOn } from "react-icons/md";
import PrintA4A5ExcelButton from "../../../components/PrintA4A5ExcelButton";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";
import axios from "axios";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const SalesStaffList = () => {
  const [paying_account_type, set_paying_account_type] = useState("");
  const [paying_account_id, set_paying_account_id] = useState("");
  const [columns_header, set_columns_header] = useState([]);
  const [columns_body, set_columns_body] = useState([]);
  const [footer_header, set_footer_header] = useState([]);
  const [footer_data, set_footer_data] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const { data, isLoading } = useSalesQuery();
  useEffect(() => {
    if (data?.data) {
      setTableData(data.data);
    }
  }, [data]);

  const [title, set_title] = useState({
    report_title: "",
    generated_by: "",
    date: "",
    filename: "",
  });

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "First Name.",
        accessor: "first_name",
      },

      {
        Header: "Last Name",
        accessor: "last_name",
      },

      {
        Header: "Bales",
        accessor: "bales",
      },
      {
        Header: "Rate",
        accessor: "fixed_rate",
      },

      {
        Header: "Update Rate",
        accessor: "update_rate",
        Cell: ({ row }) => (
          <>
            <Link
              to={`/payroll/advancemanagement/newadvance/${row.original.staff_number}`}
            >
              <Button variant="outline-primary">
                <MdAddTask />
              </Button>
            </Link>
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Row>
        <Col>
          <p>*** Sales staff List*** </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="account_number">
            <Form.Control
              type="date"
              required
              placeholder="Start"
              value={""}
              onChange={""}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="account_number">
            <Form.Control
              type="date"
              required
              placeholder="End"
              value={""}
              onChange={""}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col xs={4}>
          <Button>Validate Bales Entries</Button>
        </Col>
      </Row>
      <DataTable columns={columns} data={tableData} />
    </>
  );
};
export default SalesStaffList;
