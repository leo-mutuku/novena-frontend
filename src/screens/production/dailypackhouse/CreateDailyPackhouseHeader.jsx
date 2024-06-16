import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateDailyProductionHeaderMutation } from "../../../slices/production/dailyPackhouseHeadersApiSlice";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { useGetAllproductSetupQuery } from "../../../slices/productionsetup/productSettingApliSlice";
import { useGetAllPackTypeQuery } from "../../../slices/packhousesetup/packTypeSettingApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateDailyPackhouseHeader() {
  const [batch_no, set_batch_no] = useState("");
  const [pack_date, set_pack_date] = useState("");
  const [pack_type, set_pack_type] = useState(null);
  const [pack_officer, set_pack_officer] = useState("");
  const [product_code, set_product_code] = useState("");

  const [created_by, set_created_by] = useState("");

  const [DailyProductionHeader, { isLoading }] =
    useCreateDailyProductionHeaderMutation();
  const { data: pack_types } = useGetAllPackTypeQuery();
  const { data: allItemRegister } = useGetAllItemRegisterQuery();
  const { data: allProductionProductSetup } = useGetAllproductSetupQuery();
  const { data: staff } = useGetAllStaffQuery();
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
      const res = await DailyProductionHeader({
        pack_type,
        batch_no,
        pack_date,

        pack_officer,
        product_code,
        created_by,
      }).unwrap();

      navigate("../alldailypackhouse");
      toast.success("Daily Packhouse  Intiated Successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** New Daily Pack House *** </span>

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
            <Form.Group className="my-2" controlId="pay_per_bale">
              <Form.Label>Batch no.</Form.Label>
              <Form.Control
                required
                style={{ textTransform: "uppercase" }}
                type="text"
                placeholder="Enter Batch no."
                value={batch_no}
                onChange={(e) => set_batch_no(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="pay_per_bale">
              <Form.Label>Item Name.</Form.Label>
              <Form.Select
                required
                type="text"
                placeholder="Enter Batch no."
                value={product_code}
                onChange={(e) => set_product_code(e.target.value)}
              >
                <option>Select Product</option>
                {allProductionProductSetup?.data?.map((item, index) => (
                  <>
                    <option key={index} value={item.product_code}>
                      {allItemRegister?.data.map((item2, index) => {
                        if (item2.item_code == item.product_code) {
                          return item2.item_name;
                        }
                      })}
                    </option>
                  </>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="route_id">
              <Form.Label>Pack Type</Form.Label>
              <Form.Select
                type="text"
                required
                value={pack_type}
                onChange={(e) => set_pack_type(e.target.value)}
              >
                <option value={""}>Select Pack Type</option>
                {pack_types?.data.map((item, key) => (
                  <option key={key} value={item.pack_type_seeting_id}>
                    {item.pack_type_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="pack_date">
              <Form.Label>Pack Date</Form.Label>
              <Form.Control
                type="date"
                required
                placeholder="Pack Date"
                value={pack_date}
                onChange={(e) => set_pack_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="pack_officer">
              <Form.Label>Pack Officer</Form.Label>
              <Form.Select
                required
                type="text"
                placeholder=""
                value={pack_officer}
                onChange={(e) => set_pack_officer(e.target.value)}
              >
                <option value={""}>Staff</option>
                {staff?.data.map((item, index) => (
                  <>
                    <option key={index} value={item.staff_id}>
                      {item.first_name}
                    </option>
                  </>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-3">
          submit
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
}

export default CreateDailyPackhouseHeader;
