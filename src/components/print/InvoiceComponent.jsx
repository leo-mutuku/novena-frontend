import React, { forwardRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Divider } from "@mui/material";

const Invoice = forwardRef(({ header, body, footer }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        padding: 20,
        border: "1px solid black",
        width: "148mm", // A5 width
        height: "210mm", // A5 height
        boxSizing: "border-box",
        margin: "0", // Reset any automatic margins
        position: "relative", // Changed to relative for better control
      }}
    >
      <style>
        {`
        @page {
          size: A5 portrait; /* Set to A5 portrait */
          margin: 0; /* No margins */
          counter-reset: page 1;
        }

        @media print {
          body {
            margin: 0; /* Ensure no margin on body */
          }
          .page-footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 12px;
            color: grey;
          }

          .page-footer::after {
            content: "Page " counter(page);
          }

          @page {
            margin: 0; /* Ensure no margins on print */
          }

          .invoice-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 148mm;
            height: 210mm;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid black;
          }
        }

        @media screen {
          .page-footer {
            display: none;
          }
        }
        `}
      </style>

      <div className="invoice-container">
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
            <p
              style={{
                textAlign: "center",
                marginTop: "-5px",
                marginBottom: "2px",
              }}
            >
              {header.description}
            </p>
          )}
          {header.address && (
            <p
              style={{
                textAlign: "center",
                marginTop: "-5px",
                fontSize: "12px",
              }}
            >
              {header.address} | {header.pin} | {header.phone}
            </p>
          )}
          {header.delivery_number && (
            <p
              style={{
                textAlign: "center",
                marginTop: "-5px",
                fontSize: "12px",
                fontWeight: "900",
              }}
            >
              DELIVERY NUMBER# {header.delivery_number}
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
          <Row>
            <Col>
              <Row>
                <Col>
                  {header.delivery_number && (
                    <>
                      <p style={{ textDecoration: "underline" }}>
                        M/S.:&nbsp; &nbsp; &nbsp;{header.customer}{" "}
                      </p>
                    </>
                  )}
                </Col>

                <Col>
                  {header.invoice_number && (
                    <>
                      <p
                        style={{
                          textDecoration: "underline",
                          marginBottom: "-3px",
                        }}
                      >
                        INVOICE NO.:&nbsp; &nbsp; &nbsp;{header.invoice_number}{" "}
                      </p>
                      <p style={{ marginBottom: "-5px", marginTop: "-5px" }}>
                        Date.:&nbsp; &nbsp; &nbsp;{header.date}{" "}
                      </p>
                    </>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <br />
        <Divider textAlign="left">
          {/* <Chip label="" size="small" /> */}
        </Divider>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              {body.rows.length &&
                body.columns?.map((col, index) => (
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
            {body.rows.length &&
              body.rows?.map((row, rowIndex) => (
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
          <thead>
            <tr>
              {body.rows.length &&
                body.columns1?.map((col, index) => (
                  <th
                    key={index}
                    style={{ border: "1px solid black", padding: "8px" }}
                  >
                    {col}
                  </th>
                ))}
            </tr>
          </thead>
        </table>
        <br />

        {footer && (
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <p style={{ fontSize: "12px" }}>
              <br />
              <b>
                ** Invoices are due within one month. Failure to pay within this
                period will incur a 10% interest charge**
              </b>
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                Terms & Conditions apply
              </p>
            </p>
          </div>
        )}

        <div className="page-footer" />
      </div>
    </div>
  );
});

export default Invoice;
