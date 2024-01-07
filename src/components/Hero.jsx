import { Container, Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Hero = () => {

  
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
     
    }
  }, [userInfo]);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Novena Millers</h1>
          <p className='text-center mb-4'>
            {userInfo? `Welcome back ${userInfo.first_name}!` : 'Login to get started!'}
          </p>
          <div className='d-flex'>
            <Button variant='primary' href='/login' className='me-3'>
              {userInfo?`Home page!`: 'Sign In!'}
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
