import React from "react";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

import Blog from "./blog";
import Login from "./templates/sign-in-side/SignInSide";
import Suscribete from "./templates/sign-up/SignUp";
import Dashboard from "./templates/dashboard/Dashboard";
import Libros from "./templates/dashboard/Libros";
import Usuarios from "./templates/dashboard/Usuarios";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/suscribete" element={<Suscribete />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/dashboard/libros" element={<Libros />}/>
        <Route path="/dashboard/usuarios" element={<Usuarios />}/>
      </Routes>
    
    </Router>
  );
}

export default App;
