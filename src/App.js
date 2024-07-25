import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/assesmentOne/LoginPage';
import Register from './components/assesmentOne/Register';
import Data from './components/assesmentOne/Data';
// import AssesmentTwo from './components/assesmentTwo/AssesmentTwo';
import AssesmentThree from './components/assesmentThree/Demo';
import { useSelector } from 'react-redux';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [register, setRegister] = useState(false);

  return (
    <div>
      {/* Uncomment to use React Router */}
      {/* 
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={isLoggedIn ? <Data /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      */}

      {/* Conditional rendering based on isLoggedIn and register state */}
      {isLoggedIn ? (
        <AssesmentThree />
      ) : (
        !register ? (
          <Login setRegister={setRegister} />
        ) : (
          <Register setRegister={setRegister} />
        )
      )}
    </div>
  );
};

export default App;
