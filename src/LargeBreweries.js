import { useContext, useEffect } from "react";
import { AppContext } from "./App";
import { Category, BreweryBox } from "./Styled";
import { useNavigate } from "react-router-dom";

export default function LargeBreweries() {
  const { breweryList, setBreweryList, setBrewery } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(()=> {
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_type=large`)
      .then(res => res.json())
      .then(data => {
        setBreweryList(data);
    })
  },[])

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
                <div>
                  <Category>Address</Category>
                  <span>{b.street}, {b.city}, {b.state_province} {b.postal_code}</span>
                </div>
                <div>
                  <Category>Phone Number</Category>
                  <span>{b.phone}</span>
                </div>
                <div>
                  <Category>Brewery Type</Category>
                  {`${b.brewery_type.charAt(0).toUpperCase() + b.brewery_type.slice(1)}` === 'Closed' ? <Category theme='red' boldness='normal'>{b.brewery_type.charAt(0).toUpperCase() + b.brewery_type.slice(1)}</Category> : <span>{b.brewery_type.charAt(0).toUpperCase() + b.brewery_type.slice(1)}</span>}
                </div>
              </BreweryBox>
            )
          })}
        </div>
      </>
    )
  }
}