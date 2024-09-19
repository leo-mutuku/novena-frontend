import React, { forwardRef } from "react";
import { Row, Col } from "react-bootstrap";

const DeliveryNote = forwardRef(({ header, body, footer }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: "148mm", // A5 width
        height: "210mm", // A5 height
        boxSizing: "border-box",
        padding: "10mm", // Padding to ensure content is well-positioned within the page
        margin: "0 auto",
        position: "relative",
        fontFamily: "'Courier New', Courier, monospace",
        fontWeight: "bold",
        letterSpacing: "0px",
        overflow: "hidden", // Prevent overflow
      }}
    >
      <style>
        {`
        @page {
          size: A5 portrait;
          margin: 0; /* No margins */
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
            justify-content: flex-start;
            align-items: center;
            margin: auto;
            padding: 10mm; /* Adjust if necessary */
          }
        }
        `}
      </style>

      <div
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>{header.title}</h3>
        {header.subTitle && (
          <p
            style={{ fontSize: "14px", marginTop: "-5px", fontWeight: "bold" }}
          >
            {header.subTitle}
          </p>
        )}
        {header.description && (
          <p
            style={{ fontSize: "14px", marginTop: "-5px", fontWeight: "bold" }}
          >
            {header.description}
          </p>
        )}
        {header.address && (
          <p
            style={{ fontSize: "14px", marginTop: "-5px", fontWeight: "bold" }}
          >
            {header.address} | {header.pin} | {header.phone}
          </p>
        )}
        {header.invoice_number && (
          <p
            style={{
              fontSize: "12px",
              marginTop: "-10px",
              fontWeight: "bold",
            }}
          >
            INVOICE NO # {header.invoice_number}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "10px" }}>
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
          marginTop: "10px",
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
                Signature ...........................................
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
