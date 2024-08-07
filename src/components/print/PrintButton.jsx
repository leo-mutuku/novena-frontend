import React from "react";
import ReactToPrint from "react-to-print";

const PrintButton = ({ componentRef }) => (
  <ReactToPrint
    trigger={() => <button>Print this out!</button>}
    content={() => componentRef.current}
  />
);

export default PrintButton;
