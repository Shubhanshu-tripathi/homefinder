// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ConfigContextProvider from './Context/ConfigContext';
import Owner from './Pages/Owner';
import OwnerProfile from './Pages/OwnerProfile';


const App = () => {
  return (
    <>
      <ConfigContextProvider>
        <Register />
         <Login /> 
        <Owner />
        <OwnerProfile/>
       </ConfigContextProvider>
    </>
  );
};

export default App;
