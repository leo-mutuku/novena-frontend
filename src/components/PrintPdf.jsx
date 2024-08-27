import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Sample component to be printed
const PrintComponent = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ padding: 20 }}>
    <h1>Monthly Product Analysis</h1>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Sales</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Product A</td>
          <td>100</td>
        </tr>
        <tr>
          <td>Product B</td>
          <td>200</td>
        </tr>
        <tr>
          <td>Product C</td>
          <td>150</td>
        </tr>
      </tbody>
    </table>
  </div>
));

export default PrintComponent;
