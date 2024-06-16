import React, { useState } from "react";
import Papa from "papaparse";
// import { saveAs } from "file-saver";

const exportToCsv = (csvData, fileName) => {
  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  // saveAs(blob, `${fileName}.csv`);
};

export default exportToCsv;
