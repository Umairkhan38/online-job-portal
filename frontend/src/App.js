import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import {CssBaseline, ThemeProvider} from '@mui/material';
import {theme} from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogIn from "./Pages/Login";
import UserDashboard from "./Pages/user/userDashboard";


function App() {
  return (
    <div className="App">
     <ToastContainer />
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Home/>} />
        <Route  path='/login' element={<LogIn />} />
        <Route path='/search/location/:location' element={<Home />} />
        <Route path='/search/:keyword' element={<Home />} />
        <Route path='/user/dashboard' element={<UserDashboard />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
