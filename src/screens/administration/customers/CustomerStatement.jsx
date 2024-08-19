import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Statement from "../../../components/print/Statement";
import PrintButton from "../../../components/print/PrintButton";
import { useGetCustomerByIdQuery } from "../../../slices/administration/customersApiSlice";
import {
  useGetAllProductionHeadersQuery,
  useProductionCertificateQuery,
} from "../../../slices/production/productionHeaderApiSlice";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CustomerStatement = () => {
  const location = useLocation();
  const { statementData } = location.state || {}; // Destructure the passed state

  console.log("Received data:", statementData); // Use console.log for easier debugging

  const { id } = useParams();

  const componentRef = React.useRef();
  const [headers1, setHeaders1] = useState({
    title: "CUSTOMER STATEMENT",
    period: `FROM ${statementData?.period}`,
    type: "Customer",
    name: statementData?.customer,
  });
  const [headers2, setHeaders2] = useState({
    date: statementData.date,
    title: "PRODUCTION REPORT",
    subTitle: "Novena Maize Miller LTD",
    description: "Dealers in: All types of cereals, Animal feeds",
    address: "P.O Box 238, Meru, Kenya",
  });
  const [sumarry, setSumarry] = useState({
    entry1: `Balance Brought Forward (BF)`,
    value1: `KES: ${statementData?.balancebf}`,
    entry2: `Total Debits (DR)`,
    value2: `KES: ${statementData?.totald}`,
    entry3: `Total Credits (CR)`,
    value3: `KES: ${statementData?.totalc}`,

    entry4: `Net Balance (DR - CR  + BF)`,
    value4: `KES: ${statementData?.netb}`,
  });
  const [columns, setColumns] = useState(statementData.columns || []);
  const [rows, setRows] = useState(statementData.lines);

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
    if (statementData && reportName?.data) {
      const { res2 } = reportName.data;

      // Assuming 'res2' or similar is used elsewhere; adjust accordingly
      // setHeaders1((prevHeaders) => ({
      //   ...prevHeaders,
      //   date: res2.someDateField, // Example, adjust based on your data structure
      // }));

      setSumarry((prev) => ({
        ...prev,
        name: ` KES: ${statementData.netb}`,
      }));

      setColumns(["Date", "Description", "Debit", "Credit", "Balance(Ksh)"]);
    }
  }, [statementData, reportName?.data]); // Adjust dependencies

  return (
    <div>
      <PrintButton componentRef={componentRef} />
      <Statement ref={componentRef} {...documentData} />
    </div>
  );
};

export default CustomerStatement;
