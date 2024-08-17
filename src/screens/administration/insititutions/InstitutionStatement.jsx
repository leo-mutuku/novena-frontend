import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Statement from "../../../components/print/Statement";
import PrintButton from "../../../components/print/PrintButton";
import {
  useGetAllProductionHeadersQuery,
  useProductionCertificateQuery,
} from "../../../slices/production/productionHeaderApiSlice";
import { useParams } from "react-router-dom";

const InstitutionStatement = () => {
  const { id } = useParams();
  const componentRef = React.useRef();
  const [headers1, setHeaders1] = useState({
    title: "INSTITUTION STATEMENT",
    period: "From 01/01/2024 to 31/12/2024",
    type: "Institution :",
    name: "John Doe",
  });
  const [headers2, setHeaders2] = useState({
    date: "08/08/2024",

    subTitle: "Novena Maize Miller LTD",
    description: "Dealers in: All types of cereals, Animal feeds",
    address: "P.O Box 238, Meru, Kenya",
  });
  const [sumarry, setSumarry] = useState({
    type: "Net Balance(Kshs.)",
    name: "KES 100,000",
  });
  const [columns, setColumns] = useState([
    "Date ",
    "Description",
    "Debit",
    "Credit",
    "Balance",
  ]);
  const [rows, setRows] = useState([
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
    ["Product B", "200 long long text text texts", "50", "60", "8000"],
  ]);

  const { data: reportName } = useProductionCertificateQuery(id);
  console.log(JSON.stringify(reportName?.data));

  const documentData = {
    header1: headers1,
    header2: headers2,
    sumarry: sumarry,
    body: {
      columns: columns,
      rows: rows,
    },
  };
  useEffect(() => {
    if (reportName?.data) {
      const { res2 } = reportName.data;

      setHeaders1((prevHeaders) => ({
        ...prevHeaders,
        date: "908765",
      }));

      setColumns(["Date ", "Description", "Debit", "Credit", "Balance(Ksh)"]);

      const updatedRows = res2.map((item) => [
        item.item_name,
        item.product_output,
      ]);
      setRows(updatedRows);

      // Update footer or any other data if needed
      // setFooter("Your custom footer");
    }
  }, [reportName]);

  return (
    <div>
      <PrintButton componentRef={componentRef} />
      <Statement ref={componentRef} {...documentData} />
    </div>
  );
};

export default InstitutionStatement;
