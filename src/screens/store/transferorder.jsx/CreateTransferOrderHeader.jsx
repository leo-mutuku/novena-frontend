import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Loader from "../../../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCreateStorePurchaseHeaderMutation } from "../../../slices/purchase/storePurchaseHeadersApiSlice";
import { setCredentials } from "../../../slices/authSlice";
import { toast } from "react-toastify";

function CreateTransaferOrderHeader() {
  const [prepared_by, set_prepared_by] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createStorePurchaseHeader, { isLoading }] =
    useCreateStorePurchaseHeaderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      set_prepared_by(userInfo.first_name);
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    try {
      const res = await createStorePurchaseHeader({ prepared_by }).unwrap();
      navigate("../allstorepurchase");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <p>*** New Transafer Order ***</p>
      <Button onClick={submitHandler}> Initiate</Button>
    </>
  );
}

export default CreateTransaferOrderHeader;
