import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import TimeDate from "./TimeDate";

export const handlePrintA4 = (payrollHeader, getlistOfStaffId) => {
  console.log(payrollHeader, getlistOfStaffId);
  const timeDate = new TimeDate();
  const date = timeDate.date(payrollHeader.end_date);
  const startdate = timeDate.date(payrollHeader.start_date);
  let gross_pay = payrollHeader.gross_pay;

  const dataa = getlistOfStaffId;
  const footer_header = [
    { header: "Gross Pay", datakey: gross_pay },
    { header: "Net Pay", datakey: payrollHeader.net_pay },
    { header: "Total Deductions", datakey: payrollHeader.total_deductions },
  ];
  let total_gross_pay = payrollHeader.gross_pay;
  const footer_body = [
    {
      gross_pay: payrollHeader.gross_pay,
      net_pay: payrollHeader.net_pay,
      total_deductions: payrollHeader.total_deductions,
    },
  ];
  const doc = new jsPDF("p", "mm", [219, 210]);

  doc.setLineWidth(2);
  //A4 landscape
  // doc.text(70, 15, "Novena Maize Miller");
  // doc.text(70, 20, "Novena Maize Miller");

  //a4 Portrait
  doc.setFontSize(17);
  doc.setFont("times");
  doc.text(65, 27, "NOVENA MAIZE MILLERS LTD");
  doc.setFontSize(12);
  doc.text(85, 32, "Po Box 238 Meru");
  doc.setFontSize(12);
  doc.text(75, 37, `Date :${startdate} - ${date} `);
  autoTable(doc, { html: "#my-table" });
  autoTable(doc, { html: "#my-table" });
  autoTable(doc, { html: "#my-table" });
  autoTable(doc, { html: "#my-table" });
  autoTable(doc, { html: "#my-table" });
  doc.setFontSize(10);

  doc.text(85, 43, `KRA PIN P63426847C`);
  doc.text(12, 48, ` Payroll no. - ${payrollHeader.payroll_no}`);

  autoTable(doc, {
    theme: "grid",
    body: dataa,
    theme: "plain",
    columns: [
      { header: "First Name", dataKey: "first_name" },
      { header: "Last Name", dataKey: "last_name" },
      { header: "Gross Pay", dataKey: "gross_pay" },
      { header: "NHIF", dataKey: "nhif" },
      { header: "NSSF", dataKey: "nssf" },
      { header: "PAYE", dataKey: "paye" },
      { header: "SACCO", dataKey: "sacco" },
      { header: "Other. Dctns", dataKey: "other_deductions" },
      { header: "Ttl. Dctns", dataKey: "total_deductions" },
      { header: "Net Pay", dataKey: "net_pay" },
    ],
  });
  autoTable(doc, {
    theme: "grid",
    body: footer_body,
    columns: [
      { header: "Gross Pay", dataKey: "gross_pay" },
      { header: "Net Pay", dataKey: "net_pay" },
      { header: "Total Deductions", dataKey: "total_deductions" },
    ],
    theme: "plain",
  });

  // Sometimes you might have to call the default function on the export (for example in Deno)

  doc.save(`payroll-${payrollHeader.payroll_no}.pdf`);
};
