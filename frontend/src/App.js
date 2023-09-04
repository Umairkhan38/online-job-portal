import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import {CssBaseline, ThemeProvider} from '@mui/material';
import {theme} from './theme';


function App() {
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
