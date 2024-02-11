import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { useGetGLByIdQuery } from "../../../slices/finance/glApiSlice";
import { useUpdateGLAccountByIdMutation } from "../../../slices/finance/glApiSlice";

function UpdateGL() {
  const [gl_name, set_gl_name] = useState("");
  const [gl_number, set_gl_number] = useState("");

  const [updateGL, { isError, isSuccess, error: errorUpdate }] =
    useUpdateGLAccountByIdMutation();

  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const navigate = useNavigate();

  //call Vehicle get query
  const { data: gl, error, isLoading } = useGetGLByIdQuery(id);
  console.log(error);
  useEffect(() => {
    if (id && errorUpdate) {
      toast.error(`Error occured `);
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
    console.log(errorUpdate);
    try {
      const result = await updateGL({
        id: id,
        data: { gl_name, gl_number },
      }).unwrap();

      if (result == "failed") {
        toast.error(error.message);
      } else {
        toast.success(result.message);
        navigate("../allgl");
      }
    } catch (error) {
      toast.error(error.message);
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
