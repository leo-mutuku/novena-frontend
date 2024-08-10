import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateProductionHeaderMutation } from "../../../slices/production/productionHeaderApiSlice";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";
import { useGetAllStoreRegisterQuery } from "../../../slices/store/storeRegisterApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

function CreateProductionHeader() {
  const [production_officer, set_production_officer] = useState("");
  const [production_input, set_production_input] = useState("");
  const [expected_output, set_expected_output] = useState("");
  const [production_date, set_production_date] = useState("");
  const [shift, set_shift] = useState("");
  const [batch_number, set_batch_number] = useState("");
  const [created_by, set_created_by] = useState(null);
  const [store_code, set_store_code] = useState(0);
  const [production_officer_first_name, set_production_officer_first_name] =
    useState("");
  const [production_officer_last_name, set_production_officer_last_name] =
    useState("");

  const [ProductionHeader, { isLoading }] = useCreateProductionHeaderMutation();
  const { data: staff } = useGetAllStaffQuery();
  const { data: store } = useGetAllStoreRegisterQuery();

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
      const res = await ProductionHeader({
        production_officer,
        production_input,
        expected_output,
        production_date,
        shift,
        batch_number,
        created_by,
        store_code,
        production_officer_first_name,
        production_officer_last_name,
      }).unwrap();

      if (res.status == "failed") {
        toast.error(res.message);
      } else {
        toast.success("Production Iniated Successfully");
        navigate("../allproductionheaders");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleProductionDate = (e) => {
    let day = new Date(e.target.value);
    let d = day.getDate() < 10 ? "0" + day.getDate() : day.getDate();

    let month = new Date(e.target.value);
    let m =
      month.getMonth() + 1 < 10
        ? "0" + (month.getMonth() + 1)
        : month.getMonth() + 1;

    let year = new Date(e.target.value);
    let y = year.getFullYear();
    let date = `${y}${m}${d}`;
    set_batch_number(date);
    set_production_date(e.target.value);
  };

  const hadleProductionOfficer = (e) => {
    let x = staff?.data?.filter((a) => {
      if (a.staff_id == e.target.value) {
        return a.first_name;
      }
    });

    set_production_officer(e.target.value);
    set_production_officer_first_name(x[0].first_name);
    set_production_officer_last_name(x[0].last_name);
  };
  return (
    <>
      <span>*** New Production *** </span>

      <Row>
        <div>
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        {/* */}
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="production_input">
              <Form.Label>Input</Form.Label>
              <Form.Control
                type="number"
                step="any"
                required
                placeholder="production_input"
                defaultValue={production_input}
                onChange={(e) =>
                  set_production_input(parseFloat(e.target.value))
                }
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="expected_output">
              <Form.Label>Expected Output</Form.Label>
              <Form.Control
                type="number"
                step="any"
                required
                placeholder="Expected Output"
                defaultValue={expected_output}
                onChange={(e) =>
                  set_expected_output(parseFloat(e.target.value))
                }
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="production_date">
              <Form.Label>Production Date</Form.Label>
              <Form.Control
                type="date"
                required
                placeholder="production_date"
                value={production_date}
                onChange={handleProductionDate}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="Naration">
              <Form.Label>Shift</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="Shift"
                value={shift}
                onChange={(e) => set_shift(e.target.value)}
              >
                <option value={""}>Shift</option>
                {
                  <>
                    <option value={"day"}>Day</option>
                    <option value={"night"}>Night</option>
                  </>
                }
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="production_officer">
              <Form.Label>Production officer</Form.Label>
              <Form.Select
                required
                type="number"
                placeholder="Officer "
                value={production_officer}
                onChange={hadleProductionOfficer}
              >
                <option value={""}>Production Officer</option>
                {staff?.data.map((item, index) => (
                  <>
                    <option key={index} value={parseInt(item.staff_id)}>
                      {item.first_name}
                    </option>
                  </>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="Store">
              <Form.Label>Store</Form.Label>
              <Form.Select
                required
                type="number"
                placeholder="Officer "
                value={store_code}
                onChange={(e) => set_store_code(parseInt(e.target.value))}
              >
                <option value={""}>Store</option>
                {store?.data
                  .filter((item) => item.store_name == "Raw Material Store")
                  .map((item, index) => (
                    <>
                      <option
                        key={index}
                        value={item.store_code}
                      >{`${item.store_code} | ${item.store_name}`}</option>
                    </>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          submit
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default CreateProductionHeader;
