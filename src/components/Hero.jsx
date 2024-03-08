import { Container, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
    }
  }, [userInfo]);

  const handleSignIn = (e) => {};

  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">NOVENA MAIZE MILLER LTD</h1>
          <p className="text-center mb-4">
            {userInfo
              ? `Welcome back ${userInfo.first_name}!`
              : "Login to get started!"}
          </p>
          <div className="d-flex">
            {userInfo ? (
              <Link to={"/securedhome"}>
                {" "}
                <Button variant="primary" className="me-3">
                  Home page
                </Button>{" "}
              </Link>
            ) : (
              <Link to={"/login"}>
                <Button
                  variant="primary"
                  className="me-3"
                  onClick={(e) => handleSignIn}
                >
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
