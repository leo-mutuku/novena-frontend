import React from 'react';
//import { useGetTodosQuery } from './apiSlice';
import Loader from '../../../components/Loader';
import { useGetAllSuppliersQuery } from '../../../slices/administration/suppliersApiSlice';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

const SupplierList = () => {
    const { data, isLoading } = useGetAllSuppliersQuery();
    console.log(data)

   

    return (
        <>
        <p>*** All Suppliers ***</p>
        <Table striped style={{border:"1px solid #ccc"}}>
       <thead>
         <tr>
           <th>#</th>
           <th>Name</th>
           <th>Number</th>
           <th>Item Supplied Code</th>
           <th>Email</th>
           <th>Phone Number</th>
           <th>Edit</th>
           <th>View</th>
         </tr>
       </thead>
       <tbody>
          {isLoading? <Loader/>:data.data.map((user, index)=>(
         <tr>
           <td>{index + 1}</td>
           <td>{user.supplier_name}</td>
           <td>{user.supplier_id}</td>
           <td>{user.item_supplied_code}</td>
           <td>{user.supplier_email}</td>
           <td>{user.supplier_phone_number}</td>
           <td><Link to='#'><CiEdit/></Link></td>
           <td><Link to='#'><IoMdEye/></Link></td>
         </tr>
         ))}
       </tbody>
     </Table>
       </>
    );
};
export default SupplierList