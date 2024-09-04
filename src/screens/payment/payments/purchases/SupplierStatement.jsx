import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Statement from "../../../../components/print/Statement";
import PrintButton from "../../../../components/print/PrintButton";
import { useGetSupplierByIdQuery } from "../../../../slices/administration/suppliersApiSlice";

import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SupplierStatement = () => {
  const location = useLocation();
  const { statementData } = location.state || {}; // Destructure the passed state

  const { id } = useParams();
  const { data: supplier } = useGetSupplierByIdQuery(id);

  const componentRef = React.useRef();
  const [headers1, setHeaders1] = useState({
    title: "SUPPLIER STATEMENT",
    period: `FROM ${statementData?.period}`,
    type: "Supplier",
    name: statementData.customer,
  });
  const [headers2, setHeaders2] = useState({
    date: statementData?.date,
    title: "PRODUCTION REPORT",
    subTitle: "Novena Maize Miller LTD",
    description: "Dealers in: All types of cereals, Animal feeds",
    address: "P.O Box 238, Meru, Kenya",
  });
  const [sumarry, setSumarry] = useState({
    entry1: `Balance Brought Forward (BF)`,
    value1: `KES: ${statementData?.balancebf}`,
    entry2: `Total Debits (DR)`,
    value2: `KES: ${statementData?.debit}`,
    entry3: `Total Credits (CR)`,
    value3: `KES: ${statementData?.credit}`,

    entry4: `Net Balance (DR - CR  + BF)`,
    value4: `KES: ${statementData?.netb}`,
  });
  const [columns, setColumns] = useState(statementData?.columns || []);
  const [rows, setRows] = useState(statementData?.lines);

  const documentData = {
    header1: headers1,
    header2: headers2,
    sumarry: sumarry,
    body: {
      columns: columns,
      rows: rows,
    },
  };

  return (
    <div>
      <PrintButton componentRef={componentRef} />
      <Statement ref={componentRef} {...documentData} />
    </div>
  );
};

export default SupplierStatement;
