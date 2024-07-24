import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

const PostRequisition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item_list, set_item_list] = useState();

  return (
    <>
      <span> Requisition Number{id}</span>
      <hr></hr>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>Qty</th>
            <th>@</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {item_list?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.staff_id}</td>
              <td onClick={""}>Remove</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default PostRequisition;
