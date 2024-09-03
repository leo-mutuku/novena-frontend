import React from "react";
import { useParams } from "react-router-dom";

const RemoveItem = () => {
  const { id } = useParams();

  return <div>RemoveItem</div>;
};

export default RemoveItem;
