import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './App';

export default function Links() {
  const { searchQuery, setSearchQuery } = useContext(AppContext);
  
  const openForm = () => {
    if(document.querySelector('.search-form').style.display === 'block') {
      document.querySelector('.search-form').style.display = 'none';
    } else {
      document.querySelector('.search-form').style.display = 'block';
    }
  }

  return (
    <>
      <div className='link-container'>
        <Link className='navigation-link' to='/'>Home</Link>
        <Link className='navigation-link' to='/local-breweries'>Local Breweries</Link>
        <Link className='navigation-link' to='/micro-breweries'>Micro Breweries</Link>
        <Link className='navigation-link' to='/large-breweries'>Large Breweries</Link>
        <Link className='navigation-link' to='/brewpub'>Brew Pubs</Link>
        <input className='search-input' placeholder='Search...' onChange={(e)=>{setSearchQuery(e.target.value)}}/>
        <button className='search-button'>Search</button>
      </div>
      <div className='search-container'>
        {/* <button className='open-form-button' onClick={() => {openForm()}}>Filtered Search</button>
        <form className='search-form'>
          <p>Search By:</p>
          <input type='radio' id='city' name='searchQuery' /><label>City</label>
          <input type='radio' id='state' name='searchQuery' /><label>State</label>
          <input type='radio' id='country' name='searchQuery' /><label>Country</label>
          <input type='radio' id='name' name='searchQuery' /><label>Name</label>
          <input type='text' id='searchBox' placeholder='Search...'/>
          <input type='button' id='searchButton' value='Search'/>
        </form> */}
      </div>
    </>
  )

}
