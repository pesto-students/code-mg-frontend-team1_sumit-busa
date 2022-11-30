import React from 'react';
import { Navigate } from 'react-router-dom';
import { isPresentLocalStorageTokens, userRole } from '../utils/tokensHelper';
import { HOME_ROUTE, LOGIN_ROUTE } from '../utils/routesConstants';

const Landing = () => {
  if (isPresentLocalStorageTokens()) {
    if(userRole() == "ADMIN")
   { return <Navigate to={HOME_ROUTE} />;}
   if(userRole() == "STUDENT")
   { return <Navigate to={HOME_ROUTE} />;}
   if(userRole() == "TEACHER")
   { return <Navigate to={HOME_ROUTE} />;}
  }

  return <Navigate to={LOGIN_ROUTE} />;
};

export default Landing;
