import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { useGetGLByIdQuery } from "../../../slices/finance/glApiSlice";

function UpdateGL() {
  const [gl_name, set_gl_name] = useState("");
  const [gl_number, set_gl_number] = useState("");

  // const [updateVehicle, { isError, isSuccess, error: errorUpdate }] =
  //   useUpdateVehicleMutation();

  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  console.log(typeof id);

  const navigate = useNavigate();

  //call Vehicle get query
  const { data: gl, error, isLoading } = useGetGLByIdQuery(id);
  console.log(error);
  useEffect(() => {
    if (id) {
    }
  }, [id, gl]);

  useEffect(() => {
    if (id) {
      if (gl) {
        set_gl_name(gl.data.gl_name);
        set_gl_number(gl.data.gl_number);
      }
    }
  }, [id, gl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!registration_number && !model && !year) {
      toast.error("Please provide value into each input field");
    } else {
      const dataVehicle = {
        registration_number,
        model,
        year,
      };
      try {
        const result = await updateVehicle({
          id,
          data: dataVehicle,
        }).unwrap();

        toast.success(result.message);

        navigate("../allvehicles");
      } catch (error) {
        toast.error(error.message);
        console.error("Failed to update vehicle:", error);
      }
    }
  };
  return (
    <>
      <span>*** Edit GL ***</span>
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
            <Form.Group className="my-2" controlId="gl_name">
              <Form.Label>GL Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Gl name"
                value={gl_name}
                onChange={(e) => set_gl_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="model">
              <Form.Label>GL Number</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="GL Number"
                value={gl_number}
                onChange={(e) => set_gl_number(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default UpdateGL;
