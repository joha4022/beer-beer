import { Link } from 'react-router-dom';

export default function Links() {
    return(
        <>
            <Link to='/'>Home</Link>
            <Link to='/local-breweries'>Local Breweries</Link>
            <Link to='/micro-breweries'>Micro Breweries</Link>
            <Link to='/large-breweries'>Large Breweries</Link>
            <Link to='/brewpub'>Brew Pubs</Link>
        </>
    )

}