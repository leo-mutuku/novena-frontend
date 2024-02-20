import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useGetAllPackHousePeopleQuery } from "../../../../slices/production/packHousePeopleApiSlice";
import { IoMdHeartEmpty } from "react-icons/io";

const PackHouse = ({ staff_list, set_staff_list }) => {
  const { data: pack_housepeople } = useGetAllPackHousePeopleQuery();
  const [staff, set_staff] = useState(false);
  useEffect(() => {
    if (pack_housepeople) {
      set_staff_list(pack_housepeople.data);
    }
  }, [pack_housepeople]);
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
            {pack_housepeople?.data.map((item, index) => (
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

export default PackHouse;
