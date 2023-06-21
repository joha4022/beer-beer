import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import { Megah1, Megah3 } from './Styled';

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

  if (currentLoc) return (
    <div className='homepage'>
      <Megah1>Looking for breweries?</Megah1>
      <Megah3>Welcome to Beer Beer!</Megah3>
      <button onClick={() => {
        navigate('/local-breweries');
      }}>Find your local breweries</button>
    </div>
  );
}