import React from 'react';
import LoginSignup from '../pages/LoginSignup';
import { useSelector } from 'react-redux';

function AuthWrapper(props) {
  const token = localStorage.getItem('token');
  const userToken = useSelector(state => state?.testSlice?.otpVerification?.token);
  return (
    <>
    {
      userToken || token ? props.children : <LoginSignup />
    }
    </>
  )
}

export default AuthWrapper;
