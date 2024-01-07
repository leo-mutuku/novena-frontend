import React, {useState, useEffect}from 'react'
import {Form, Button,Row, Col } from 'react-bootstrap'
import { useCreateItemMutation } from '../../../slices/store/itemregisterApiSlice';

import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateItemList() {
    const [item_code, set_item_code]=useState('');
    const [item_name, set_item_name]=useState('');
    const [item_units, set_item_units]=useState('');
    const [item_units_value, set_item_units_value]=useState('');
    const [item_units_abbreaviations, set_item_units_abbreaviations]=useState('');
    const [prevoius_price, set_prevoius_price]=useState('');
    const [current_price, set_current_price]=useState('');
    const [account_number, set_account_number]=useState('');
    const [created_by, set_created_by]=useState('');

    const [createItem, { isLoading }] = useCreateItemMutation();
    const navigate = useNavigate()
    useEffect(() => {
      navigate()
    },[navigate])
    const handleSubmit =async(e) =>{
        e.preventDefault() 
  
        try {
          const res = await createItem({
            item_code,
            item_name,
            item_units,
            item_units_value,
            item_units_abbreaviations,
            prevoius_price,
            current_price,
            account_number,
            created_by,
          }).unwrap();
          console.log(res);
          navigate('../allregistereditems')
          toast.success('Item created successfully');
          
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
        
    }
  return (
    <>
    <span>*** Create Item ***</span>
     <Row>
     <div> <hr/></div>
     </Row>
    <Form onSubmit={handleSubmit}>

        {/* */}

        <Row>
        <Col>
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
        <Col>
         {/* */}
         <Form.Group className='my-2' controlId='item_name'>
          <Form.Label>Item name</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Item name'
            value={item_name}
            onChange={(e) => set_item_name(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>

        <Col>
         {/* */}
         <Form.Group className='my-2' controlId='item_units'>
          <Form.Label>Item_units (e.g KG)</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Item_units'
            value={item_units}
            onChange={(e) => set_item_units(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>
        </Row>


        <Row>
          <Col>
         {/* staff_number field */}
         <Form.Group className='my-2' controlId='item_units_value'>
          <Form.Label>Item units value</Form.Label>
          <Form.Control
            required
            type='number'
            placeholder='Item units value'
            value={item_units_value}
            onChange={(e) => set_item_units_value(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='my-2' controlId='item_units_abbreaviations'>
          <Form.Label>Item units abbr (e.g 5KG Flr bag)</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Item units abbreaviations'
            value={item_units_abbreaviations}
            onChange={(e) => set_item_units_abbreaviations(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>

        <Col>
        <Form.Group className='my-2' controlId='prevoius_price'>
          <Form.Label>Prevoius price</Form.Label>
          <Form.Control
            required
            type='number'
            placeholder='Prevoius price'
            value={prevoius_price}
            onChange={(e) => set_prevoius_price(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>

        </Row>


        
        <Row>
          <Col>
         {/* staff_number field */}
         <Form.Group className='my-2' controlId='current_price'>
          <Form.Label>Current price</Form.Label>
          <Form.Control
            required
            type='number'
            placeholder='Current price'
            value={current_price}
            onChange={(e) => set_current_price(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='my-2' controlId='account_number'>
          <Form.Label>Account number</Form.Label>
          <Form.Control
            required
            type='number'
            placeholder='Account number'
            value={account_number}
            onChange={(e) => set_account_number(e.target.value)}
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

export default CreateItemList