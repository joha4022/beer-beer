import { useContext, useEffect } from "react";
import { AppContext } from "./App";
import { Category, BreweryBox, SpaceDiv } from "./Styled";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function LocalBreweries() {
  const { breweryList, setBreweryList, currentLoc, setCurrentLoc, setBrewery } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(()=> {
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
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_dist=${currentLoc.lat},${currentLoc.long}`)
      .then(res => res.json())
      .then(data => {
        setBreweryList(data);
      })
  },[currentLoc])

  if (breweryList) {
    return (
      <>
        <div className='brewery-box'>
          {breweryList.map((b, i) => {
            return (
              <BreweryBox key={i} className='brewery' onClick={()=>{
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
              </BreweryBox>
            )
          })}
        </div>
      </>
    )
  } else {
    return (<Loading />)
  }
}