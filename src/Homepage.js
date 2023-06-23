import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import { Megah1, Megah3, DiscoverButton } from './Styled';
import Loading from './Loading';

export default function Homepage() {
  const ApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { setCurrentLoc, currentLoc } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${ApiKey}`)
            .then(res => res.json())
            .then(data => {
              let locationArray = data.plus_code.compound_code.split(' ')
              setCurrentLoc({
                city: `${locationArray[1].replace(/.$/, '')}`,
                country: `${locationArray[locationArray.length - 1]}`,
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
              sessionStorage.setItem('currentCity', `${locationArray[1].replace(/.$/, '')}`);
              sessionStorage.setItem('currentCountry', `${locationArray[locationArray.length - 1]}`);
              sessionStorage.setItem('currentLat', position.coords.latitude);
              sessionStorage.setItem('currentLng', position.coords.longitude);
            })
        })
      }
  }, [])

  if (currentLoc.city) {
    return (
      <>
        <div className='homepage'>
          <Megah1>Looking for breweries?</Megah1>
          <Megah3>Welcome to Beer Beer!</Megah3>
          <DiscoverButton onClick={() => {
            navigate('/local-breweries/1');
          }}>Discover your local breweries</DiscoverButton>
        </div>
      </>
    )
  } else {
    return(<Loading />)
  }

}