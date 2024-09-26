import React, { useState, useEffect, useMemo } from "react";
//import { useGetTodosQuery } from './apiSlice';
import Loader from "../../../components/Loader";
import { useGetAllGLAccountsQuery } from "../../../slices/finance/glApiSlice";
import { useIncomeStateemntMutation } from "../../../slices/finance/accountsApiSlice";
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
import IncomeStatementComp from "../../../components/print/IncomeStatementComp";
import PrintButton from "../../../components/print/PrintButton";

const IncomeStatementList = () => {
  const componentRef = React.useRef();
  const [columns_header, set_columns_header] = useState([]);
  const [columns_body, set_columns_body] = useState([]);
  const [footer_header, set_footer_header] = useState([]);
  const [footer_data, set_footer_data] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const { data, isLoading } = useGetAllGLAccountsQuery();
  const [gettIncomeStatement, { isLoading: isIncomeStatementLoading }] =
    useIncomeStateemntMutation();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
    title: "INCOME STATEMENT ",
    subTitle: "Novena Maize Miller LTD",
    description: "Dealers in: All types of cereals, Animal feeds",
    address: "P.O Box 238, Meru, Kenya",
    start: "08/08/2024",
    end: "08/08/2024",
    batch_number: "",
    deliveryNumber: "10301",
    input: 0,
    output: 0,
    expected: 0,
    variance: 0,
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

  const [a, seta] = useState({
    name: `Total sales (a)`,
    value: 0,
    type: `add`,
  });
  const [b, setb] = useState({
    name: `Cost of goods return (b)`,
    value: 0,
    type: `less`,
  });
  const [c, setc] = useState({
    name: ` Opening stock of finished goods (c)`,
    value: 0,
    type: `add`,
  });
  const [d, setd] = useState({
    name: `Cost of production (d)`,
    value: 0,
    type: `add`,
  });
  const [e, sete] = useState({
    name: `Closing stock of finished goods (e)`,
    value: 0,
    type: `add`,
  });
  const [f, setf] = useState({
    name: `Gross profit (f)`,
    value: 0,
    type: `add`,
  });
  const [g, setg] = useState({
    name: `Wifi + airtime (g)`,
    value: 0,
    type: `add`,
  });
  const [h, seth] = useState({
    name: `Security services (h)`,
    value: 0,
    type: `add`,
  });
  const [i, seti] = useState({
    name: `Kitchen expenses (i)`,
    value: 0,
    type: `add`,
  });
  const [j, setj] = useState({
    name: `General salaries (j)`,
    value: 0,
    type: `add`,
  });
  const [k, setk] = useState({
    name: `Other expense (k) `,
    value: 0,
    type: `add`,
  });
  const [l, setl] = useState({
    name: `Misllineous (l)`,
    value: 0,
    type: `add`,
  });
  const [m, setm] = useState({
    name: `Water bill (m)`,
    value: 0,
    type: `add`,
  });
  const [n, setn] = useState({
    name: `Administration expenses`,
    value: 0,
    type: `add`,
  });
  const [o, seto] = useState({
    name: `Fuel `,
    value: 0,
    type: `add`,
  });
  const [p, setp] = useState({
    name: `Services (p)`,
    value: 0,
    type: `add`,
  });
  const [q, setq] = useState({
    name: ` spares (q)`,
    value: 0,
    type: `add`,
  });
  const [r, setr] = useState({
    name: `Sales and distribution expenses (r)`,
    value: 0,
    type: `add`,
  });
  const [s, sets] = useState({
    name: `Financial charges  (s)`,
    value: 0,
    type: `add`,
  });
  const [t, sett] = useState({
    name: `Net Profit / Loss (t)`,
    value: 0,
    type: `add`,
  });

  const handleLoadBTN = async () => {
    const res = await gettIncomeStatement({
      start_date: startDate,
      end_date: endDate,
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
      setp({ ...p, value: res.data.p.value });
      setq({ ...q, value: res.data.q.value });
      setr({ ...r, value: res.data.r.value });
      sets({ ...s, value: res.data.s.value });
      sett({ ...t, value: res.data.t.value });
    } else {
      throw new Error(res.message);
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
      <IncomeStatementComp
        header={headers}
        body={body}
        footer={footer}
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
        p={p}
        q={q}
        r={r}
        s={s}
        t={t}
      />
    </>
  );
};
export default IncomeStatementList;
