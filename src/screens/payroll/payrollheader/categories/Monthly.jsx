import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { useGeneralQuery } from "../../../../slices/administration/staffApiSlice";
import { IoMdHeartEmpty } from "react-icons/io";
import { MDBCheckbox } from "mdb-react-ui-kit";

const Monthly = () => {
  const { data: general } = useGeneralQuery();
  const [staff, set_staff] = useState(false);

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
              <th>Add Staff</th>
            </tr>
          </thead>
          <tbody>
            {general?.data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.staff_ID}</td>
                <td>
                  <MDBCheckbox
                    id="controlledCheckbox"
                    label=""
                    checked={staff}
                    onChange={() => set_staff(!staff)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Monthly;
