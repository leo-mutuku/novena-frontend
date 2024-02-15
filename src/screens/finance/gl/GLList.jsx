import React, { useState } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllGLAccountsQuery } from "../../../slices/finance/glApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPrint } from "react-icons/fa6";

import { CiEdit } from "react-icons/ci";
import PrintA4A5ExcelButton from "../../../components/PrintA4A5ExcelButton";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AccountsList = () => {
  const { data, isLoading } = useGetAllGLAccountsQuery();
  const [title, set_title] = useState({
    report_title: "",
    generated_by: "",
    date: "",
    filename: "",
  });
  const [columns_header, set_columns_header] = useState([]);
  const [columns_body, set_columns_body] = useState([]);
  const [footer_header, set_footer_header] = useState([]);
  const [footer_data, set_footer_data] = useState([]);

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

  return (
    <>
      <p>*** All GL ***</p>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Gl Name</th>
            <th>Gl Number</th>
            <th>Edit</th>
            <th>Pdf A4</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>
                <Loader />
              </td>
            </tr>
          ) : (
            data?.data.map((item, index) => (
              <tr key={item.gl_id}>
                <td>{index + 1}</td>
                <td>{item.gl_name}</td>
                <td>{item.gl_number}</td>

                <td>
                  <Link to={`/finance/gl/updategl/${parseInt(item.gl_id)}`}>
                    <CiEdit />
                  </Link>
                </td>
                <td>
                  <Button
                    variant="light"
                    id={item.gl_number}
                    name={item.gl_name}
                    className="p-2 bd-highlight"
                    onClick={handlePrintA6}
                  >
                    {<FaPrint />} PDF A4
                  </Button>
                </td>
                <td>{<PrintA4A5ExcelButton />}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};
export default AccountsList;
