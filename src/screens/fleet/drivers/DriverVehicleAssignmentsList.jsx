import React from "react";
import DriverVehicleAssignDT from "./DriverVehicleAssignDT";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
<<<<<<< HEAD
import axios from "axios";

const DriverVehicleAssignmentsList = () => {
  const handleDownloadExcel = async () => {
    await axios({
      url: "http://localhost:3000/api/v1/reports/all/drivers/vehicle/excel", // Endpoint on your Node.js server
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
      link.setAttribute("download", "all-drivers-vehicle-assign-report.xlsx");
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
    });
  };

  const handleDownloadPDF = async () => {
    await axios({
      url: "http://localhost:3000/api/v1/reports/all/drivers/vehicle/pdf", // Endpoint on your Node.js server
      method: "GET",
      responseType: "blob", // Important: responseType 'blob' for binary data
    }).then((response) => {
      // Create a blob object from the binary data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-drivers-vehicle-assign-report.pdf");
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
    });
  };
=======

const DriverVehicleAssignmentsList = () => {
  const handleDownloadExcel = async () => {};

  const handleDownloadPDF = async () => {};
>>>>>>> 323f83bac067b87d558f81b2426cba6ae36c8c39

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
      <DriverVehicleAssignDT />
    </>
  );
};

export default DriverVehicleAssignmentsList;
