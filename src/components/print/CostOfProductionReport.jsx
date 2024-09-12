import React, { forwardRef } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Divider, Chip } from "@mui/material";

const CostOfProductionReport = forwardRef(
  (
    { header1, header2, summary, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o },
    ref
  ) => {
    return (
      <div ref={ref}>
        <style>
          {`
          @page {
            size: A4;
            margin: 0mm;
          }

          body {
            margin: 25mm, 10mm;
          }

          .page-content {
            padding: 20px;
            position: relative;
            margin: 0.5rem;
          }

          @media print {
            @page {
              margin: 20mm, 20mm, 20mm , 20mm;
            }

            body {
              margin: 0;
              padding: 0;
            }

            .custom-page-footer {
              position: fixed;
              bottom: 0;
              width: 100%;
              text-align: center;
              font-size: 12px;
            }

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
                {header1?.title && <p>{header1?.title}</p>}
                <p
                  style={{
                    textAlign: "left",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  {header1?.period}
                </p>
                <p>
                  {header1?.type} : {header1?.name}
                </p>
              </div>
            </Col>
            <Col>
              <div>
                {header2?.date && (
                  <p
                    style={{
                      textAlign: "right",
                      marginBottom: "-5px",
                      marginTop: "-5px",
                    }}
                  >
                    Date: {header2.date}
                  </p>
                )}
                {header2?.subTitle && (
                  <p
                    style={{
                      textAlign: "right",
                      marginBottom: "-5px",
                      marginTop: "-5px",
                    }}
                  >
                    {header2?.subTitle}
                  </p>
                )}
                {header2?.description && (
                  <p
                    style={{
                      textAlign: "right",
                      marginTop: "-5px",
                      marginBottom: "2px",
                    }}
                  >
                    {header2?.description}
                  </p>
                )}
                {header2?.address && (
                  <p
                    style={{
                      textAlign: "right",
                      marginTop: "-5px",
                      fontSize: "12px",
                    }}
                  >
                    {header2?.address}
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
              padding: "10px 4px 4px 4px",
              marginTop: "10px",
            }}
          >
            <Row>
              <Table size="sm" striped bordered hover>
                <thead>
                  <tr>
                    <th>Particulars</th>
                    <th>Kshs.</th>
                  </tr>
                  <tr>
                    <th>{a?.name}</th>
                    <th>{a?.value}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{b?.name}</th>
                    <th>{b?.value}</th>
                  </tr>
                  <tr>
                    <th>{c?.name}</th>
                    <th>{c?.value}</th>
                  </tr>
                  <tr>
                    <th>{d?.name}</th>
                    <th>{d?.value}</th>
                  </tr>
                  <tr>
                    <th>{e?.name}</th>
                    <th>{e?.value}</th>
                  </tr>
                  <tr>
                    <th>{f?.name}</th>
                    <th>{f?.value}</th>
                  </tr>
                  <tr>
                    <th>{g?.name}</th>
                    <th>{g?.value}</th>
                  </tr>
                  <tr>
                    <th>{h?.name}</th>
                    <th>{h?.value}</th>
                  </tr>
                  <tr>
                    <th>{i?.name}</th>
                    <th>{i?.value}</th>
                  </tr>
                  <tr>
                    <th>{j?.name}</th>
                    <th>{j?.value}</th>
                  </tr>
                  <tr>
                    <th>{k?.name}</th>
                    <th>{k?.value}</th>
                  </tr>
                  <tr>
                    <th>{l?.name}</th>
                    <th>{l?.value}</th>
                  </tr>
                  <tr>
                    <th>{m?.name}</th>
                    <th>{m?.value}</th>
                  </tr>
                  <tr>
                    <th>{n?.name}</th>
                    <th>{n?.value}</th>
                  </tr>
                  <tr>
                    <th>{o?.name}</th>
                    <th>{o?.value}</th>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </div>

          <br />

          <div className="page-footer" />
          <div className="page-break" />
        </div>
      </div>
    );
  }
);

export default CostOfProductionReport;
