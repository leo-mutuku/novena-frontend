import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { useGetAllSalesPeopleQuery } from "../../../../slices/sales/salesPeopleApiSlice";
import { IoMdHeartEmpty } from "react-icons/io";
import { MDBCheckbox } from "mdb-react-ui-kit";

const Sales = () => {
  const { data: sales_people } = useGetAllSalesPeopleQuery();
  const [staff, set_staff] = useState(false);
  const [checked, set_checked] = useState([]);
  const handRemoveStaff = (e) => {
    alert(e.target.id);
  };
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
            {sales_people?.data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.staff_ID}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Sales;
