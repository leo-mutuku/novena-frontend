import React, { forwardRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Divider, Chip } from "@mui/material";

const Invoice = forwardRef(({ header, body, footer }, ref) => {
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
            style={{ textAlign: "center", marginTop: "-5px", fontSize: "12px" }}
          >
            {header.address} | {header.pin} | {header.phone}
          </p>
        )}
        {header.address && (
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
      {/* <Divider textAlign="left">
        <Chip label="Production Summary" size="small" />
      </Divider> */}
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
      <Divider textAlign="left">{/* <Chip label="" size="small" /> */}</Divider>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
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
      {/* <Divider textAlign="left">
        <Chip label="Pack House" size="small" />
      </Divider> */}
      {/* <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr>
            {body.columns1?.map((col, index) => (
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
          {body.rows1?.map((row, rowIndex) => (
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
      </table> */}

      {footer && (
        <>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <p style={{ fontSize: "12px" }}>
              <br />
              <b style={{}}>
                ** Invoices are due within one month. Failure to pay within this
                period will incur a 10% interest charge**
              </b>

              <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                Terms & Conditions apply
              </p>
            </p>
          </div>
        </>
      )}

      <div className="page-footer" />
    </div>
  );
});

export default Invoice;
