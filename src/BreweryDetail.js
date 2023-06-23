import { useContext } from "react";
import { AppContext } from "./App";
import { Category, OfficialLink, GetDirection, DetailDiv, SpaceDiv, OfficialLinkDiv } from "./Styled";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';


export default function BreweryDetail() {
  const { brewery } = useContext(AppContext);

  const ApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: ApiKey
  });

  const address = `${brewery.street}, ${brewery.city}, ${brewery.state_province} ${brewery.postal_code}`;
  
  if(isLoaded) return (
    <DetailDiv>
      <div>
        <h3>{brewery.name}</h3>
        <SpaceDiv>
          <Category>Address</Category>
          <span>{address}</span>
        </SpaceDiv>
        <SpaceDiv>
          <Category>Country</Category>
          <span>{brewery.country}</span>
        </SpaceDiv>
        <SpaceDiv>
          <Category>Phone Number</Category>
          <span>{brewery.phone}</span>
        </SpaceDiv>
        <SpaceDiv>
          <Category>Brewery Type</Category>
          {`${brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.slice(1)}` === 'Closed' ? <Category theme='red' boldness='normal'>{brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.slice(1)}</Category> : <span>{brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.slice(1)}</span>}
        </SpaceDiv>
        <OfficialLinkDiv>
          <OfficialLink href={brewery.website_url} target="_blank">{brewery.name} Official Website</OfficialLink>
        </OfficialLinkDiv>
        <div>
          <GetDirection onClick={() => {window.open(`https://maps.google.com?q=${brewery.name}`)}}>Get Directions</GetDirection>
        </div>
      </div>
      <div id='map'>
          <Map />
      </div>
    </DetailDiv>
  );
}

const Map = () => {
  const { brewery } = useContext(AppContext);

  const position = {lat: Number(brewery.latitude), lng: Number(brewery.longitude)};
  const icon = {
    url: 'https://cdn2.iconfinder.com/data/icons/map-locations-colored-outlined-pixel-perfect/64/pin-map-location-08-512.png',
    scaledSize: new window.google.maps.Size(35, 35)
  }
  
  if(brewery.longitude !== null && brewery.latitude !== null) {
    return (
      <GoogleMap zoom={14} center={position} mapContainerClassName='map-container'>
        <Marker 
        position={position} 
        title={brewery.name} 
        label={{text: brewery.name, color: 'darkred', className:'marker-label'}}
        animation={window.google.maps.Animation.DROP}
        icon={icon}
        />
      </GoogleMap>
    )
  }
}