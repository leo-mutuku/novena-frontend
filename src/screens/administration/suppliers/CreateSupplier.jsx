import React, {useState, useEffect}from 'react'
import {Form, Button,Row, Col } from 'react-bootstrap'
import { useCreateSupplierMutation } from '../../../slices/administration/suppliersApiSlice';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateSupplier() {


    const [supplier_email, set_supplier_email]=useState('');
    const [supplier_name, set_supplier_name]=useState('');
    const [supplier_phone_number, set_supplier_phone_number]=useState('');
    const [supplier_location, set_supplier_location]=useState('');
    const [item_supplied_code, set_item_supplied_code]=useState('');

    const [createSupplier, { isLoading }] = useCreateSupplierMutation();
    const navigate = useNavigate()
    useEffect(() => {
      navigate()
    },[navigate])
    const handleSubmit =async(e) =>{
        e.preventDefault() 
  
        try {
          const res = await createSupplier({
            supplier_email,
            supplier_name,
            supplier_phone_number,
            supplier_location,
            item_supplied_code,
          }).unwrap();
          console.log(res);
          navigate('../allsuppliers')
          toast.success('Supplier created successfully');
          
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
        
    }
  return (
    <>
    <span>*** Create Supplier ***</span>
     <Row>
     <div> <hr/></div>
     </Row>
    <Form onSubmit={handleSubmit}>

        {/* */}

        <Row>
        <Col>
        <Form.Group className='my-2' controlId='supplier_email'>
          <Form.Label>Supplier Email</Form.Label>
          <Form.Control
            type='email'
            required
            placeholder='Supplier Email'
            value={supplier_email}
            onChange={(e) => set_supplier_email(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>
        <Col>
         {/* */}
         <Form.Group className='my-2' controlId='supplier_name'>
          <Form.Label>Supplier Name</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Supplier Name'
            value={supplier_name}
            onChange={(e) => set_supplier_name(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>
        </Row>


        <Row>
          <Col>
         {/* staff_number field */}
         <Form.Group className='my-2' controlId='supplier_phone_number'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required
            type='number'
            placeholder='Supplier Phone Number'
            value={supplier_phone_number}
            onChange={(e) => set_supplier_phone_number(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='my-2' controlId='supplier_location'>
          <Form.Label>Supplier location</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Supplier location'
            value={supplier_location}
            onChange={(e) => set_supplier_location(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>

        <Col>
        <Form.Group className='my-2' controlId='item_supplied_code'>
          <Form.Label>Item supplied code</Form.Label>
          <Form.Control
            required
            type='number'
            placeholder='Item supplied code '
            value={item_supplied_code}
            onChange={(e) => set_item_supplied_code(e.target.value)}
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

export default CreateSupplier