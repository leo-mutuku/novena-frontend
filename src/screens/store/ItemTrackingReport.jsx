import React, { useEffect, useMemo } from "react";
import {
  useGetAllStoreItemsQuery,
  useItemTrackingMutation,
} from "../../slices/store/storeItemsApiSlice";
import DataTable from "../../components/general/DataTable";
import moment from "moment";
import { Button, Form, Row, Col } from "react-bootstrap";
import Papa from "papaparse";
import { toast } from "react-toastify";
import TimeDate from "../../components/TimeDate";

const ItemTrackingReport = () => {
  const timeDate = new TimeDate();
  const [report_name, set_report_name] = React.useState("");
  const [item_code, set_item_code] = React.useState("");
  const [start_date, set_start_date] = React.useState("");
  const [end_date, set_end_date] = React.useState("");
  const [getData, setGetData] = React.useState([]);
  const [supplier_filter, set_supplier_filter] = React.useState("");
  const [product_filter, set_product_filter] = React.useState("");
  const { data: finalData } = useGetAllStoreItemsQuery();
  const [setData, { isLoading, isSuccess, isError }] =
    useItemTrackingMutation();

  const loaddata = async () => {
    if (!item_code || !start_date || !end_date) {
      toast.error("Please select item_code, start and end date");
      return;
    }

    const data = await setData({
      item_code: item_code,
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
      link.setAttribute("download", `${report_name}.csv`);
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
      {
        Header: "Date",
        accessor: "entry_date",
        Cell: ({ row }) => (
          <>
            {timeDate.date(row.original.entry_date)} :{" "}
            {timeDate.time(row.original.entry_date)}{" "}
          </>
        ),
      },

      { Header: "_in", accessor: "_in" },
      { Header: "_out", accessor: "_out" },
      { Header: "_initial", accessor: "_initial" },
      { Header: "_balance", accessor: "_balance" },
      { Header: "Reason", accessor: "reason" },
      { Header: "By", accessor: "by" },
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
                value={item_code}
                onChange={(e) => set_item_code(e.target.value)}
              >
                <option value="">Select Item</option>
                {finalData?.data?.map((item) => (
                  <option value={item.item_code} key={item.item_code}>
                    {item.item_name} - {item.item_code}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="role_name">
              <Form.Control
                type="datetime-local"
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
                type="datetime-local"
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
            <Col xs={6}>
              <Button
                variant="primary"
                type="button"
                onClick={handleDownloadCSV}
              >
                Download Report
              </Button>
              &nbsp; &nbsp;{" "}
              <Button
                variant="primary"
                type="button"
                onClick={handleClearFilter}
              >
                Item Statement
              </Button>
              &nbsp; &nbsp;
              <Button
                variant="secondary"
                type="button"
                onClick={handleClearFilter}
              >
                Clear filter
              </Button>
              &nbsp; &nbsp;
            </Col>
            <Col></Col>
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

export default ItemTrackingReport;
