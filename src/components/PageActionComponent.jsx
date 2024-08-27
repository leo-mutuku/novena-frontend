import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

function PageActionComponent({ pagemenus }) {
  return (
    <>
      <div style={{ marginBottom: "2px", paddingTop: "10px" }}>
        <span style={{ padding: "3px" }}>
          {pagemenus.map((page, index, arr) => (
            <Link key={index} to={page.to} style={{ textDecoration: "none" }}>
              <Button variant="secondary">{page.pagename}</Button> {}
            </Link>
          ))}
        </span>
        {/* <span style={{ float: "right" }}>
          <Button variant="light">
            <BsFileEarmarkPdf size={18} style={{ color: "orange" }} /> PDF
          </Button>
          <Button variant="light">
            <FaRegFileExcel size={18} style={{ color: "green" }} /> Excel
          </Button>
        </span> */}
      </div>
      <hr></hr>
      <Outlet />
    </>
  );
}

export default PageActionComponent;
