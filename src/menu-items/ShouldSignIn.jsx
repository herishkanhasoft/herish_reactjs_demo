import React from 'react';
import { Outlet, useNavigate } from 'react-router';

const ShouldSignIn = () => {
  const navigate = useNavigate();
  const storedUserData = localStorage.getItem('userData');
  const SignInData = localStorage.getItem('userSignInData');

  // Parse the data back to an object
  const userData = JSON.parse(storedUserData);
  const signInUserData = JSON.parse(SignInData);
  
  return <>{userData || signInUserData ?<Outlet/> : navigate('pages/login/login3')  }</>;
};

export default ShouldSignIn;
