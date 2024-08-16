import React, { forwardRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Divider, Chip } from "@mui/material";

const Statement = forwardRef(({ header, body, footer }, ref) => {
  return (
    <div ref={ref}>
      <style>
        {`
          @page {
            size: A4;
            margin: 20mm;
          }

          body {
            margin: 0;
          }

          .page-content {
            padding: 20px;
            position: relative;
            margin: 0.5rem;
          }
            @media print {
 
  .server-footer {
    display: none !important;
  }
}

          @media print {
            .page-break {
              page-break-before: always;
            }
          }
        `}
      </style>
      <div className="page-footer" />
      <div className="page-content">
        <Row>
          <Col>
            <div>
              {header.title && <p>{header.title}</p>}
              <p
                style={{
                  textAlign: "left",
                  marginBottom: "-5px",
                  marginTop: "-5px",
                }}
              >
                For the period of {header?.from} to {header?.to}
              </p>
              <p>Customer name</p>
            </div>
          </Col>
          <Col>
            <div>
              {header.date && (
                <p
                  style={{
                    textAlign: "right",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  Date: {header.date}
                </p>
              )}
              {header.subTitle && (
                <p
                  style={{
                    textAlign: "right",
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
                    textAlign: "right",
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
                    textAlign: "right",
                    marginTop: "-5px",
                    fontSize: "12px",
                  }}
                >
                  {header.address} {header.date}
                </p>
              )}
              {header.address && (
                <p
                  style={{
                    textAlign: "right",
                    marginTop: "-5px",
                    fontSize: "12px",
                    fontWeight: "900",
                  }}
                >
                  BATCH NO # {header.batch_number} - PROD NO #{" "}
                  {header.prod_number}
                </p>
              )}
            </div>
          </Col>
        </Row>

        <Divider textAlign="left">
          <Chip label="Summary" size="small" />
        </Divider>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px 8px 8px 8px",
            marginTop: "10px",
          }}
        >
          <Row>
            <Col>
              <Row>
                <Col>
                  <p>Net Balance(Ksh)&nbsp; &nbsp; &nbsp;</p>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  {header.variance && (
                    <p>VARIANCE:&nbsp; &nbsp; &nbsp; {header.variance} </p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <br />
        <Divider textAlign="left">
          <Chip label="Details" size="small" />
        </Divider>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
            marginBottom: "40px", // Added marginBottom to ensure no part of the table is hidden
          }}
        >
          <thead>
            <tr>
              {body.columns.map((col, index) => (
                <th
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    padding: "4px",
                    fontSize: "11px",
                  }}
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
                    style={{
                      border: "1px solid #ccc",
                      padding: "4px",
                      fontSize: "11px",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <br />

        <div className="page-footer" />
        <div className="page-break" />
      </div>
    </div>
  );
});

export default Statement;
