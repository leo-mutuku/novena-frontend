import React from "react";
import { Row, Col } from "react-bootstrap";
import { Divider, Chip } from "@mui/material";
import { Table } from "../../../components/general/DataTable"; // Assuming DataTable component

const CostOfProductionReport = ({ header, body, footer }) => {
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
        {header.product && (
          <p
            style={{
              textAlign: "center",
              marginTop: "-5px",
              marginBottom: "2px",
            }}
          >
            Product: {header.product}
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
        <Chip label="Cost of Production Summary" size="small" />
      </Divider>
      <div
        style={{ border: "1px solid black", padding: "8px", marginTop: "10px" }}
      >
        <Row>
          <Col>
            <p>Total Direct Material Cost: ${header.totalDirectMaterialCost}</p>
            {header.hasOwnProperty("totalDirectLaborCost") && (
              <p>Total Direct Labor Cost: ${header.totalDirectLaborCost}</p>
            )}
          </Col>
          <Col>
            <p>
              Total Manufacturing Overhead: ${header.totalManufacturingOverhead}
            </p>
            <p>Total Cost of Production: ${header.totalCostOfProduction}</p>
          </Col>
        </Row>
      </div>

      <br />

      {body.costComponents && (
        <>
          <Divider textAlign="left">
            <Chip label="Cost of Production Breakdown" size="small" />
          </Divider>
          <Table
            columns={body.costComponents.columns}
            data={body.costComponents.data}
          />
        </>
      )}

      {body.productionDetails && (
        <>
          <Divider textAlign="left">
            <Chip label="Production Details" size="small" />
          </Divider>
          <Table
            columns={body.productionDetails.columns}
            data={body.productionDetails.data}
          />
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

export default CostOfProductionReport;
