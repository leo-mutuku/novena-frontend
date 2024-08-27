import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPrint } from "react-icons/fa6";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const A4 = () => {
  return (
    <Button variant="light" className="p-2 bd-highlight">
      {<FaPrint />} PDF A4
    </Button>
  );
};
export const handlePrintA4 = (e) => {
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
