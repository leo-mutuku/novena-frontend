import React, { useEffect, useMemo } from "react";

import { Autocomplete, TextField } from "@mui/material";
import {
  useGetAllCustomersQuery,
  useCustomerStatementMutation,
} from "../../slices/administration/customersApiSlice";

import DataTable from "../../components/general/DataTable";
import moment from "moment";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CustomerReportScreen = () => {
  const navigate = useNavigate();
  const [report_name, set_report_name] = React.useState("");
  const [supplier_number, set_supplier_number] = React.useState(null);
  const [supplier_name, set_supplier_name] = React.useState("");

  const [start_date, set_start_date] = React.useState("");
  const [end_date, set_end_date] = React.useState("");
  const [getData, setGetData] = React.useState([]);

  const [supplier_filter, set_supplier_filter] = React.useState("");
  const [customer, setCustomer] = React.useState("");
  const [product_filter, set_product_filter] = React.useState("");
  const [setData, { isLoading, isSuccess, isError }] =
    useCustomerStatementMutation();
  const { data: customers } = useGetAllCustomersQuery();

  const now = new Date();
  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const formattedDateTime = formatDateTime(now);
  console.log(formattedDateTime); // e.g., "2024-08-18 13:45:30"

  const loaddata = async () => {
    if (!supplier_number || !start_date || !end_date) {
      toast.error("Please select report name, start and end date");
      return;
    }
    const data = await setData({
      customer_id: supplier_number,
      start_date,
      end_date,
    }).unwrap();

    if (data?.data?.length) {
      setGetData(data?.data);
    } else {
      toast.error("No data found");
    }
  };
  const handleCustomer = (_, newInputValue) => {
    let x = customers?.data?.filter((a) => {
      if (a.full_name == newInputValue) {
        return a.customer_id;
      }
    });

    set_supplier_number(x[0].customer_id);
    setCustomer(x[0].full_name);
    alert(customer);
  };

  console.log(customer, "customer");

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
      { Header: "Crdit", accessor: "credit" },
      { Header: "Debit", accessor: "debit" },
      { Header: "Balance ", accessor: "balance" },
    ],
    []
  );

  // statementData
  const rows = [];
  getData?.map((row) => {
    rows.push([
      row.entry_date,
      row.description,
      row.credit,
      row.debit,
      row.balance,
    ]);
  });

  const handleStatementLink = (e) => {
    const supplier_number = 12345;
    const lastIndex = getData.length - 1; // Example supplier number
    const statementData = {
      balancebf:
        parseFloat(getData[0]?.balance) +
        (parseFloat(getData[0]?.debit) - parseFloat(getData[0]?.credit)),
      netb: parseFloat(getData[lastIndex]?.balance),

      debit: getData.reduce((acc, item) => acc + parseFloat(item.credit), 0),
      credit: getData.reduce((acc, item) => acc + parseFloat(item.debit), 0),

      // Add other relevant data here
      period: `${start_date} - ${end_date}`,
      customer: customer,
      lines: rows,
      columns: ["Date", "Description", "Debit", "Credit", "Balance(Ksh)"],
      // Add other relevant data here

      date: formattedDateTime,
    };

    navigate(`../customers/statement/${supplier_number}`, {
      state: { statementData },
    });
  };

  return (
    <>
      <div style={{ marginBottom: "2px", paddingTop: "10px" }}>
        <Row>
          <Col>
            {customers?.data?.length > 0 && (
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={customers?.data}
                getOptionLabel={(option) => option.full_name}
                renderInput={(full_name) => (
                  <TextField {...full_name} label="Customers" />
                )}
                inputValue={customers.full_name}
                onInputChange={(event, newInputValue) =>
                  handleCustomer(event, newInputValue)
                }
                isOptionEqualToValue={(option, value) =>
                  option.full_name === value.full_name
                }
              />
            )}
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
          {/* <Col>
            <Form.Group className="my-2" controlId="role_name">
              <Form.Control
                type="text"
                required
                placeholder="Role Name"
                value={"#"}
                // onChange={(e) => set_role_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col> */}
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
                Excel Report
              </Button>{" "}
              &nbsp; &nbsp;
              <Button
                variant="primary"
                type="button"
                onClick={handleStatementLink}
              >
                Statement
              </Button>
              &nbsp; &nbsp;
              <Button
                variant="secondary"
                type="button"
                onClick={handleClearFilter}
              >
                Clear filter
              </Button>
            </Col>

            <Col> </Col>
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

export default CustomerReportScreen;
