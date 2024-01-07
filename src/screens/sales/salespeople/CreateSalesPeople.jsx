import React, {useState, useEffect}from 'react'
import {Form, Button,Row, Col } from 'react-bootstrap'
import { useRegisterStoreMutation } from '../../../slices/store/storeRegisterApiSlice';

import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateSalesPeople() {

    const [store_name, set_store_name]=useState('');
    const [store_code, set_store_code]=useState('');
    const [store_location, set_store_location]=useState('');
    const [created_by, set_created_by]=useState('');

    const [createStore, { isLoading }] = useRegisterStoreMutation();
    const navigate = useNavigate()
    useEffect(() => {

      navigate()
    },[navigate])
    const handleSubmit =async(e) =>{
        e.preventDefault() 
      
       
        try {
          const res = await createStore({
            store_name,
            store_code,
            store_location,
            created_by,
          }).unwrap();
          console.log(res);
          navigate('../allstoreregister')
          toast.success('Store created successfully');
          
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        } 
    }
  return (
    <>
    <span>*** Create Store ***</span>
     <Row>
     <div> <hr/></div>
     </Row>
    <Form onSubmit={handleSubmit}>

        {/* */}

        <Row>
        <Col>
        <Form.Group className='my-2' controlId='store_name'>
          <Form.Label>Store name</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Store name'
            value={store_name}
            onChange={(e) => set_store_name(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>
        <Col>
         {/* */}
         <Form.Group className='my-2' controlId='store_code'>
          <Form.Label>Store code</Form.Label>
          <Form.Control
            type='number'
            required
            placeholder='Store code'
            value={store_code}
            onChange={(e) => set_store_code(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>
        </Row>


        <Row>
          <Col>
         {/* staff_number field */}
         <Form.Group className='my-2' controlId='store_location'>
          <Form.Label>Store location</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Store location'
            value={store_location}
            onChange={(e) => set_store_location(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>
        

        </Row>

       
        <Button type='submit' variant='primary' className='mt-3'>
          submit
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  )
}

export default CreateSalesPeople