import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateGlMutation } from "../../../slices/finance/glApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

function CreateWages() {
  const [gl_name, set_gl_name] = useState("");
  const [gl_number, set_gl_number] = useState("");
  const [created_by, set_created_by] = useState("");

  const [createGl, { isLoading }] = useCreateGlMutation();
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
      const res = await createGl({
        gl_name,
        gl_number,
        created_by,
      }).unwrap();

      navigate("../allgl");
      toast.success("Gl created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Gl Account ***</span>
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
              <Form.Label>Gl name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Gl name"
                value={gl_name}
                onChange={(e) => set_gl_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="gl_number">
              <Form.Label>Gl number</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Gl number"
                value={gl_number}
                onChange={(e) => set_gl_number(e.target.value)}
              ></Form.Control>
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

export default CreateWages;
