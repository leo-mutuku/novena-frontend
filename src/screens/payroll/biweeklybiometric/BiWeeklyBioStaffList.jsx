import React, { useState, useEffect, useMemo } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import {
  useGetAllBiweeklyStaffQuery,
  useValidateStaffBiWeeklyRegisterMutation,
} from "../../../slices/administration/staffApiSlice";
import { useGetAllBankAccountsQuery } from "../../../slices/finance/bankAccountsApiSlice";
import { useGetAllCashAccountsQuery } from "../../../slices/finance/cashAccountApiSlice";
import { MdAddTask, MdEdit } from "react-icons/md";

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

const BiWeeklyBioStaffList = () => {
  const [paying_account_type, set_paying_account_type] = useState("");
  const [paying_account_id, set_paying_account_id] = useState("");
  const [columns_header, set_columns_header] = useState([]);
  const [columns_body, set_columns_body] = useState([]);
  const [footer_header, set_footer_header] = useState([]);
  const [footer_data, set_footer_data] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const { data, isLoading } = useGetAllBiweeklyStaffQuery();
  const [start_date, set_start_date] = useState("");
  const [end_date, set_end_date] = useState("");
  const [validateSatff] = useValidateStaffBiWeeklyRegisterMutation();
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

  const hanldeValidateStaff = async () => {
    try {
      const res = await validateSatff({
        start_date,
        end_date,
      }).unwrap();
      if (res.status == "success") {
        toast.success("Validated successfully");
      } else {
        toast.error("An error occured");
      }
    } catch (error) {
      toast.error(error?.data.messages || "An error occured");
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
        Header: "Staff No.",
        accessor: "staff_number",
      },
      {
        Header: "Days",
        accessor: "days_attended",
      },

      { Header: "Rate", accessor: "fixed_rate" },
      // {
      //   Header: "Vadidate",
      //   accessor: "advance_validated",
      //   Cell: ({ row }) => (
      //     <>
      //       {row.original.status !== "Generated" ? (
      //         <Link
      //           to={`/payroll/advancemanagement/newadvance/${row.original.staff_number}`}
      //         >
      //           <Button variant="outline-primary">
      //             <MdAddTask />
      //           </Button>
      //         </Link>
      //       ) : (
      //         <p>{row.original.status}</p>
      //       )}
      //     </>
      //   ),
      // },

      {
        Header: "Edit",
        accessor: "Edit",
        Cell: ({ row }) => (
          <>
            {row.original.status !== "Generated" ? (
              <Link
                to={`/payroll/biweeklybiometric/editbiweeklybiometric/${row.original.staff_number}`}
              >
                <Button variant="outline-primary">
                  <MdEdit />
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
        <p>*** Bi-Week Biometric Entries*** </p>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="account_number">
            <Form.Control
              type="date"
              required
              placeholder="Start"
              value={start_date}
              onChange={(e) => set_start_date(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="account_number">
            <Form.Control
              type="date"
              required
              placeholder="End"
              value={end_date}
              onChange={(e) => set_end_date(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col xs={3}>
          <Button onClick={hanldeValidateStaff}>
            Validate BiWeekly Biometric
          </Button>
        </Col>
      </Row>
      <DataTable columns={columns} data={tableData} />
    </>
  );
};
export default BiWeeklyBioStaffList;
