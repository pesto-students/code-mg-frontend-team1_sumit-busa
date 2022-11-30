import {Routes,Route}from 'react-router-dom';
import { useEffect,useState } from 'react';
import Login from '../components/Login';
import { DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, ROOT_ROUTE, SUBMISSIONS_ROUTE } from '../utils/routesConstants';
import { isPresentLocalStorageTokens } from '../utils/tokensHelper';

function MyRoutes() {

    // const routesConfig = {
    //     landing: {
    //       path: ROOT_ROUTE,
    //       component: Landing,
    //       exact: true,
    //       privateRoute: false
    //     },
    //     login: {
    //       path: LOGIN_ROUTE,
    //       component: Login,
    //       exact: true,
    //       privateRoute: false
    //     },
    //     home: {
    //       path: [HOME_ROUTE, DASHBOARD_ROUTE,SUBMISSIONS_ROUTE],
    //       component: Home,
    //       exact: true,
    //       privateRoute: true
    //     },
    //   };

    // if(isPresentLocalStorageTokens()){
    // }
    // useEffect(() => {
    //     const isUserPresent = isPresentLocalStorageTokens();  
    // },[]);
    
  return (

    <Routes>
        {/* <Route path={ROOT_ROUTE} element={}/> */}
            <Route path = {LOGIN_ROUTE} element={<Login/>} />

    </Routes>


  )
}

export default Routes