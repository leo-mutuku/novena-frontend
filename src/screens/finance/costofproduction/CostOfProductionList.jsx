import React, { useState, useEffect, useMemo } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllGLAccountsQuery } from "../../../slices/finance/glApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPrint } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";

import { CiEdit } from "react-icons/ci";
import PrintA4A5ExcelButton from "../../../components/PrintA4A5ExcelButton";
import DataTable from "../../../components/general/DataTable";
import moment from "moment";
import axios from "axios";
import { Row, Col, Form } from "react-bootstrap";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import CostOfProductionReport from "../../../components/print/CostOfProductionReport";
import PrintButton from "../../../components/print/PrintButton";
import { useCostofProductionReportMutation } from "../../../slices/finance/accountsApiSlice";
import { toast } from "react-toastify";

const CostOfProductionList = () => {
  const componentRef = React.useRef();
  const [columns_header, set_columns_header] = useState([]);
  const [columns_body, set_columns_body] = useState([]);
  const [footer_header, set_footer_header] = useState([]);
  const [footer_data, set_footer_data] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const { data, isLoading } = useGetAllGLAccountsQuery();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [costofProductionReport, { isLoading: isLoadingReport }] =
    useCostofProductionReportMutation();
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

  const [headers, setHeaders] = useState({
    title: "COST OF PRODUCTION ",
    subTitle: "Novena Maize Miller LTD",
    description: "Dealers in: All types of cereals, Animal feeds",
    address: "P.O Box 238, Meru, Kenya",
    start: startDate,
    end: endDate,
    batch_number: "",
    deliveryNumber: "10301",
    input: 0,
    output: 0,
    expected: 0,
    variance: 0,
  });
  const [a, seta] = useState({
    name: `Opening Stock of Raw Materials (a))`,
    value: 0,
    type: `add`,
  });
  const [b, setb] = useState({
    name: `Purchases of Raw Materials (b))`,
    value: 0,
    type: `add`,
  });
  const [c, setc] = useState({
    name: `Carriage inwards of raw materials (c)`,
    value: 0,
    type: `add`,
  });
  const [d, setd] = useState({
    name: `Return outward of raw materials (d)`,
    value: 0,
    type: `less`,
  });
  const [e, sete] = useState({
    name: `Cost of raw material purchased for usage`,
    value: 0,
    type: `add`,
  });
  const [f, setf] = useState({
    name: `Closing stock of raw materials (f)`,
    value: 0,
    type: `less`,
  });
  const [g, setg] = useState({
    name: `Cost of raw matrial consumed (g)`,
    value: 0,
    type: `add`,
  });
  const [h, seth] = useState({
    name: `Direct wages (h)`,
    value: 0,
    type: `add`,
  });
  const [i, seti] = useState({
    name: `Opening stock of packaging material (i)`,
    value: 0,
    type: `add`,
  });
  const [j, setj] = useState({
    name: `Purchases of packaging material (j)`,
    value: 0,
    type: `add`,
  });

  const [k, setk] = useState({
    name: `Closing stock of packaging material (k)`,
    value: 0,
    type: `add`,
  });
  const [l, setl] = useState({
    name: `PRIME COST(l)`,
    value: 0,
    type: `add`,
  });
  const [m, setm] = useState({
    name: `Electricity (m)`,
    value: 0,
    type: `less`,
  });
  const [n, setn] = useState({
    name: `Rent of factor (n)`,
    value: 0,
    type: `less`,
  });
  const [o, seto] = useState({
    name: `COST OF PRODUCING GOODS (o)`,
    value: 0,
    type: `less`,
  });

  const [columns, setColumns] = useState(["Product", "Quantity"]);

  const [rows, setRows] = useState([
    ["Product B", "200"],
    ["Product C", "150"],
    ["Product A", "100"],
    ["Product B", "200"],
    ["Product C", "150"],
  ]);

  const [columns1, setColumns1] = useState(["Product", "Quantity"]);
  const [rows1, setRows1] = useState([
    ["Product B", "200"],
    ["Product C", "150"],
    ["Product A", "100"],
    ["Product B", "200"],
    ["Product C", "150"],
  ]);
  const [footer, setFooter] = useState(
    "Your Satisfaction is our number one priority!"
  );

  const body = {
    columns: columns,
    rows: rows,
    columns1: columns1,
    rows1: rows1,
  };
  const documentData = {
    header: headers,
    body: {
      columns: columns,
      rows: rows,
      columns1: columns1,
      rows1: rows1,
    },
    footer: footer,
  };

  const handleLoadBTN = async () => {
    try {
      if (!startDate || !endDate) {
        toast.error("Please select start and end date");
        return;
      }
      const res = await costofProductionReport({
        startDate: startDate,
        endDate: endDate,
      }).unwrap();

      if (res.status == "success") {
        seta({ ...a, value: res.data.a.value });
        setb({ ...b, value: res.data.b.value });
        setc({ ...c, value: res.data.c.value });
        setd({ ...d, value: res.data.d.value });
        sete({ ...e, value: res.data.e.value });
        setf({ ...f, value: res.data.f.value });
        setg({ ...g, value: res.data.g.value });
        seth({ ...h, value: res.data.h.value });
        seti({ ...i, value: res.data.i.value });
        setj({ ...j, value: res.data.j.value });
        setk({ ...k, value: res.data.k.value });
        setl({ ...l, value: res.data.l.value });
        setm({ ...m, value: res.data.m.value });
        setn({ ...n, value: res.data.n.value });
        seto({ ...o, value: res.data.o.value });
      } else {
        alert("error");
      }
    } catch (error) {
      toast.error(error.data.message || "Error occurred while loading data");
    }
  };

  return (
    <>
      <div>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="cash_account_id">
              <Form.Control
                type="date"
                required
                placeholder="cash_account_id"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="cash_account_id">
              <Form.Control
                type="date"
                required
                placeholder="cash_account_id"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button
              style={{ marginTop: "10px" }}
              variant="primary"
              onClick={handleLoadBTN}
            >
              Load
            </Button>
          </Col>
        </Row>
      </div>
      <PrintButton componentRef={componentRef} {...documentData} />
      <CostOfProductionReport
        header={headers}
        body={body}
        a={a}
        b={b}
        c={c}
        d={d}
        e={e}
        f={f}
        g={g}
        h={h}
        i={i}
        j={j}
        k={k}
        l={l}
        m={m}
        n={n}
        o={o}
        footer={footer}
      />
    </>
  );
};
export default CostOfProductionList;
