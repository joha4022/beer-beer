import { useContext } from "react";
import { AppContext } from "./App";
import { Category, OfficialLink } from "./Styled";

export default function BreweryDetail() {
  const { brewery } = useContext(AppContext);
  const google = window.google;
  const map = new window.google.maps;

  return (
    <>
      <div>
        <h3>{brewery.name}</h3>
        <div>
          <Category>Address: </Category><span>{brewery.street}, {brewery.city}, {brewery.state_province} {brewery.postal_code}</span>
        </div>
        <div>
          <Category>Country: </Category><span>{brewery.country}</span>
        </div>
        <div>
          <Category>Phone: </Category><span>{brewery.phone}</span>
        </div>
        <div>
          <Category>Brewery Type: </Category><span>{brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.slice(1)}</span>
        </div>
        <OfficialLink href={brewery.website_url}>Official Website</OfficialLink>
        <div id='map'>

        </div>
      </div>
    </>
  )
}