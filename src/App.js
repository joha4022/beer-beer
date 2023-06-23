import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Links from './Links';
import Homepage from './Homepage';
import LocalBreweries from './LocalBreweries';
import BreweryDetail from './BreweryDetail';
import Breweries from './Breweries';
import './App.css';

export const AppContext = createContext();

export default function App() {
  const [breweryList, setBreweryList] = useState(false);
  const [currentLoc, setCurrentLoc] = useState(false);
  const [brewery, setBrewery] = useState(false);
  const [searchQuery, setSearchQuery] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentList, setCurrentList] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [searchResultList, setSearchResultList] = useState(false);

  return (
    <AppContext.Provider value={{
      breweryList,
      setBreweryList,
      currentLoc,
      setCurrentLoc,
      brewery,
      setBrewery,
      searchQuery,
      setSearchQuery,
      currentPage,
      setCurrentPage,
      currentList,
      setCurrentList,
      searchResult,
      setSearchResult,
      searchResultList,
      setSearchResultList
    }}>
      <Router >
        <div className='main'>
          <a className='title' href='http://localhost:3000/'><h1 className='beer-beer'>Beer Beer</h1><img className='title-img' src='../images/beer.png'></img></a>
          <div className='current-city'>
            {
              currentLoc ? `Current city: ${currentLoc.city}` : `Location Access Disabled`
            }
          </div>
          <div className='link-bar'>
            <Links />
          </div>
        </div>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/breweries/:id' element={<Breweries />} />
          <Route path='/local-breweries/:id' element={<LocalBreweries />} />
          <Route path='/brewery/:id' element={<BreweryDetail />} />
        </Routes>
        <footer>
          <h5>Beer Beer</h5>
          <p><i>Beer Beer is a single page application project using Open Brewery DB, developed June 2023.</i></p>
          <a id="githubBox" href="https://github.com/joha4022/beer-beer" target="_blank"><img id="githubIcon" src="../images/25231.png"></img></a>
        </footer>
      </Router>
    </AppContext.Provider>
  );
}
