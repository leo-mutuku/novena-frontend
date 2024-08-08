import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Printable from "../../../components/print/Printable1";
import PrintButton from "../../../components/print/PrintButton";
import {
  useGetAllProductionHeadersQuery,
  useProductionCertificateQuery,
} from "../../../slices/production/productionHeaderApiSlice";
import { useParams } from "react-router-dom";

const ProductionCertificate = () => {
  const { id } = useParams();
  const componentRef = React.useRef();
  const [headers, setHeaders] = useState({
    title: "PRODUCTION REPORT",
    subTitle: "Novena Maize Miller LTD",
    description: "Dealers in All Types of Animal Feeds , Maize Mill",
    date: "08/08/2024",
    deliveryNumber: "10301",
  });
  const [columns, setColumns] = useState(["Product", "Quantity"]);
  const [rows, setRows] = useState([
    ["Product B", "200"],
    ["Product C", "150"],
    ["Product A", "100"],
    ["Product B", "200"],
    ["Product C", "150"],
  ]);
  const [footer, setFooter] = useState("Thank you for your business!");

  const { data: productionReport } = useProductionCertificateQuery(id);
  console.log(JSON.stringify(productionReport?.data));

  const documentData = {
    header: headers,
    body: {
      columns: columns,
      rows: rows,
    },
    footer: footer,
  };
  useEffect(() => {
    if (productionReport?.data) {
      const { res1, res2 } = productionReport.data;

      setHeaders((prevHeaders) => ({
        ...prevHeaders,
        date: res1.production_date,
        deliveryNumber: res1.production_batch_no,
      }));

      setColumns(["Product Code", "Output"]);

      const updatedRows = res2.map((item) => [
        item.product_code,
        item.product_output,
      ]);
      setRows(updatedRows);

      // Update footer or any other data if needed
      // setFooter("Your custom footer");
    }
  }, [productionReport]);

  return (
    <div>
      <Printable ref={componentRef} {...documentData} />
      <PrintButton componentRef={componentRef} />
    </div>
  );
};

export default ProductionCertificate;
