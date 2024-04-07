import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const handlePrintA4 = (payrollHeader, getlistOfStaffId) => {
  const date = ` ${payrollHeader.end_date}`;
  const dataa = getlistOfStaffId;
  const footer_header = [
    { header: "Total Gross Pay", datakey: "gross_pay" },
    { header: "Total Net Pay", datakey: "net_pay" },
    { header: "Total Deductions", datakey: "total_deductions" },
  ];
  let total_gross_pay = payrollHeader.gross_pay;
  const footer_body = [{ gross_pay: total_gross_pay }];
  const doc = new jsPDF("p", "mm", [219, 210]);

  doc.setLineWidth(2);
  //A4 landscape
  // doc.text(70, 15, "Novena Maize Miller");
  // doc.text(70, 20, "Novena Maize Miller");

  //a4 Portrait
  doc.setFontSize(17);
  doc.setFont("times");
  doc.text(55, 27, "NOVENA MAIZE MILLERS LTD");
  doc.setFontSize(12);
  doc.text(80, 32, "Po Box 238 Meru");
  doc.setFontSize(12);
  doc.text(75, 37, `Date : ${date}`);
  autoTable(doc, { html: "#my-table" });
  autoTable(doc, { html: "#my-table" });
  autoTable(doc, { html: "#my-table" });
  autoTable(doc, { html: "#my-table" });
  autoTable(doc, { html: "#my-table" });
  doc.setFontSize(10);
  doc.text(12, 43, `# Payslips`);
  doc.text(85, 43, `KRA PIN P63426847C`);

  autoTable(doc, {
    theme: "grid",
    body: dataa,
    theme: "plain",
    columns: [
      { header: "First Name", dataKey: "first_name" },
      { header: "Last Name", dataKey: "last_name" },
      { header: "Gross Pay", dataKey: "gross_pay" },
      { header: "Net Pay", dataKey: "net_pay" },
      { header: "Deductions", dataKey: "total_deductions" },
      { header: "NHIF", dataKey: "nhif" },
      { header: "NSSF", dataKey: "nssf" },
      { header: "PAYE", dataKey: "paye" },
      { header: "SACCO", dataKey: "sacco" },
    ],
  });
  autoTable(doc, {
    theme: "grid",
    body: footer_body,
    theme: "plain",
    columns: footer_header,
  });

  // Sometimes you might have to call the default function on the export (for example in Deno)

  doc.save("payslip.combined.pdf");
};
