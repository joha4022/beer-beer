import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Links from './Links';
import Homepage from './Homepage';
import MicroBreweries from './MicroBreweries';
import LargeBreweries from './LargeBreweries';
import BrewPubs from './BrewPubs';
import './App.css';


export default function App() {
  return (
    <Router >
      <h1>Beer Beer</h1>
      <div className='link-bar'>
        <Links />
      </div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/micro-breweries' element={<MicroBreweries />} />
        <Route path='/large-breweries' element={<LargeBreweries />} />
        <Route path='/brewpub' element={<BrewPubs />} />
      </Routes>
    </Router>
  );
}
