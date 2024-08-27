import React from "react";
import { Row, Col } from "react-bootstrap";
import { Divider, Chip } from "@mui/material";
import { Table } from "../../../components/general/DataTable"; // Assuming DataTable component

const CashBookReport = ({ header, body, footer }) => {
  return (
    <div style={{ padding: 20, border: "1px solid black" }}>
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
        {header.companyName && (
          <p
            style={{
              textAlign: "center",
              marginBottom: "-5px",
              marginTop: "-5px",
            }}
          >
            {header.companyName}
          </p>
        )}
        {header.period && (
          <p
            style={{
              textAlign: "center",
              marginTop: "-5px",
              marginBottom: "2px",
            }}
          >
            Period: {header.period}
          </p>
        )}
        {header.date && (
          <p
            style={{ textAlign: "center", marginTop: "-5px", fontSize: "12px" }}
          >
            Date: {header.date}
          </p>
        )}
      </div>

      <Divider textAlign="left">
        <Chip label="Cash Book Summary" size="small" />
      </Divider>
      <div
        style={{ border: "1px solid black", padding: "8px", marginTop: "10px" }}
      >
        <Row>
          <Col>
            <p>Opening Balance: ${header.openingBalance}</p>
            <p>Total Receipts: ${header.totalReceipts}</p>
          </Col>
          <Col>
            <p>Total Payments: ${header.totalPayments}</p>
            <p>Closing Balance: ${header.closingBalance}</p>
          </Col>
        </Row>
      </div>

      <br />

      {body.entries && (
        <>
          <Divider textAlign="left">
            <Chip label="Cash Book Entries" size="small" />
          </Divider>
          <Table columns={body.entries.columns} data={body.entries.data} />
        </>
      )}

      {footer && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <p>{footer}</p>
        </div>
      )}

      <div className="page-footer" />
    </div>
  );
};

export default CashBookReport;
