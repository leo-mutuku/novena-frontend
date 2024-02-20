import React from "react";
import { Button } from "react-bootstrap";
import { FaRegFileExcel } from "react-icons/fa6";
import { FaPrint } from "react-icons/fa6";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const data = [
  {
    account: "5KG Maize Flour",
    account_number: "1001",
    account_balance: 10000.0,
  },
  {
    account: "5KG Maize Flour",
    account_number: "1001",
    account_balance: 10000.0,
  },
  {
    account: "5KG Maize Flour",
    account_number: "1001",
    account_balance: 10000.0,
  },

  {
    account: "5KG Maize Flour",
    account_number: "1001",
    account_balance: 10000.0,
  },
  {
    account: "5KG Maize Flour",
    account_number: "1001",
    account_balance: 10000.0,
  },

  {
    account: "5KG Maize Flour",
    account_number: "1001",
    account_balance: 10000.0,
  },
  {
    account: "5KG Maize Flour",
    account_number: "1001",
    account_balance: 10000.0,
  },

  {
    account: "5KG Maize Flour",
    account_number: "1001",
    account_balance: 10000.0,
  },
  {
    account: "5KG Maize Flour",
    account_number: "1001",
    account_balance: 10000.0,
  },

  {
    account: "5KG Maize Flour",
    account_number: "1001",
    account_balance: 10000.0,
  },
  {
    account: "5KG Maize Flour",
    account_number: "1001",
    account_balance: 10000.0,
  },
  {
    account: "5KG Maize Flour",
    account_number: "1001",
    account_balance: 10000.0,
  },
  {
    account: "5KG Maize Flour",
    account_number: "1001",
    account_balance: 10000.0,
  },
];
const date = `14/02/2024 : 1:44pm`;

const PrintA4A5ExcelButton = () => {
  const handleExportExcel = () => {};
  const handlePrintA4 = () => {
    const doc = new jsPDF("p", "mm", [297, 210]);
    let y = 20;
    doc.setLineWidth(2);
    //A4 landscape
    // doc.text(70, 15, "Novena Maize Miller");
    // doc.text(70, 20, "Novena Maize Miller");

    //a4 Portrait
    doc.setFontSize(22);
    doc.setFont("times");
    doc.text(50, 25, "NOVENA MAIZE MILLERS LTD");
    doc.setFontSize(14);
    doc.text(80, 32, "Po Box 238 Meru");
    doc.setFontSize(12);
    doc.text(75, 37, `Date : ${date}`);
    autoTable(doc, { html: "#my-table" });
    autoTable(doc, { html: "#my-table" });
    autoTable(doc, { html: "#my-table" });
    autoTable(doc, { html: "#my-table" });
    autoTable(doc, { html: "#my-table" });
    doc.setFontSize(10);
    doc.text(12, 43, `# All Sales Accounts Balances`);
    doc.text(80, 43, `KRA PIN P63426847C`);
    doc.text(130, 43, `Generate By: Leonard Mutuku`);

    autoTable(doc, {
      theme: "grid",
      body: data,
      theme: "plain",
      columns: [
        { header: "Name", dataKey: "account" },
        { header: "Account No#", dataKey: "account_number" },
        { header: "Balance", dataKey: "account_balance" },
      ],
    });
    autoTable(doc, {
      theme: "grid",
      body: [{ total: "", ksh: "Ksh.", amount: 50000.0 }],
      theme: "plain",
      columns: [
        { header: "Total", dataKey: "total" },
        { header: "", dataKey: "ksh" },
        { header: "Amount", dataKey: "amount" },
      ],
    });

    // Sometimes you might have to call the default function on the export (for example in Deno)

    doc.save("sales.accounts.pdf");
  };
  const handlePrintA5 = () => {};

  return (
    <>
      <div className="d-flex flex-row-reverse bd-highlight  gap-2 ">
        <Button
          variant="light"
          className="p-1 bd-highlight"
          onClick={handleExportExcel}
        >
          {<FaRegFileExcel />} Export{" "}
        </Button>
        <Button
          variant="light"
          className="p-2 bd-highlight"
          onClick={handlePrintA4}
        >
          {<FaPrint />} Print A4
        </Button>
        <Button
          variant="light"
          className="p-2 bd-highlight"
          onClick={handlePrintA5}
        >
          {<FaPrint />} Print A5
        </Button>
      </div>
    </>
  );
};

export default PrintA4A5ExcelButton;
