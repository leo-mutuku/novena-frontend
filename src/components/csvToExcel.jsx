import React, { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const CSVToExcel = ({ data }) => {
  const [data, setData] = useState([]);

  const csvTextFunction = async (data) => {
    try {
      const csvText = await data.text();

      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          setData(results.data);
          console.log(results.data);
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "data.xlsx");
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={downloadExcel} disabled={!data.length}>
        Download Excel
      </button>
    </div>
  );
};

export default CSVToExcel;
