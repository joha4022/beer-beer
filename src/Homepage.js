import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';

export default function Homepage() {
  const { breweryList, setBreweryList, currentLoc, setCurrentLoc } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentLoc({
          lat: `${position.coords.latitude}`,
          long: `${position.coords.longitude}`
        })
      })

    } else {
      alert('please enable geolcation on your chrome');
    }
  }, [])

  if (currentLoc) {
    return (
      <>
        <h1>Looking for breweries?</h1>
        <h3>Explore Beer Beer!</h3>
        <button onClick={() => {
          navigate('/local-breweries');
        }}>Find local breweries</button>
      </>
    )
  }
}