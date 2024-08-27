import React, { useState, useEffect, useMemo } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllpackHousestaffPayrollSetupQuery } from "../../../slices/payroll/payrollSetupApiSlice";
import { useCalculateWageMutation } from "../../../slices/production/packHousePeopleApiSlice";
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
import { toast } from "react-toastify";

const PackhouseStaffList = () => {
  const [paying_account_type, set_paying_account_type] = useState("");
  const [paying_account_id, set_paying_account_id] = useState("");
  const [columns_header, set_columns_header] = useState([]);
  const [columns_body, set_columns_body] = useState([]);
  const [footer_header, set_footer_header] = useState([]);
  const [footer_data, set_footer_data] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const { data, isLoading } = useGetAllpackHousestaffPayrollSetupQuery();
  const [calculateWage] = useCalculateWageMutation();
  const [start_date, set_start_date] = useState("");
  const [end_date, set_end_date] = useState("");
  useEffect(() => {
    if (data?.data) {
      setTableData(data.data);
    }
  }, [data]);

  console.log(data);
  const [title, set_title] = useState({
    report_title: "",
    generated_by: "",
    date: "",
    filename: "",
  });

  const handleCalculateWage = async () => {
    try {
      if (!start_date || !end_date) {
        toast.error("Please select start and end date");
        return;
      }
      const payload = {
        start_date: start_date,
        end_date: end_date,
      };
      const response = await calculateWage(payload).unwrap();
      if (response.status == "success") {
        toast.success("Wages updated successfully");
      } else {
        toast.error("Sorry an error occurred please try again");
      }
    } catch (error) {
      toast.error(error?.data.message || error.message || "An error occurred");
    }
  };

  const handleDownloadPDF = async () => {
    setLoadingPdf(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/accounts/pdf`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-accounts-report.pdf");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    try {
      const response = await axios({
        url: `${baseUrlJasper}/all/accounts/excel`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-accounts-report.xlsx");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading Excel:", error);
    } finally {
      setLoadingExcel(false);
    }
  };

  const handlePrintA6 = (e) => {
    set_title({
      ...title,
      report_title: `Balance Statement for ${e.target.name} - GL Number ${e.target.id}`,
    });
    console.log(title);
    const doc = new jsPDF("p", "mm", "a4");
    doc.setLineWidth(2);
    //head
    doc.setFontSize(22);
    doc.setFont("times");
    doc.text(50, 25, "NOVENA MAIZE MILLERS LTD");
    doc.setFontSize(14);
    doc.text(80, 32, "Po Box 238 Meru");
    doc.setFontSize(12);
    doc.text(75, 37, `Date : ${title.date}`);
    autoTable(doc, { html: "#my-table" });
    autoTable(doc, { html: "#my-table" });
    autoTable(doc, { html: "#my-table" });
    autoTable(doc, { html: "#my-table" });
    autoTable(doc, { html: "#my-table" });
    doc.setFontSize(10);
    doc.text(12, 43, `# ${title.report_title}`);
    doc.text(80, 43, `KRA PIN P63426847C`);
    doc.text(130, 43, `Generate By: ${title.generated_by}`);

    //body
    autoTable(doc, {
      columnStyles: { europe: { halign: "center" } },
      columns: columns_header,
      body: columns_body,
    });
    //footer
    autoTable(doc, {
      columns: footer_header,
      body: footer_data,
    });

    doc.save(`${title.filename}.pdf`);
  };

  console.log();

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
        Header: "Gross Salary.",
        accessor: "gross_salary",
      },
      {
        Header: "Deductions",
        accessor: "other_deductions",
      },

      {
        Header: "Advance",
        accessor: "advance",
      },

      {
        Header: "Calculate",
        accessor: "advance_validated",
        Cell: ({ row }) => (
          <>
            {row.original.status !== "Generated" ? (
              <Link
                to={"#"} //`/payroll/advancemanagement/newadvance/${row.original.staff_number
              >
                <Button variant="outline-primary">
                  <MdAddTask />
                </Button>
              </Link>
            ) : (
              <p>{row.original.status}</p>
            )}
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Row>
        {" "}
        <Col>
          <p>*** Packhouse Staff List*** </p>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          {" "}
          <Form.Group className="my-2" controlId="amount">
            <Form.Control
              required
              type="date"
              placeholder="Description"
              value={start_date}
              onChange={(e) => set_start_date(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group className="my-2" controlId="amount">
            <Form.Control
              required
              type="date"
              placeholder="Description"
              value={end_date}
              onChange={(e) => set_end_date(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Button onClick={handleCalculateWage} variant="outline-primary">
            Calculate Weekly Entries
          </Button>
        </Col>
      </Row>
      <DataTable columns={columns} data={tableData} />
    </>
  );
};
export default PackhouseStaffList;
