import React from "react";
import { useParams } from "react-router-dom";

const PostedReturnPreview = () => {
  const { id } = useParams();
  return (
    <>
      <div>PostedReturnPreview {id}</div>
    </>
  );
};

export default PostedReturnPreview;
