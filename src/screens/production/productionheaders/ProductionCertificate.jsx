import React from "react";
import Printable from "../../../components/print/Printable1";
import PrintButton from "../../../components/print/PrintButton";

const ProductionCertificate = () => {
  const componentRef = React.useRef();

  const documentData = {
    header: {
      title: "PRODUCTION REPORT",
      subTitle: "Novena Maize Miller LTD",
      description: "Dealers in All Types of Animal Feeds , Maize Mill",
      date: "08/08/2024",
      deliveryNumber: "10301",
    },
    body: {
      columns: ["Product", "Quantity"],
      rows: [
        ["Product B", "200"],
        ["Product C", "150"],
        ["Product A", "100"],
        ["Product B", "200"],
        ["Product C", "150"],
      ],
    },
    footer: "Thank you for your business!",
  };

  return (
    <div>
      <Printable ref={componentRef} {...documentData} />
      <PrintButton componentRef={componentRef} />
    </div>
  );
};

export default ProductionCertificate;
