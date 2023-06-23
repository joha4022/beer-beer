import { useContext } from "react";
import { AppContext } from "./App";
import { Category, BreweryBox, SpaceDiv, PageNumber } from "./Styled";
import { useNavigate,useLocation } from "react-router-dom";

export default function Breweries() {
  const { setBrewery, setCurrentPage, searchResult, setSearchResultList, searchResultList } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const pageHandler = (page) => {
    setCurrentPage(page);
    setSearchResultList(searchResult.slice((page - 1) * 20, ((page - 1) * 20) + 20));
    console.log(page, (page - 1) * 20, ((page - 1) * 20) + 20);
  }

  if (searchResult) {
    return (
      <>
        <div className="results-box">Results: {searchResult.length} breweries</div>
        <div className="page-box">
          {searchResult.map((e, i) => {
            if (i % 20 === 0) {
              return (<PageNumber theme={Number(location.pathname.split('/')[2]) === i/20+1 ? 'active': ''}  key={i} id={i / 20 + 1} onClick={(event) => {
                pageHandler(event.target.id);
                navigate(`/breweries/${event.target.id}`);
              }}>{i / 20 + 1}</PageNumber>)
            }
          })}
        </div>
        <div className='brewery-box'>
          {searchResultList.map((b, i) => {
            return (
              <BreweryBox key={i} className='brewery' onClick={() => {
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
        <div className="page-box">
          {searchResult.map((e, i) => {
            if (i % 20 === 0) {
              return (<PageNumber theme={Number(location.pathname.split('/')[2]) === i/20+1 ? 'active': ''}   key={i} id={i/20+1} onClick={(event) => {
                window.scrollTo(0,0);
                pageHandler(event.target.id);
                navigate(`/breweries/${event.target.id}`);
              }}>{i/20+1}</PageNumber>)
            }
          })}
        </div>
      </>
    )
  } else {
    return (
      <div className="loading">
        <img src='../images/beer (2).png'></img>
        <h2 className="brewingh2">No search results to brew...</h2>
      </div>
    )
  }
}