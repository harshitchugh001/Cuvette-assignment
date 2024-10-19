import React from 'react';
import { useSelector } from 'react-redux';
import LoginSignup from '../pages/LoginSignup';

function AuthWrapper(props) {
  return (
    <>
    {
      false ? props.children : <LoginSignup />
    }
    </>
  )
}

export default AuthWrapper;
