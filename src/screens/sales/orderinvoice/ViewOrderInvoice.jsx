import React from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import InvoiceComponent from "../../../components/print/InvoiceComponent";

function ViewOrderInvoice() {
  const { id } = useParams();
  return <div>ViewOrderInvoice</div>;
}

export default ViewOrderInvoice;
