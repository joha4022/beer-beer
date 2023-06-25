import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import { Megah1, Megah3, DiscoverButton } from './Styled';
import Loading from './Loading';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

export default function Homepage() {
  const ApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { setCurrentLoc, currentLoc } = useContext(AppContext);
  const [ geolocStatus, setGeolocStatus ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' })
    .then(status => {
      if (status.state === 'granted') {
        setGeolocStatus('granted');
      } else {
        setGeolocStatus('denied');
      }
    })

    if (sessionStorage.getItem('currentLoc') === null) {
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
              sessionStorage.setItem('currentLoc', JSON.stringify({
                city: `${locationArray[1].replace(/.$/, '')}`,
                country: `${locationArray[locationArray.length - 1]}`,
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }))
            })
        })
      }
    } else {
      let currentLocation = JSON.parse(sessionStorage.getItem('currentLoc'));
      setCurrentLoc({
        city: `${currentLocation.city}`,
        country: `${currentLocation.country}`,
        lat: currentLocation.lat,
        lng: currentLocation.lng
      });
    }
  }, [])

    if (geolocStatus && currentLoc.city) {
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
    } else if(geolocStatus === 'denied') {
      return (
        <>
          <div className='homepage'>
            <Megah1>Looking for breweries?</Megah1>
            <Megah3>Welcome to Beer Beer!</Megah3>
            <h4>Allow your location to discover local breweries.</h4>
          </div>
        </>
      )
    } else {
      return (<Loading />)
    }
}