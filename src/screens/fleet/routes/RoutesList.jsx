import React from "react";
import RoutesDT from "./RoutesDT";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
const RoutesList = () => {
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
      <RoutesDT />
    </>
  );
};

export default RoutesList;
