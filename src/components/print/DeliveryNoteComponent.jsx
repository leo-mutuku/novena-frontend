import React, { forwardRef } from "react";
import { Row, Col } from "react-bootstrap";

const DeliveryNote = forwardRef(({ header, body, footer }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: "120mm", // Custom width, narrower than half A4 in portrait
        minHeight: "130mm", // Half height of A4
        boxSizing: "border-box",
        padding: "3px",
        margin: "0 auto", // Center the content horizontally
        position: "relative", // Relative positioning for positioning the content
        fontFamily: "'Courier New', Courier, monospace", // Use Courier New for dot matrix printers
        fontWeight: "bold", // Make text bold
        letterSpacing: "0px", // No extra letter spacing for a clean appearance
      }}
    >
      <style>
        {`
        @page {
          size: auto;
          margin: 0;
        }

        body {
          margin: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-start; /* Align content to the top */
          align-items: center;
        }

        @media print {
          body, html {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }

          .page {
            display: flex;
            flex-direction: column;
            justify-content: flex-start; /* Align content to the top */
            align-items: center;
            margin: auto;
            padding-top: 10mm; /* Adjust this value if needed */
          }
        }
        `}
      </style>

      <div
        style={{
          textAlign: "center",
          marginBottom: "3px",
          marginTop: "15px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>{header.title}</h3>
        {header.subTitle && (
          <p
            style={{ fontSize: "14px", marginTop: "-10px", fontWeight: "bold" }}
          >
            {header.subTitle}
          </p>
        )}
        {header.description && (
          <p
            style={{ fontSize: "14px", marginTop: "-10px", fontWeight: "bold" }}
          >
            {header.description}
          </p>
        )}
        {header.address && (
          <p
            style={{ fontSize: "14px", marginTop: "-10px", fontWeight: "bold" }}
          >
            {header.address} | {header.pin} | {header.phone}
          </p>
        )}
        {header.invoice_number && (
          <p
            style={{
              fontSize: "12px",
              marginTop: "-15px",
              fontWeight: "bold",
            }}
          >
            INVOICE NO # {header.invoice_number}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "3px" }}>
        <Row>
          <Col>
            {header.customer && (
              <p
                style={{
                  textDecoration: "underline",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                M/S.:&nbsp;&nbsp;&nbsp;{header.customer}
              </p>
            )}
          </Col>
          <Col>
            {header.delivery_number && (
              <>
                <p
                  style={{
                    textDecoration: "underline",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Del No.:&nbsp;&nbsp;&nbsp;{header.delivery_number}
                </p>
                <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Date.:&nbsp;&nbsp;&nbsp;{header.date}
                </p>
              </>
            )}
          </Col>
        </Row>
      </div>

      <table
        style={{
          fontSize: "12px",
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "3px",
        }}
      >
        <thead>
          <tr>
            {body.columns?.map((col, index) => (
              <th
                key={index}
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  fontWeight: "bold",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.rows?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    fontWeight: "bold",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {footer && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <p
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            {footer}
          </p>
          <Row>
            <Col>
              <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                Received by .........................................
              </p>
            </Col>
            <Col>
              <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                Signature ..........................................
              </p>
              <span
                style={{
                  fontSize: "12px",
                  marginTop: "-10px",
                  fontWeight: "bold",
                }}
              >
                Official Rubber stamp
              </span>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
});

export default DeliveryNote;
