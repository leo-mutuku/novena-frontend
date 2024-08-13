import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeliveryNoteComponent from "../../../components/print/DeliveryNoteComponent";
import PrintButton from "../../../components/print/PrintButton";
const DeliveryNote = () => {
  const { id } = useParams();
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
