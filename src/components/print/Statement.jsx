import React, { forwardRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Divider, Chip } from "@mui/material";

const Statement = forwardRef(({ header1, header2, sumarry, body }, ref) => {
  return (
    <div ref={ref}>
  <style>
  {`
    @page {
      size: A4;
      margin: 10mm; /* Adjust overall page margin */
    }

    body {
      margin: 12.5mm 5mm; /* Adjust top and side margins */
    }

    .page-content {
      padding: 20px;
      position: relative;
      margin-top: 5px; /* Reduce margin at the top of the content */
    }

    @media print {
      @page {
        margin: 15mm; /* Increase margins for printing */
      }

      body {
        margin: 0; /* Reset margins for printing */
        padding: 0; /* Reset padding for printing */
      }

      .page-content {
        margin-top: 10mm; /* Adjust top margin specifically for printing */
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


      <div className="page-content">
        <Row>
          <Col>
            <div>
              {header1.title && <p>{header1.title}</p>}
              <p style={{ textAlign: "left", marginBottom: "-5px", marginTop: "-5px" }}>
                {header1?.period}
              </p>
              <p>
                {header1?.type} : {header1.name}
              </p>
            </div>
          </Col>
          <Col>
            <div>
              {header2?.date && (
                <p style={{ textAlign: "right", marginBottom: "-5px", marginTop: "-5px" }}>
                  Date: {header2.date}
                </p>
              )}
              {header2.subTitle && (
                <p style={{ textAlign: "right", marginBottom: "-5px", marginTop: "-5px" }}>
                  {header2?.subTitle}
                </p>
              )}
              {header2?.description && (
                <p style={{ textAlign: "right", marginTop: "-5px", marginBottom: "2px" }}>
                  {header2?.description}
                </p>
              )}
              {header2?.address && (
                <p style={{ textAlign: "right", marginTop: "-5px", fontSize: "12px" }}>
                  {header2?.address}
                </p>
              )}
            </div>
          </Col>
        </Row>

        <Divider textAlign="left">
          <Chip label="Summary" size="small" />
        </Divider>
        <div style={{ border: "1px solid #ccc", padding: "14px 8px 8px 8px", marginTop: "10px" }}>
          <Row>
            <Col>
              <Row>
                <Col><p>{sumarry?.entry1}&nbsp; &nbsp; &nbsp;</p></Col>
              </Row>
              <Row>
                <Col><p>{sumarry?.entry2}&nbsp; &nbsp; &nbsp;</p></Col>
              </Row>
              <Row>
                <Col><p>{sumarry?.entry3}&nbsp; &nbsp; &nbsp;</p></Col>
              </Row>
              <Row>
                <Col><p style={{ fontWeight: "bold" }}>{sumarry?.entry4}&nbsp; &nbsp; &nbsp;</p></Col>
              </Row>
            </Col>
            <Col>
              <Row><Col>{sumarry?.value1 && <p>{sumarry?.value1}</p>}</Col></Row>
              <Row><Col>{sumarry?.value2 && <p>{sumarry?.value2}</p>}</Col></Row>
              <Row><Col>{sumarry?.value3 && <p>{sumarry?.value3}</p>}</Col></Row>
              <Row><Col>{sumarry?.value4 && <p style={{ fontWeight: "bold" }}>{sumarry?.value4}</p>}</Col></Row>
            </Col>
          </Row>
        </div>
        <br />
        <Divider textAlign="left">
          <Chip label="Detailed" size="small" />
        </Divider>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", marginBottom: "40px" }}>
          <thead>
            <tr>
              {body.columns && body.columns.map((col, index) => (
                <th key={index} style={{ border: "1px solid #ccc", padding: "8px", fontSize: "14px", fontWeight: "bold" }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.rows && body.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={{ border: "1px solid #ccc", padding: "8px", fontSize: "12px" }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </div>
  );
});

export default Statement;
