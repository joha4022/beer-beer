import { useContext, useEffect } from "react";
import { AppContext } from "./App";
import { Category, BreweryBox, SpaceDiv, PageNumber, LocalBreweryBox } from "./Styled";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Loading from "./Loading";

export default function LocalBreweries() {
  const { currentLoc, breweryList, setBrewery, setCurrentPage, currentList, setCurrentList, setBreweryList, currentPage } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const ApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: ApiKey
  });

  useEffect(() => {
    if (currentLoc) {
      fetch(`https://api.openbrewerydb.org/v1/breweries/search?query=${currentLoc.city}&per_page=200`)
        .then(res => res.json())
        .then(data => {
          setBreweryList(data);
          setCurrentList(data.slice(0, 20));
        })
    } else {
      fetch(`https://api.openbrewerydb.org/v1/breweries?per_page=200`)
        .then(res => res.json())
        .then(data => {
          setBreweryList(data);
          setCurrentList(data.slice(0, 20));
        })
    }
  }, [])

  const pageHandler = (page) => {
    setCurrentPage(page);
    setCurrentList(breweryList.slice((page - 1) * 20, ((page - 1) * 20) + 20));
    console.log(page, (page - 1) * 20, ((page - 1) * 20) + 20);
  }

  if (currentList && isLoaded) {
    return (
      <>
        <div className="results-box">Results: {breweryList.length} breweries</div>
        <div className="page-box">
          {breweryList.map((e, i) => {
            if (i % 20 === 0) {
              return (<PageNumber theme={Number(location.pathname.split('/')[2]) === i/20+1 ? 'active': ''} key={i} id={i / 20 + 1} onClick={(event) => {
                pageHandler(event.target.id);
                navigate(`/local-breweries/${event.target.id}`);
              }}>{i / 20 + 1}</PageNumber>)
            }
          })}
        </div>
        <div className="result-map-box">
          <div className='local-brewery-box'>
            {currentList.map((b, i) => {
              return (
                <LocalBreweryBox key={i} className='brewery' onClick={() => {
                  navigate(`/brewery/${b.id}`);
                  setBrewery(b);
                }}>
                  <h3>{b.name}</h3>
                  <SpaceDiv>
                    <Category>Address</Category>
                    <span>{b.street}, {b.city}, {b.state_province} {b.postal_code}</span>
                  </SpaceDiv>
                  <SpaceDiv>
                    <Category>Phone Number</Category>
                    <span>{b.phone}</span>
                  </SpaceDiv>
                  <SpaceDiv>
                    <Category>Brewery Type</Category>
                    {`${b.brewery_type.charAt(0).toUpperCase() + b.brewery_type.slice(1)}` === 'Closed' ? <Category theme='red' boldness='normal'>{b.brewery_type.charAt(0).toUpperCase() + b.brewery_type.slice(1)}</Category> : <span>{b.brewery_type.charAt(0).toUpperCase() + b.brewery_type.slice(1)}</span>}
                  </SpaceDiv>
                </LocalBreweryBox>
              )
            })}
          </div>
          <div className="spacer">
          spacer
          </div>
          <div className="local-breweries-map">
            <Map />
          </div>
        </div>
        <div className="page-box">
          {breweryList.map((e, i) => {
            if (i % 20 === 0) {
              return (<PageNumber theme={Number(location.pathname.split('/')[2]) === i/20+1 ? 'active': ''}  key={i} id={i / 20 + 1} onClick={(event) => {
                window.scrollTo(0, 0);
                pageHandler(event.target.id);
                navigate(`/local-breweries/${event.target.id}`);
              }}>{i / 20 + 1}</PageNumber>)
            }
          })}
        </div>
      </>
    )
  } else {
    return (<Loading />)
  }
}

const Map = () => {
  const { currentList, currentLoc } = useContext(AppContext);

  const position = { lat: Number(currentLoc.lat), lng: Number(currentLoc.lng) };
  const icon1 = {
    url: 'https://cdn2.iconfinder.com/data/icons/map-locations-colored-outlined-pixel-perfect/64/pin-map-location-08-512.png',
    scaledSize: new window.google.maps.Size(35, 35)
  }
  const icon2 = {
    url: 'https://uploads-ssl.webflow.com/62c5e0898dea0b799c5f2210/62e8212acc540f291431bad2_location-icon.png',
    scaledSize: new window.google.maps.Size(35, 35)
  }

  return (
    <GoogleMap zoom={10} center={position} mapContainerClassName='map-container-local'>
      {currentList.map((e, i) => {
        return (
          <Marker
            position={{ lat: Number(e.latitude), lng: Number(e.longitude) }}
            title={e.name}
            label={{ text: e.name, color: 'darkred', className: 'marker-label' }}
            animation={window.google.maps.Animation.DROP}
            icon={icon1}
          />
        )
      })}
      <Marker
        position={{ lat: Number(currentLoc.lat), lng: Number(currentLoc.lng) }}
        animation={window.google.maps.Animation.DROP}
        icon={icon2}
      />
    </GoogleMap>
  )
}