import React, { forwardRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Divider, Chip } from "@mui/material";

const SalesIncomeComp = forwardRef(({ header, body, footer }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        padding: 20,
        border: "1px solid black",
        position: "relative",
      }}
    >
      <style>
        {`
        @page {
          margin: 20mm 15mm;
          counter-reset: page 1;
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

        @media screen {
          .page-footer {
            display: none;
          }
        }
        `}
      </style>

      <div>
        <h3 style={{ textAlign: "center" }}>{header?.title}</h3>
        {header?.subTitle && (
          <p
            style={{
              textAlign: "center",
              marginBottom: "-5px",
              marginTop: "-5px",
            }}
          >
            {header?.subTitle}
          </p>
        )}
        {header?.description && (
          <p
            style={{
              textAlign: "center",
              marginTop: "-5px",
              marginBottom: "2px",
            }}
          >
            {header?.description}
          </p>
        )}
        {header?.address && (
          <p
            style={{ textAlign: "center", marginTop: "-5px", fontSize: "12px" }}
          >
            {header?.address} {header?.date}
          </p>
        )}
        {header?.address && (
          <p
            style={{
              textAlign: "center",
              marginTop: "-5px",
              fontSize: "12px",
              fontWeight: "900",
            }}
          >
            Date {header?.start} -{header?.end}
          </p>
        )}
      </div>
      <Divider textAlign="left">
        <Chip label="Summary" size="small" />
      </Divider>
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
                {header?.total_sales && (
                  <p>T.Sales:&nbsp; &nbsp; &nbsp;{header?.total_sales} </p>
                )}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                {header?.total_return && (
                  <p>T.Returns:&nbsp; &nbsp; &nbsp; {header?.total_return} </p>
                )}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                {!header?.variance && (
                  <p>N.Sales:&nbsp; &nbsp; &nbsp; {header?.variance} </p>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <br />
      <Divider textAlign="left">
        <Chip label="Sales" size="small" />
      </Divider>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr>
            {body?.columns.map((col, index) => (
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
          {body?.rows.map((row, rowIndex) => (
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
      <br />
      <Divider textAlign="left">
        <Chip label="Returns" size="small" />
      </Divider>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr>
            {body?.columns.map((col, index) => (
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
          {body?.rows.map((row, rowIndex) => (
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

      <div className="page-footer" />
    </div>
  );
});

export default SalesIncomeComp;
