import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeliveryNoteComponent from "../../../components/print/DeliveryNoteComponent";
import { useGetSalesLinesByHeaderIdQuery } from "../../../slices/sales/salesOrderLinesApiSlice";
import PrintButton from "../../../components/print/PrintButton";
import TimeDate from "../../../components/TimeDate";
const DeliveryNote = () => {
  const timeDate = new TimeDate();
  const { id } = useParams();
  const { data: order } = useGetSalesLinesByHeaderIdQuery(id);
  console.log(order);
  const componentRef = React.useRef();
  const [headers, setHeaders] = useState({
    title: "DELIVERY NOTE",
    subTitle: "Novena Maize Miller LTD",
    description: "Dealers in: All types of cereals, Animal feeds",
    address: "P.O Box 238, Meru, Kenya",
    pin: `P052132641M`,
    phone: "0720 830 830",
    date: "08/08/2024",
    batch_number: "",
    invoice_number: `${id}1`,
    order_number: `${id}`,
    delivery_number: `${id}0`,
    customer: "KCB Bank",
    input: 0,
    output: 0,
    expected: 0,
    variance: 0,
  });
  const [columns, setColumns] = useState(["Qty", "Description"]);
  const [rows, setRows] = useState([
    ["Product B", "200"],
    ["Product C", "150"],
    ["Product A", "100"],
    ["Product B", "200"],
    ["Product C", "150"],
  ]);
  const [columns1, setColumns1] = useState(["Product", "Quantity"]);
  const [rows1, setRows1] = useState([
    ["Product B", "200"],
    ["Product C", "150"],
    ["Product A", "100"],
    ["Product B", "200"],
    ["Product C", "150"],
  ]);
  const [footer, setFooter] = useState(
    "Receive the above goods in good order and condition"
  );
  useEffect(() => {
    if (order?.data) {
      // const { res1 } = order.data.order_header.entry_date;
      const { res2 } = order.data.order;

      setHeaders((prevHeaders) => ({
        ...prevHeaders,
        // date: order.data.order_header.entry_date,
        customer: order.data.order_header.customer,
        date: `${timeDate.date(order.data.order_header.sales_order_date)}`,
        // deliveryNumber: res1.production_batch_no,
        // batch_number: res1.batch_number,
        // input: res1.production_input,
        // output: res1.actual_output,
        // expected: res1.expected_output,
        // variance: res1.production_variance,
      }));
      setColumns(["Qty ", "Description"]);
      const updatedRows = order.data.order.map((item) => [
        item.quantity,
        item.item_name,
      ]);
      setRows(updatedRows);
      // setColumns1(["Product ", "Output"]);
      // const updatedRows1 = res3.map((item) => [
      //   item.item_name,
      //   item.number_packed,
      // ]);
      // setRows1(updatedRows1);
      // Update footer or any other data if needed
      // setFooter("Your custom footer");
    }
  }, [order]);
  const documentData = {
    header: headers,
    body: {
      columns: columns,
      rows: rows,
      columns1: columns1,
      rows1: rows1,
    },
    footer: footer,
  };
  return (
    <div>
      <DeliveryNoteComponent ref={componentRef} {...documentData} />
      <PrintButton componentRef={componentRef} />
    </div>
  );
};

export default DeliveryNote;
