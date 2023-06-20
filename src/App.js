import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Links from './Links';
import Homepage from './Homepage';
import MicroBreweries from './MicroBreweries';
import LargeBreweries from './LargeBreweries';
import BrewPubs from './BrewPubs';
import LocalBreweries from './LocalBreweries';
import BreweryDetail from './BreweryDetail.js';
import './App.css';

export const AppContext = createContext();

export default function App() {
  const [ breweryList, setBreweryList ] = useState(false);
  const [ currentLoc, setCurrentLoc ] = useState(false);
  const [ brewery, setBrewery ] = useState(false);

  return (
    <AppContext.Provider value={ { 
      breweryList, 
      setBreweryList,
      currentLoc,
      setCurrentLoc,
      brewery,
      setBrewery
      } }>
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
          <Route path='/local-breweries' element={<LocalBreweries />} />
          <Route path='/brewery/:id' element={<BreweryDetail />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}
