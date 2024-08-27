import React, { useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { useGetAllPackHousePeopleQuery } from "../../../../slices/production/packHousePeopleApiSlice";

import { useCreateDailyPackhouseLineMutation } from "../../../../slices/production/dailyPackhouseLinesApiSlice";

import { useEffect } from "react";
import { toast } from "react-toastify";

const PostDailyPackHouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const [staff_id, set_staff_id] = useState(null);

  const [quantity, set_quantity] = useState(null);
  const [full_name, set_full_name] = useState(null);
  const [balance, set_balance] = useState(0);
  const [daily_pack_list, set_daily_pack_list] = useState([]);
  const [total, set_total] = useState(0);
  const { data: pack_house_people } = useGetAllPackHousePeopleQuery();

  const [CraeteDailyPack, { error: createdailypackError, isLoading }] =
    useCreateDailyPackhouseLineMutation();

  const handleSubmit = async (e) => {
    try {
      if (!daily_pack_list.length) {
        toast.error("Please add at least one pack house entry");
        return;
      }
      const res = await CraeteDailyPack({
        daily_packhouse_header_id: id,
        daily_pack_list,
      }).unwrap();
      console.log(res.status);
      if (res.status === "success") {
        toast.success(res.message);
        navigate("/production/dailypackhouse/alldailypackhouse");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.data?.message);
    }
  };
  const handleAdd = (e) => {
    if (staff_id && quantity) {
      set_daily_pack_list([
        ...daily_pack_list,
        { staff_id, quantity, full_name, balance },
      ]);
      set_total(total + parseFloat(quantity));
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleStaff = (e) => {
    let x = pack_house_people?.data.map((staff, index) => {
      staff.staff_id == e.target.value
        ? set_full_name(staff.first_name + " " + staff.last_name)
        : null;
      staff.staff_id == e.target.value
        ? set_balance(parseFloat(staff.balance))
        : 0;
      return staff;
    });

    set_staff_id(parseInt(e.target.value));
  };

  const handleDelete = (index) => {
    let x = daily_pack_list?.filter((item, i) => i !== index);
    set_daily_pack_list(x);

    set_total(total - parseFloat(daily_pack_list[index].quantity));
  };

  return (
    <>
      <div>
        <div>Post pack house entries</div>

        {/* */}
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="driver_name">
              <Form.Label>Staff Name</Form.Label>
              <Form.Select
                type="text"
                required
                value={staff_id}
                onChange={handleStaff}
              >
                <option value="">Select Satff name</option>
                {pack_house_people?.data.map((item) => (
                  <option key={item.id} value={item.staff_id}>
                    {item.first_name} - {item.last_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="my-2" controlId="route_id">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                required
                value={quantity}
                onChange={(e) => set_quantity(parseFloat(e.target.value))}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              type="submit"
              variant="primary"
              className="mt-3"
              onClick={handleAdd}
            >
              Add
            </Button>
            &nbsp; &nbsp;
            {total > 0 && (
              <Button
                style={{ marginTop: "10px", color: "white" }}
                variant="secondary"
              >
                {" Total : "}
                {total > 0 ? total : null}
              </Button>
            )}
          </Col>
          <Col></Col>
        </Row>
        {/* {isLoading && <Loader />} */}
        {daily_pack_list.length > 0 && (
          <div className="mt-3">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Staff Name</th>
                  <th>Staff ID</th>
                  <th>Quantity</th>
                  <th>Del</th>
                </tr>
              </thead>
              <tbody>
                {daily_pack_list.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.full_name}</td>
                    <td>{item.staff_id}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Button onClick={() => handleDelete(index)}>Del</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button
              type="submit"
              variant="primary"
              className="mt-3"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default PostDailyPackHouse;
