import React, { useState, useEffect, useMemo } from "react";
import Table from "react-bootstrap/Table";
import { useGetAllPackHousePeopleQuery } from "../../../../slices/production/packHousePeopleApiSlice";
import { IoMdHeartEmpty } from "react-icons/io";
import { useGeneralQuery } from "../../../../slices/administration/staffApiSlice";
import { IoMdEye } from "react-icons/io";
import moment from "moment";
import DataTable from "../../../../components/general/DataTable";

const PackHouse = ({ staff_list, set_staff_list, removeStaff }) => {
  const { data: pack_housepeople } = useGetAllPackHousePeopleQuery();
  const [tableData, setTableData] = useState([]);

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
              <th>Remove Staff</th>
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

export default PackHouse;
