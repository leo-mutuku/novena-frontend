import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/administration/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [user_email, set_user_email] = useState("");
  const [staff_number, set_staff_number] = useState("");
  const [password, set_password] = useState("");
  const [confirm_password, set_confirm_password] = useState("");
  const [phone, set_phone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          first_name,
          last_name,
          user_email,
          staff_number,
          phone,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res.data }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Sign up</h1>
      <Form onSubmit={submitHandler}>
        {/* firs_name field */}
        <Form.Group className="my-2" controlId="last_name">
          <Form.Label>User First Name </Form.Label>
          <Form.Control
            required
            type="first_name"
            placeholder="Enter First Name"
            value={first_name}
            onChange={(e) => set_first_name(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* last_name field */}
        <Form.Group className="my-2" controlId="last_name">
          <Form.Label>User Last Name </Form.Label>
          <Form.Control
            required
            type="last_name"
            placeholder="Enter Last Name"
            value={last_name}
            onChange={(e) => set_last_name(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* email field */}
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter User Email"
            value={user_email}
            onChange={(e) => set_user_email(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* email field */}
        <Form.Group className="my-2" controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => set_phone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* staff number field */}
        <Form.Group className="my-2" controlId="staff_number">
          <Form.Label>Staff Number</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter Staff Number"
            value={staff_number}
            onChange={(e) => set_staff_number(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* password field */}
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => set_password(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* confirm password field */}
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm password"
            value={confirm_password}
            onChange={(e) => set_confirm_password(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
