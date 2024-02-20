import React from 'react';
//import { useGetTodosQuery } from './apiSlice';
import Loader from '../../../components/Loader';
import { useGetAllInstitutionsQuery } from '../../../slices/administration/institutionsApiSlice';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

const InstitutionList = () => {
    const { data, isLoading } = useGetAllInstitutionsQuery();
    console.log(data)

   

    return (
        <>
       <p>*** All Institutions ****</p>
        <Table striped style={{border:"1px solid #ccc"}}>
       <thead>
         <tr>
           <th>#</th>
           <th>Name</th>
           <th>Email</th>
           <th>Phone Number</th>
           <th>Location</th>
           <th>Code</th>
           <th>Edit</th>
           <th>View</th>
         </tr>
       </thead>
       <tbody>
          {isLoading? <Loader/>:data.data.map((user, index)=>(
         <tr>
           <td>{index + 1}</td>
           <td>{user.institution_name}</td>
           <td>{user.institution_email}</td>
           <td>{user.institution_phone_number}</td>
           <td>{user.institution_location}</td>
           <td>{user.institution_code}</td>
           <td><Link to='#'><CiEdit/></Link></td>
           <td><Link to='#'><IoMdEye/></Link></td>
         </tr>
         ))}
       </tbody>
     </Table>
       </>
    );
};
export default InstitutionList