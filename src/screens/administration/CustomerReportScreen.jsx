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
  const [product_filter, set_product_filter] = React.useState("");
  const [setData, { isLoading, isSuccess, isError }] =
    useCustomerStatementMutation();
  const { data: customers } = useGetAllCustomersQuery();

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
      { Header: "Crdit", accessor: "credit" },
      { Header: "Debit", accessor: "debit" },
      { Header: "Balance ", accessor: "balance" },
    ],
    []
  );

  // statementData

  const handleStatementLink = (e) => {
    const supplier_number = 12345;
    const lastIndex = getData.length - 1; // Example supplier number
    const statementData = {
      balancebf:
        parseFloat(getData[0]?.balance) +
        (parseFloat(getData[0]?.credit) - parseFloat(getData[0]?.debit)),
      netb: parseFloat(getData[lastIndex]?.balance),

      // Add other relevant data here
      period: "01/01/2024 - 31/12/2024",
      // Add other relevant data here
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
