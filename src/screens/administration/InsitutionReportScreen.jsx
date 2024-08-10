import React, { useEffect, useMemo } from "react";
import { useGetSupplierStorePurchaseReportMutation } from "../../slices/purchase/storePurchaseHeadersApiSlice";
import {
  useGetAllInstitutionsQuery,
  useInstitutionStatementMutation,
} from "../../slices/administration/institutionsApiSlice";
import DataTable from "../../components/general/DataTable";
import moment from "moment";
import { Button, Form, Row, Col } from "react-bootstrap";
import Papa from "papaparse";
import { toast } from "react-toastify";

const InsitituionReportScreen = () => {
  const [report_name, set_report_name] = React.useState("");
  const [supplier_number, set_supplier_number] = React.useState(null);
  const [supplier_name, set_supplier_name] = React.useState("");

  const [start_date, set_start_date] = React.useState("");
  const [end_date, set_end_date] = React.useState("");
  const [getData, setGetData] = React.useState([]);
  const [supplier_filter, set_supplier_filter] = React.useState("");
  const [product_filter, set_product_filter] = React.useState("");
  const [setData, { isLoading, isSuccess, isError }] =
    useInstitutionStatementMutation();
  const { data: suppliers } = useGetAllInstitutionsQuery();

  const loaddata = async () => {
    if (!supplier_number || !start_date || !end_date) {
      toast.error("Please select report name, start and end date");
      return;
    }
    const data = await setData({
      institution_id: supplier_number,
      start_date,
      end_date,
    }).unwrap();

    if (data?.data?.length) {
      setGetData(data?.data);
    } else {
      toast.error("No data found");
    }
  };

  const handleDownloadCSV = () => {
    if (getData && getData.length > 0) {
      const csv = Papa.unparse(getData);
      console.log(csv, "csv");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `supplier_report.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleClearFilter = () => {
    setGetData([]);
    set_report_name("");
    set_start_date("");
    set_end_date("");
    set_supplier_filter("");
    set_product_filter("");
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Purchase Date",
        accessor: "purchase_date",
      },
      { Header: "Total Cost", accessor: "total_cost" },
    ],
    []
  );

  const columns1 = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      { Header: "Date", accessor: "entry_date" },
      { Header: "Desc", accessor: "description" },
      { Header: "Debit", accessor: "debit" },
      { Header: "Credit", accessor: "credit" },
      { Header: "Balance ", accessor: "balance" },
    ],
    []
  );

  return (
    <>
      <div style={{ marginBottom: "2px", paddingTop: "10px" }}>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="role_name">
              <Form.Control
                type="number"
                required
                placeholder="Enter Institution ID"
                value={supplier_number}
                onChange={(e) => set_supplier_number(parseInt(e.target.value))}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="role_name">
              <Form.Control
                type="date"
                required
                placeholder="start_date"
                value={start_date}
                onChange={(e) => set_start_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="role_name">
              <Form.Control
                type="date"
                required
                placeholder="end_date"
                value={end_date}
                onChange={(e) => set_end_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col xs={1} style={{ marginTop: "8px" }}>
            <Button variant="primary" type="button" onClick={loaddata}>
              Load
            </Button>
          </Col>
        </Row>
      </div>
      <hr></hr>
      {getData && getData.length > 0 ? (
        <>
          <Row>
            <Col xs={3}>
              <Button
                variant="primary"
                type="button"
                onClick={handleDownloadCSV}
              >
                Download Report
              </Button>
            </Col>
            <Col>
              {" "}
              <Button
                variant="secondary"
                type="button"
                onClick={handleClearFilter}
              >
                Clear filter
              </Button>
            </Col>
          </Row>
          <br></br>
          <Row>
            {" "}
            <DataTable
              columns={report_name == "StorePurchase" ? columns : columns1}
              data={getData}
            />
          </Row>
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          Load report first
        </div>
      )}
      ;
    </>
  );
};

export default InsitituionReportScreen;
