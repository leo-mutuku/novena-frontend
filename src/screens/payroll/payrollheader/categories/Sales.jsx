import React, { useEffect, useState, useMemo } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useGetAllSalesPeopleQuery } from "../../../../slices/sales/salesPeopleApiSlice";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import moment from "moment";
import DataTable from "../../../../components/general/DataTable";
const Sales = ({ staff_list, set_staff_list, removeStaff }) => {
  const { data: sales_people } = useGetAllSalesPeopleQuery();
  const [staff, set_staff] = useState(false);
  const [checked, set_checked] = useState([]);
  const [tableData, setTableData] = useState([]);

  const handRemoveStaff = (e) => {
    alert(e.target.id);
  };
  useEffect(() => {
    if (sales_people?.data) {
      set_staff_list(sales_people.data);
      setTableData(sales_people.data);
    }
  }, [sales_people]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Payroll no",
        accessor: "payroll_header_id",
      },

      {
        Header: "Created At",
        accessor: "created_at",
        Cell: ({ value }) => (
          <span>{`${moment(value).format("YYYY-MM-DD")} : ${moment(
            value
          ).format("HH:mm A")}`}</span>
        ),
      },

      {
        Header: "Staff Count",
        accessor: "number_of_staff",
      },
      {
        Header: "Gross Pay",
        accessor: "gross_pay",
      },
      {
        Header: "Net pay",
        accessor: "net_pay",
      },
      {
        Header: "Deductions",
        accessor: "total_deductions",
      },

      {
        Header: "View",
        accessor: "view",
        Cell: () => (
          <Link to="#">
            <IoMdEye />
          </Link>
        ),
      },
    ],
    []
  );

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

export default Sales;
