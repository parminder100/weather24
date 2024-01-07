import { useState } from "react";
import "../WeatherSearch/WeatherSearch.css";

const WeatherSearch = ({onSearch}) =>{
    const [city, setCity] = useState("");

    const handleKeyChange = (e) =>{
        if(e.key === "Enter"){
            onSearch(city.toLowerCase());
            setCity("");
        }
    }

    return(
        <>
            <input className="input-field" value={city} onChange={(e)=>setCity(e.target.value)} onKeyPress={handleKeyChange} type="text" />
        </>
    )
}
export default WeatherSearch;