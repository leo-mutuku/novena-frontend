import React, { useState, useEffect, useMemo } from "react";

import {
  useSalesQuery,
  useValidateBalesMutation,
  useUpdateSalePeopleSalaryMutation,
} from "../../../slices/administration/staffApiSlice";

import { MdAddTask, MdEdit } from "react-icons/md";

import { Link } from "react-router-dom";

import { Row, Col, Button, Form } from "react-bootstrap";

import DataTable from "../../../components/general/DataTable";
import { toast } from "react-toastify";

const SalesStaffList = () => {
  const [tableData, setTableData] = useState([]);
  const [start_date, set_start_date] = useState("");
  const [end_date, set_end_date] = useState("");
  const { data, isLoading } = useSalesQuery();
  const [validateBales, { isLoading: validateLoading }] =
    useValidateBalesMutation();
  const [updateSalePeopleSalary, { isLoading: updateLoading }] =
    useUpdateSalePeopleSalaryMutation();

  useEffect(() => {
    if (data?.data) {
      setTableData(data.data);
    }
  }, [data]);

  const [title, set_title] = useState({
    report_title: "",
    generated_by: "",
    date: "",
    filename: "",
  });
  const handleUpdateSalePeopleSalary = async () => {
    try {
      const res = await updateSalePeopleSalary({}).unwrap();

      if (res?.data.status === "success") {
        toast.success(res.data.message);
      } else {
        toast.success(res.message || "Error validating");
      }
    } catch (error) {
      toast.error(error.data.message || "Error validating");
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "First Name.",
        accessor: "first_name",
      },

      {
        Header: "Last Name",
        accessor: "last_name",
      },

      {
        Header: "Bales",
        accessor: "bales",
      },
      {
        Header: "Rate",
        accessor: "fixed_rate",
      },

      {
        Header: ` Edit`,
        accessor: "update_rate",
        Cell: ({ row }) => (
          <>
            <Link
              to={`/payroll/salespeoplecommision/fixedrate/${row.original.staff_number}`}
            >
              <Button variant="outline-primary">
                <MdEdit />
              </Button>
            </Link>
          </>
        ),
      },
    ],
    []
  );

  const handleValidateBales = async () => {
    try {
      const res = await validateBales({ start_date, end_date });
      console.log(res);
      if (res?.data.status === "success") {
        toast.success(res.data.message);
      } else {
        toast.error(res.message || "Error validating");
      }
    } catch (error) {
      toast.error(error.data.message || "Error validating");
    }
  };

  return (
    <>
      <Row>
        <Col>
          <p>*** Sales staff List*** </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="account_number">
            <Form.Control
              type="date"
              required
              placeholder="Start"
              value={start_date}
              onChange={(e) => set_start_date(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="account_number">
            <Form.Control
              type="date"
              required
              placeholder="End"
              value={end_date}
              onChange={(e) => set_end_date(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col xs={4}>
          <Button onClick={handleValidateBales}>Validate Bales Entries</Button>
        </Col>
      </Row>
      <DataTable columns={columns} data={tableData} />
      <br></br>
      <Row>
        <Col>
          <Button onClick={handleUpdateSalePeopleSalary}>
            Update Payroll{" "}
          </Button>
        </Col>
      </Row>
    </>
  );
};
export default SalesStaffList;
