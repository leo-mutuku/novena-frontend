import React, { useEffect, useMemo } from "react";

import {
  useGetAllSalesPeopleQuery,
  useLoadReportDataMutation,
} from "../../slices/sales/salesPeopleApiSlice";

import DataTable from "../../components/general/DataTable";
import moment from "moment";
import { Button, Form, Row, Col } from "react-bootstrap";
import Papa from "papaparse";
import { toast } from "react-toastify";

const LoadingListRport = () => {
  const [report_name, set_report_name] = React.useState("");
  const [supplier_number, set_supplier_number] = React.useState(null);
  const [supplier_name, set_supplier_name] = React.useState("");
  const [staff_id, set_staff_id] = React.useState("");
  const { data: salesPeople } = useGetAllSalesPeopleQuery();

  const [start_date, set_start_date] = React.useState("");
  const [end_date, set_end_date] = React.useState("");
  const [getData, setGetData] = React.useState([]);
  const [supplier_filter, set_supplier_filter] = React.useState("");
  const [product_filter, set_product_filter] = React.useState("");
  const [setData, { isLoading, isSuccess, isError }] =
    useLoadReportDataMutation();

  const loaddata = async () => {
    if (!staff_id || !start_date || !end_date) {
      toast.error("Please select sales person, start and end date");
      return;
    }
    const data = await setData({
      staff_id,
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
  // push to git
  const columns1 = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      { Header: "Item Code", accessor: "item_code" },

      { Header: "Item Name", accessor: "item_name" },
      { Header: "Quantity", accessor: "quantity" },
      { Header: "Total", accessor: "total" },
    ],
    []
  );

  return (
    <>
      <div style={{ marginBottom: "2px", paddingTop: "10px" }}>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="role_name">
              <Form.Select
                type="text"
                required
                placeholder="Select Report"
                value={staff_id}
                onChange={(e) => set_staff_id(e.target.value)}
              >
                <option value="">Select Sales Person</option>
                {salesPeople?.data.map((item, key) => (
                  <option value={item.staff_id} key={key}>
                    {item.last_name}
                  </option>
                ))}
              </Form.Select>
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
            <Col xs={2}>
              <Button
                variant="secondary"
                type="button"
                onClick={handleClearFilter}
              >
                Clear filter
              </Button>
            </Col>
            <Col xs={1}>
              {" "}
              <Button variant="secondary" type="button" onClick={""}>
                SMS
              </Button>
            </Col>
            <Col xs={1}>
              {" "}
              <Button variant="secondary" type="button" onClick={""}>
                POS
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

export default LoadingListRport;
