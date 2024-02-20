import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useProductionQuery } from "../../../../slices/administration/staffApiSlice";
import { IoMdHeartEmpty } from "react-icons/io";
import { MDBCheckbox } from "mdb-react-ui-kit";

const Production = ({ staff_list, set_staff_list }) => {
  const { data: production_people } = useProductionQuery();
  const [staff, set_staff] = useState(false);
  const [checked, set_checked] = useState([]);

  const handRemoveStaff = (e) => {
    alert(e.target.id);
  };
  useEffect(() => {
    if (production_people) {
      set_staff_list(production_people.data);
    }
  }, [production_people]);

  return (
    <>
      <div>
        {" "}
        <hr></hr>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Staff No</th>
            </tr>
          </thead>
          <tbody>
            {production_people?.data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.staff_id}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Production;
