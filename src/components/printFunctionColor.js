import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const date = `14/02/2024 : 1:44pm`;
export const handlePrintA4Color = (
  columns,
  data,
  footer_header,
  footer_body
) => {
  const doc = new jsPDF("p", "mm", [219, 210]);

  doc.setLineWidth(2);

  doc.setFontSize(22);
  doc.setFont("times");
  doc.text(40, 27, "NOVENA MAIZE MILLERS LTD");
  doc.setFontSize(12);
  doc.text(75, 32, "Po Box 238 Meru");
  doc.setFontSize(12);
  doc.text(70, 37, `Date : ${date}`);

  autoTable(doc, {
    theme: "grid",
    html: "#my-table",
  });
  autoTable(doc, { html: "#my-table" });
  autoTable(doc, { html: "#my-table" });
  autoTable(doc, { html: "#my-table" });
  autoTable(doc, { html: "#my-table" });
  doc.setFontSize(10);
  doc.text(12, 43, `# All Sales Accounts Balances`);
  doc.text(80, 43, `KRA PIN P63426847C`);
  doc.text(130, 43, `Generate By: Leonard Mutuku`);

  autoTable(doc, {
    body: data,
    columns: columns,
  });
  autoTable(doc, {
    body: footer_body,

    columns: footer_header,
  });

  doc.save("sales.accounts.pdf");
};
