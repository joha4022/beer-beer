import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './App';

export default function Links() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, setSearchResult, setSearchResultList } = useContext(AppContext);

  const search = (searchQuery) => {
    fetch(`https://api.openbrewerydb.org/v1/breweries/search?query=${searchQuery}&per_page=200`)
    .then(res => res.json())
    .then(data => {
      setSearchResult(data);
      setSearchResultList(data.slice(0, 20));
      sessionStorage.setItem('searchResult', JSON.stringify(data));
      sessionStorage.setItem('searchResultList', JSON.stringify(data.slice(0,20)));
    })
    navigate('/breweries/1');
  }

  return (
    <>
      <Link className='navigation-link' to='/'>Home</Link>
      <Link className='navigation-link' to='/breweries/1'>Breweries</Link>
      <Link className='navigation-link' to='/local-breweries/1'>Local Breweries</Link>
      <input className='search-input' placeholder='Search breweries...' onChange={(e) => { 
        setSearchQuery(e.target.value)
      }} 
      onKeyDown={(e)=> {
        if(e.key === 'Enter') {
          search(searchQuery);
          document.querySelector('.search-input').value = '';
        }
      }}
      />
      <button className='search-button' onClick={()=>{
        search(searchQuery);
        document.querySelector('.search-input').value = '';
      }}>Search</button>
    </>
  )
}
