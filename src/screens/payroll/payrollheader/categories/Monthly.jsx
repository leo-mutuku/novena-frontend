import React, { useEffect, useState, useMemo } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useGeneralQuery } from "../../../../slices/administration/staffApiSlice";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import moment from "moment";
import DataTable from "../../../../components/general/DataTable";

const Monthly = ({ staff_list, set_staff_list, removeStaff }) => {
  const { data: production_people } = useGeneralQuery();
  const [tableData, setTableData] = useState([]);
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
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {staff_list?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.staff_id}</td>
                <td onClick={() => removeStaff(item.staff_id)}>Remove</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Monthly;
