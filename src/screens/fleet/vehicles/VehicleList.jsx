import React, { useState } from "react";
import VehiclesDT from "./VehiclesDT";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import axios from "axios";
import { baseUrlJasper } from "../../../slices/baseURLJasperReports";
import Loader from "../../../components/Loader";

const VehicleList = () => {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  const handleDownloadPDF = async () => {
    setLoadingPdf(true);
    try {
      await axios({
        url: `${baseUrlJasper}/all/vehicles/pdf`, // Endpoint on your Node.js server
        method: "GET",
        responseType: "blob", // Important: responseType 'blob' for binary data
      }).then((response) => {
        // Create a blob object from the binary data
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Create a link element to trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "all-vehicles-report.pdf");
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
  const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    try {
      await axios({
        url: `${baseUrlJasper}/all/vehicles/excel`, // Endpoint on your Node.js server
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
        link.setAttribute("download", "all-vehicles-report.xlsx");
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
  return (
    <>
      <p>*** All Vehicles ***</p>

      <VehiclesDT />
    </>
  );
};

export default VehicleList;
