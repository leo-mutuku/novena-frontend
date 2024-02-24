// DataTableComponent.jsx
import React from "react";
import DataTable from "react-data-table-component";

const DataTableComponent = () => {
  const data = [
    { id: 1, name: "John Doe", age: 30, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com" },
    // Add more data as needed
  ];

  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Age",
      selector: "age",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
  ];

  return (
    <div>
      <DataTable title="User Data" columns={columns} data={data} pagination />
    </div>
  );
};

export default DataTableComponent;
