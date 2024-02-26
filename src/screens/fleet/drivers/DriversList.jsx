import React from "react";
import DriverDataTable from "./DriverDataTable";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import TestDT from "./DriverDataTable";

const DriversList = () => {
  const handleDownloadPDF = async () => {
    await axios({
      url: "http://localhost:3000/api/v1/reports/all/drivers/pdf", // Endpoint on your Node.js server
      method: "GET",
      responseType: "blob", // Important: responseType 'blob' for binary data
    }).then((response) => {
      // Create a blob object from the binary data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-drivers-report.pdf");
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
    });
  };
  const handleDownloadExcel = async () => {
    await axios({
      url: "http://localhost:3000/api/v1/reports/all/drivers/excel", // Endpoint on your Node.js server
      method: "GET",
      responseType: "blob", // Important: responseType 'blob' for binary data
    }).then((response) => {
      // Create a blob object from the binary data
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-drivers-report.xlsx");
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
    });
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ marginLeft: "10px" }}>
          <button onClick={handleDownloadPDF}>
            <FontAwesomeIcon icon={faFilePdf} />
          </button>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <button onClick={handleDownloadExcel}>
            <FontAwesomeIcon icon={faFileExcel} />
          </button>
        </div>
      </div>
      <DriverDataTable />
    </>
  );
};

export default DriversList;
