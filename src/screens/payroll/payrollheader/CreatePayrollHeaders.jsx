import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useGetAllPayrollcategoriesQuery } from "../../../slices/payroll/categoryApiSlice";
import { useCreatePayrollheaderMutation } from "../../../slices/payroll/payrollHeadersApiSlice";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Monthly from "./categories/Monthly";
import Sales from "./categories/Sales";
import Production from "./categories/Production";
import PackHouse from "./categories/PackHouse";

function CreatePayrollHeaders() {
  const { data: payroll_category } = useGetAllPayrollcategoriesQuery();
  const [createPayrollHeader, { isLoading }] = useCreatePayrollheaderMutation();

  const [start_date, set_start_date] = useState("");
  const [end_date, set_end_date] = useState("");
  const [category_code, set_category_code] = useState("");
  const [created_by, set_created_by] = useState("");
  const [staff_list, set_staff_list] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);
  const removeStaff = (staff_id) => {
    const newStaff = staff_list.filter((item) => item.staff_id !== staff_id);
    set_staff_list(newStaff);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createPayrollHeader({
        payroll_head: { start_date, end_date, category_code, created_by },
        staff_list,
      }).unwrap();
      if (res.status == "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        navigate("../allpayroll");
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
              <Monthly
                staff_list={staff_list}
                set_staff_list={set_staff_list}
                removeStaff={removeStaff}
              />
            </div>
          </>
        ) : category_code == "2" ? (
          <>
            <div>
              <Sales
                staff_list={staff_list}
                set_staff_list={set_staff_list}
                removeStaff={removeStaff}
              />
            </div>
          </>
        ) : category_code == "3" ? (
          <>
            <div>
              <Production
                staff_list={staff_list}
                set_staff_list={set_staff_list}
                removeStaff={removeStaff}
              />
            </div>
          </>
        ) : category_code == "4" ? (
          <>
            <div>
              <PackHouse
                staff_list={staff_list}
                set_staff_list={set_staff_list}
                removeStaff={removeStaff}
              />
            </div>
          </>
        ) : (
          <>
            <div style={{ color: "red" }}>Select category</div>
          </>
        )}
        <hr></hr>
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
