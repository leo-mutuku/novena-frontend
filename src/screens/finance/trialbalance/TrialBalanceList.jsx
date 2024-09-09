import React, { useState, useEffect, useMemo } from "react";
import { useSalesIncomeMutation } from "../../../slices/finance/accountsApiSlice";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllGLAccountsQuery } from "../../../slices/finance/glApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPrint } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";

import { CiEdit } from "react-icons/ci";
import PrintA4A5ExcelButton from "../../../components/PrintA4A5ExcelButton";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";
import axios from "axios";
import { Row, Col, Form } from "react-bootstrap";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SalesIncomeComp from "../../../components/print/SalesIncomeComp";
import PrintButton from "../../../components/print/PrintButton";
import { toast } from "react-toastify";

const TrialBalanceList = () => {
  const componentRef = React.useRef();
  const [columns_header, set_columns_header] = useState([]);
  const [columns_body, set_columns_body] = useState([]);
  const [footer_header, set_footer_header] = useState([]);
  const [footer_data, set_footer_data] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const { data, isLoading } = useGetAllGLAccountsQuery();
  const [getSalesIncome, { isLoading: isSalesIncomeLoading }] =
    useSalesIncomeMutation();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  const [headers, setHeaders] = useState({
    title: "SALES INCOME / REVENUE ",
    subTitle: "Novena Maize Miller LTD",
    description: "Dealers in: All types of cereals, Animal feeds",
    address: "P.O Box 238, Meru, Kenya",
    start: startDate,
    end: endDate,
    batch_number: "",
    deliveryNumber: "10301",
    total_sales: 0,
    total_return: 0,
    net_sales: 0,
    input: 0,
    output: 0,
    expected: 0,
    variance: 0,
  });
  const [columns, setColumns] = useState(["Product", "Quantity"]);
  const [rows, setRows] = useState([
    ["Product B", "200"],
    ["Product C", "150"],
    ["Product A", "100"],
    ["Product B", "200"],
    ["Product C", "150"],
  ]);

  const [columns1, setColumns1] = useState(["Product", "Quantity"]);
  const [rows1, setRows1] = useState([
    ["Product B", "200"],
    ["Product C", "150"],
    ["Product A", "100"],
    ["Product B", "200"],
    ["Product C", "150"],
  ]);
  const [footer, setFooter] = useState(
    "Your Satisfaction is our number one priority!"
  );

  const body = {
    columns: columns,
    rows: rows,
    columns1: columns1,
    rows1: rows1,
  };
  const documentData = {
    header: headers,
    body: {
      columns: columns,
      rows: rows,
      columns1: columns1,
      rows1: rows1,
    },
    footer: footer,
  };

  const handLoadBtn = async () => {
    try {
      const response = await getSalesIncome({
        startDate: startDate,
        endDate: endDate,
      }).unwrap();

      if (response?.status == "success") {
        alert(JSON.stringify(response?.data));
        setHeaders({
          ...headers,
          start: startDate,
          end: endDate,
          total_sales: response?.data?.sales_total,
          total_return: response?.data?.returns_total,
          net_sales: response?.data?.net_total,
        });
      } else {
      }
    } catch (error) {
      toast.error(error.data.message || "Something went wrong");
    }
  };

  return (
    <>
      <div>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="cash_account_id">
              <Form.Control
                type="date"
                required
                placeholder="cash_account_id"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="cash_account_id">
              <Form.Control
                type="date"
                required
                placeholder="cash_account_id"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button
              style={{ marginTop: "10px" }}
              variant="primary"
              onClick={handLoadBtn}
            >
              Load
            </Button>
          </Col>
        </Row>
      </div>
      <PrintButton componentRef={componentRef} {...documentData} />
      <SalesIncomeComp header={headers} body={body} footer={footer} />
    </>
  );
};
export default TrialBalanceList;
