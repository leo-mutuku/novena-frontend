import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/administration/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [first_name, set_first_name] = useState('');
  const [last_name, set_last_name] = useState('');
  const [user_email, set_user_email] = useState('');
  const [staff_number, set_staff_number] = useState('')
  const [password, set_password] = useState('');
  const [confirm_password, set_confirm_password] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    set_first_name(userInfo.first_name);
    set_last_name(userInfo.last_name);
    set_user_email(userInfo.user_email);
    set_staff_number(userInfo.staff_number)
  }, [userInfo.first_name, userInfo.last_name, userInfo.user_email,userInfo.staff_number]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          user_id: userInfo.user_id,
          first_name,
          last_name,
          user_email,
          staff_number,
          password,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res.data));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Update Profile</h1>

      <Form onSubmit={submitHandler}>

        {/* first_name field */}
        <Form.Group className='my-2' controlId='first_name'>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type='text'
            placeholder='First Name'
            value={first_name}
            onChange={(e) => set_first_name(e.target.value)}
          ></Form.Control>
        </Form.Group>

         {/* last_name field */}
         <Form.Group className='my-2' controlId='last_name'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Last Name'
            value={last_name}
            onChange={(e) => set_last_name(e.target.value)}
          ></Form.Control>
        </Form.Group>

          {/* user_email field */}
        <Form.Group className='my-2' controlId='user_email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='user_email'
            placeholder='Enter email'
            value={user_email}
            onChange={(e) => set_user_email(e.target.value)}
          ></Form.Control>
        </Form.Group>

         {/* staff_number field */}
         <Form.Group className='my-2' controlId='staff_number'>
          <Form.Label>Staff Number</Form.Label>
          <Form.Control
          disabled
            type='number'
            placeholder='Staff Number'
            value={staff_number}
            onChange={(e) => set_staff_number(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => set_password(e.target.value)}
          ></Form.Control>
        </Form.Group>
          

        <Form.Group className='my-2' controlId='confirm_Password'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
           required
            type='password'
            placeholder='Confirm password'
            value={confirm_password}
            onChange={(e) => set_confirm_password(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
