import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useGetAllPayrollcategoriesQuery } from "../../../slices/payroll/categoryApiSlice";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Monthly from "./categories/Monthly";
import Sales from "./categories/Sales";
import Production from "./categories/Production";
import PackHouse from "./categories/PackHouse";
import { MDBCheckbox } from "mdb-react-ui-kit";

function CreatePayrollHeaders() {
  const { data: payroll_category } = useGetAllPayrollcategoriesQuery();

  const [category_name, set_category_name] = useState("");
  const [start_date, set_start_date] = useState("");
  const [end_date, set_end_date] = useState("");
  const [category_code, set_category_code] = useState("");
  const [pay_interval, set_pay_interval] = useState("");
  const [created_by, set_created_by] = useState("");
  const [staff_list, set_staff_list] = useState([]);
  console.log(staff_list);

  const [nhif, set_nhif] = useState(true);
  const [nssf, set_nssf] = useState(true);
  const [sacco, set_sacco] = useState(false);
  const [profident, set_profident] = useState(false);
  const [advance, set_advance] = useState(false);
  const [other_deductions, set_other_deductions] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (res.status == "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        navigate("../categories");
        toast.success("Payroll Category created successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleCategory = (e) => {
    set_category_code(e.target.value);
  };

  const add = (e) => {
    // copy payroll details to an new oject
    // copy payroll parameters to a new object
    // copy  all staff to new variable an arrya
  };

  return (
    <>
      <span>*** Create Payroll ***</span>
      <Row>
        <div>
          {" "}
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        {/* */}

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="category_name">
              <Form.Label>Start Day</Form.Label>
              <Form.Control
                type="date"
                required
                placeholder="Category Name"
                value={start_date}
                onChange={(e) => set_start_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="category_name">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                required
                placeholder="Category Name"
                value={end_date}
                onChange={(e) => set_end_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="category_code">
              <Form.Label>Category_code</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="category code"
                value={category_code}
                onChange={handleCategory}
              >
                <option value={""}> Select Category</option>
                {payroll_category?.data.map((item, index) => (
                  <>
                    <option key={index} value={item.category_code}>
                      {item.category_name}
                    </option>
                  </>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <hr></hr>

        {category_code == "1" ? (
          <>
            <div>
              <Monthly set_staff_list={set_staff_list} />
            </div>
          </>
        ) : category_code == "2" ? (
          <>
            <div>
              <Sales staff_list={staff_list} set_staff_list={set_staff_list} />
            </div>
          </>
        ) : category_code == "3" ? (
          <>
            <div>
              <Production
                staff_list={staff_list}
                set_staff_list={set_staff_list}
              />
            </div>
          </>
        ) : category_code == "4" ? (
          <>
            <div>
              <PackHouse
                staff_list={staff_list}
                set_staff_list={set_staff_list}
              />
            </div>
          </>
        ) : (
          <>
            <div style={{ color: "red" }}>Select category</div>
          </>
        )}
        {/* <Row>
          <Col>
            {/* staff_number field */}
        {/* <Form.Group className="my-2" controlId="pay_interval">
              <Form.Label>Pay Interval</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="pay_interval"
                value={pay_interval}
                onChange={(e) => set_pay_interval(parseInt(e.target.value))}
              ></Form.Control>
            </Form.Group>
          </Col> */}
        {/* </Row>  */}

        <div className="d-flex flex-row-reverse bd-highlight">
          <Button
            type="submit"
            variant="primary"
            className="mt-3 text-left float-right"
          >
            submit
          </Button>
        </div>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
}

export default CreatePayrollHeaders;
