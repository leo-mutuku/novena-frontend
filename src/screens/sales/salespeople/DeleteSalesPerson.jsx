import React, { useEffect } from "react";
import { useGetAllStaffByIdQuery } from "../../../slices/administration/staffApiSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DeleteSalesPerson = () => {
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const [salesPeson] = useGetAllStaffByIdQuery(id);
  useEffect(async () => {
    if (id) {
      await salesPeson({
        id,
      }).unwrap();
    }
  }, [id]);
  return <div></div>;
};

export default DeleteSalesPerson;
