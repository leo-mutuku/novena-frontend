import React, { useRef, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useLogoutMutation } from "../slices/administration/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Idle = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const idleTimerRef = useRef(null);
  const [logoutApiCall] = useLogoutMutation();

  const handleOnIdle = async () => {
    console.log("User is idle");
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
    localStorage.clear();
    console.log("Local storage cleared");
  };

  const handleOnActive = () => {
    console.log("User is active");
  };

  const handleOnAction = () => {};

  useIdleTimer({
    ref: idleTimerRef,
    timeout: 1000 * 30, // 30 seconds
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  return (
    <div>Idle Timer is running. Perform any action to reset the timer.</div>
  );
};

export default Idle;
