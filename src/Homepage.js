import { useState } from "react";

export default function Homepage() {
    const [ currentLoc, setCurrentLoc ] = useState({
        lat: '',
        long: ''
    });

    const grabLocation = () => {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                setCurrentLoc({
                    lat: `${position.coords.latitude}`, 
                    long: `${position.coords.longitude}`
                })
                console.log(currentLoc);
            })} else {
            alert('please enable geolcation on your chrome');
        }
    }

    return (
        <>
            <h1>Looking for breweries?</h1>
            <h3>Explore Beer Beer!</h3>
            <button onClick={() => {grabLocation()}}>Find local breweries</button>
        </>
    )
}