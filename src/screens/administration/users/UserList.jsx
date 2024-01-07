import React from 'react';
//import { useGetTodosQuery } from './apiSlice';
import Loader from '../../../components/Loader';
import { useGetUsersQuery } from '../../../slices/administration/usersApiSlice';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FaRegFileExcel } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

const UserList = () => {
    const { data, isLoading  } = useGetUsersQuery();
    return (
      <>
      
       <Table striped style={{border:"1px solid #ccc"}}>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>EMAIL</th>
          <th>Edit</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
         {isLoading? <Loader/>:data.data.map((user, index)=>(
        <tr>
          <td>{index + 1}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.user_email}</td>
          <td><Link to='#'><CiEdit/></Link></td>
          <td><Link to='#'><IoMdEye/></Link></td>
        </tr>
        ))}
      </tbody>
    </Table>
      </>
    )
}
export default UserList