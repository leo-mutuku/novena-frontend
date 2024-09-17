// Import FaEnvelope
// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/administration/usersApiSlice";
import { useSmsBalanceMutation } from "../slices/administration/bulkSmsApiSlice";
import { logout } from "../slices/authSlice";

import Idle from "../components/Idle";
import { useEffect, useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaHome, FaEnvelope } from "react-icons/fa";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const [smsBalance] = useSmsBalanceMutation();
  const [credit, set_credit] = useState(null);

  useEffect(() => {
    if (!userInfo) {
    } else {
      const fetchSMSBalance = async () => {
        try {
          const data = await smsBalance().unwrap();
          set_credit(data?.data.credit);
        } catch (err) {
          console.error(err);
        }
      };

      fetchSMSBalance();
    }
  }, [userInfo]);
  const admin_role = userInfo?.roles.includes(9999);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
      console.log("Error logging out");
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <FaHome /> &nbsp;NOVENA
            </Navbar.Brand>
          </LinkContainer>
          <Idle />

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown
                    title={
                      <>
                        &nbsp;{admin_role ? `${credit} SMS` : ``} &nbsp; &nbsp;
                        <FaEnvelope /> &nbsp; &nbsp;
                        <ManageAccountsIcon />
                      </>
                    }
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
