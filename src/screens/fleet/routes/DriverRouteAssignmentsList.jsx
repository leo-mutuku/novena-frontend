import React from "react";
import DriverRouteAssignDT from "./DriverRouteAssignDT";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

const DriverRouteAssignmentsList = () => {
  const handleDownloadExcel = async () => {};

  const handleDownloadPDF = async () => {};
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ marginLeft: "10px" }}>
          <button onClick={handleDownloadPDF}>
            <FaFilePdf />
          </button>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <button onClick={handleDownloadExcel}>
            <FaFileExcel />
          </button>
        </div>
      </div>
      <DriverRouteAssignDT />
    </>
  );
};

export default DriverRouteAssignmentsList;
