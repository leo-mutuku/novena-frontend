import React, {useState, useEffect}from 'react'
import {Form, Button,Row, Col } from 'react-bootstrap'
import { useCreateStoreItemMutation } from '../../../slices/store/storeItemsApiSlice';

import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateStoreItemslist() {


    const [store_code, set_store_code]=useState('');
    const [item_code, set_item_code]=useState('');
    const [item_quantity, set_item_quantity]=useState('');

    const [createStoreItem, { isLoading }] = useCreateStoreItemMutation();
    const navigate = useNavigate()
    useEffect(() => {

      navigate()
    },[navigate])
    const handleSubmit =async(e) =>{
        e.preventDefault() 
      
       
        try {
          const res = await createStoreItem({
            store_code,
            item_code,
            item_quantity,
          }).unwrap();
          console.log(res);
          navigate('../allstoreitems')
          toast.success('Store  Item created successfully');
          
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        } 
    }
  return (
    <>
    <span>*** Create Store Item ***</span>
     <Row>
     <div> <hr/></div>
     </Row>
    <Form onSubmit={handleSubmit}>

        {/* */}

        <Row>
        <Col>
        <Form.Group className='my-2' controlId='store_code'>
          <Form.Label>Store code</Form.Label>
          <Form.Control
            type='number'
            required
            placeholder='store_code'
            value={store_code}
            onChange={(e) => set_store_code(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>
        <Col>
         {/* */}
         <Form.Group className='my-2' controlId='item_code'>
          <Form.Label>Item code</Form.Label>
          <Form.Control
            type='number'
            required
            placeholder='Item code'
            value={item_code}
            onChange={(e) => set_item_code(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>
        </Row>


        <Row>
          <Col>
         {/* staff_number field */}
         <Form.Group className='my-2' controlId='item_quantity'>
          <Form.Label>Item quantity</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Item quantity'
            value={item_quantity}
            onChange={(e) => set_item_quantity(e.target.value)}
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

export default CreateStoreItemslist