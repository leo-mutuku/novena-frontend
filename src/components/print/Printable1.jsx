import React, { forwardRef } from "react";

const Printable1 = forwardRef(({ header, body, footer }, ref) => {
  return (
    <div ref={ref} style={{ padding: 20, border: "1px solid black" }}>
      <div>
        <h3 style={{ textAlign: "center" }}>{header.title}</h3>
        {header.subTitle && (
          <p
            style={{
              textAlign: "center",
              marginBottom: "-5px",
              marginTop: "-5px",
            }}
          >
            {header.subTitle}
          </p>
        )}
        {header.description && (
          <p style={{ textAlign: "center", marginTop: "-5px" }}>
            {header.description}
          </p>
        )}
      </div>

      <div
        style={{
          border: "1px solid black",
          padding: "8px",
          marginTop: "10px",
        }}
      >
        {header.date && <p>Date: {header.date}</p>}
        {header.deliveryNumber && <p>Del No: {header.deliveryNumber}</p>}
      </div>

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr>
            {body.columns.map((col, index) => (
              <th
                key={index}
                style={{ border: "1px solid black", padding: "8px" }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {footer && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <p>{footer}</p>
        </div>
      )}
    </div>
  );
});

export default Printable1;
