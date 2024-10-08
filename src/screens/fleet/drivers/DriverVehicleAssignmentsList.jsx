import React, { useState } from "react";
import DriverVehicleAssignDT from "./DriverVehicleAssignDT";
import axios from "axios";
import DriverDataTable from "./DriverDataTable";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";

const DriverVehicleAssignmentsList = () => {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    try {
      await axios({
        url: `${baseUrlJasper}/all/drivers/vehicle/excel`, // Endpoint on your Node.js server
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
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingExcel(false);
    }
  };

  const handleDownloadPDF = async () => {
    setLoadingPdf(true);
    try {
      await axios({
        url: `${baseUrlJasper}/all/drivers/vehicle/pdf`, // Endpoint on your Node.js server
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
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingPdf(false);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ marginLeft: "10px" }}>
          <button onClick={handleDownloadPDF} disabled={loadingPdf}>
            {loadingPdf ? <Loader /> : <FaFilePdf />}
          </button>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <button onClick={handleDownloadExcel} disabled={loadingExcel}>
            {loadingExcel ? <Loader /> : <FaFileExcel />}
          </button>
        </div>
      </div>
      <DriverVehicleAssignDT />
    </>
  );
};

export default DriverVehicleAssignmentsList;
