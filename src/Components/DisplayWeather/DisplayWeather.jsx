import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState} from 'react';
import "../DisplayWeather/DisplayWeather.css";
import Sun from "../../Assets/img/Sun.png";
import Rainy from "../../Assets/img/Rainy.png";
import CloudyAndSunny from "../../Assets/img/CloudyAndSunny.png";
import Clouds from "../../Assets/img/Clouds.png";
import haze from "../../Assets/img/haze.png";
import HourlyForecast from '../HourlyForecast/HourlyForecast';
import WeeklyForecast from '../WeeklyForecast/WeeklyForecast';
import Header from '../Header/Header';
import Slider from '../Slider/Slider';
import Footer from '../Footer/Footer';
import DisplayWeatherSkeleton from '../Loader/DisplayWeatherSkeleton/DisplayWeatherSkeleton';
import DisplayWeatherDetailsSkeleton from '../Loader/DisplayWeatherDetailsSkeleton/DisplayWeatherDetailsSkeleton';

const DisplayWeather = () =>{
    const [weatherData, setWeatherData] = useState([]);
    const [weatherImage, setWeatherImage] = useState(null);
    const [uvIndex, setUvIndex] = useState(null);
    const [sunRiseTime, setSunRiseTime] = useState(null);
    const [sunSetTime, setSunSetTime] = useState(null);
    const [rainfall, setRainfall] = useState(null);
    const [changeTheme, setChangeTheme] = useState(true);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setShowLoader(false);
        },3000)
    },[])

    const handleChangeTheme = () =>{
        setChangeTheme(!changeTheme);
    }

    const fetchWeather = async (city) =>{
        const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        if(!apiKey){
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        setShowLoader(true);
        try {
        const data = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
        );
        const response = await data.json();
        setWeatherData(response);

        if(response.weather && response.weather.length >0){
            const weatherCondition = response.weather[0].main.toLowerCase();

            switch(weatherCondition){
                case "clear":
                    setWeatherImage(Sun);
                    break;
                case "rain":
                    setWeatherImage(Rainy);
                    break;
                case "clouds":
                    setWeatherImage(Clouds);
                    break;
                case "cloudyandsunny":
                    setWeatherImage(CloudyAndSunny);
                    break;
                case "haze":
                    setWeatherImage(haze);
                    break;
                default:
                    setWeatherImage(null);
                    break;
            }
        }

        if(response.coord){
            const {lat, lon} = response.coord;

            const uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&APPID=${apiKey}`;
            const uvData = await fetch(uvIndexUrl);
            const uvResponse = await uvData.json();
            console.log(uvResponse);
            setUvIndex(uvResponse.value);
        }

        if(response.sys){
            const {sunrise, sunset} = response.sys;

            const formatTime = (timestamp) =>{
                const time = new Date(timestamp * 1000);
                return time.toLocaleString("en-us",{
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                })
            }            

            const formateSunriseTime = formatTime(sunrise);
            const formateSunsetTime = formatTime(sunset);

            console.log(`Sunrise: ${formateSunriseTime}`);
            console.log(`Sunset: ${formateSunsetTime}`);

            setSunRiseTime(formateSunriseTime);
            setSunSetTime(formateSunsetTime);
        }

        if(response.rain){
            const rainfallvalue = response.rain["1h"] || response.rain["3h"] || null;
            setRainfall(rainfallvalue);
        }
        else{
            setRainfall("No Data Available");
        }
        } catch (error) {
        console.log(error);
        } finally {
        setShowLoader(false);
        }
        
    }
    
    useEffect(() => {
        // Display static weather data initially
        setWeatherData({
          name: "Delhi",
          weather: [{ description: "Clear" }],
          main: { temp: 310.2, feels_like: 30.65, humidity: 20 },
          wind: {speed: 10}
        });
        setWeatherImage(Sun);
        setUvIndex(7);
        setSunRiseTime("5:22 AM");
        setSunSetTime("7:17 PM")
        setRainfall("1.8")
    }, []);

    return(
        <>
            <Header onSearch={fetchWeather} changeTheme={changeTheme} handleChangeTheme={handleChangeTheme} />
            <Slider />
            <div className="container weather-container">
                <div className="row">
                {weatherData && (
                    <>
                        <div className="col-sm-6">
                            {
                                showLoader ? 
                                (
                                    <DisplayWeatherSkeleton />
                                ):
                                (
                            <div className="row weather-info">
                                <div className="col-sm-6 weather-info-left-container">
                                    <div className='weather_data'>
                                        <p className='country-name'>{weatherData.name}</p>
                                        {weatherData.weather && <p className='weather-type'>{weatherData.weather[0].description}</p>}
                                        {weatherData.weather &&<p className='temp'>{Math.round(weatherData.main.temp-273.15)} °C</p>}
                                    </div>
                                </div>
                                <div className="col-sm-6 weather-info-right-container">
                                    {weatherImage &&
                                        <div className='text-end'>
                                            <img className='temp-image' src={weatherImage} alt="weather icon" />
                                        </div>
                                    }
                                </div>
                            </div>
                            )
                            }
                            <div className="row">
                                {
                                    showLoader?(
                                        Array.from({length: 6}).map((index) =>(
                                            <div key={index} className="col-sm-6">
                                                <DisplayWeatherDetailsSkeleton />
                                            </div>
                                        )
                                    )):(
                                    <>
                                <div className="col-sm-6 d-flex mb-3">
                                    {weatherData.weather && uvIndex &&
                                        <div className={`uvindex flex-grow-1 ${changeTheme ? "" : "dark-theme"}`}>
                                            <div className='uvindex-container'>
                                                <i className="fa-solid fa-sun"></i>
                                                UV Index 
                                                <p className='weather-uvindex'>{uvIndex}</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="col-sm-6 d-flex mb-3">
                                    {weatherData.weather && sunRiseTime && sunSetTime &&
                                        <div className={`uvindex flex-grow-1 ${changeTheme ? "" : "dark-theme"}`}>
                                            <div className='uvindex-container'>
                                                <i className="fa fa-sun"></i>
                                                    SUNRISE 
                                                <p className='sunrisetime'>{sunRiseTime}</p>
                                                <p className='sunsettime'>Sunset: {sunSetTime}</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="col-sm-6 d-flex mb-3">
                                    {weatherData.weather && weatherData.wind &&
                                        <div className={`uvindex flex-grow-1 ${changeTheme ? "" : "dark-theme"}`}>
                                            <div className='uvindex-container'>
                                                <i className="fas fa-wind"></i>
                                                    WIND 
                                                {<p className='wind-speed'>{weatherData.wind.speed} km/h</p>}
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="col-sm-6 d-flex mb-3">
                                    {weatherData.weather && rainfall !== null &&
                                        <div className={`uvindex flex-grow-1 ${changeTheme ? "" : "dark-theme"}`}>
                                            <div className='uvindex-container'>
                                                <i className="fas fa-tint"></i>
                                                    RAINFALL 
                                                <p className='wind-speed'>{rainfall} mm</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="col-sm-6 d-flex">
                                    {weatherData.weather &&
                                        <div className={`uvindex flex-grow-1 ${changeTheme ? "" : "dark-theme"}`}>
                                            <div className='uvindex-container'>
                                                <i className="fas fa-temperature-low"></i>
                                                    FEELS LIKE 
                                                <p className='wind-speed'>{weatherData.main.feels_like}</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="col-sm-6 d-flex">
                                    {weatherData.weather &&
                                        <div className={`uvindex flex-grow-1 ${changeTheme ? "" : "dark-theme"}`}>
                                            <div className='uvindex-container'>
                                                <i className="fas fa-water"></i>
                                                <i className="fas fa-tint humidity-icon"></i>
                                                    HUMIDITY 
                                                <p className='wind-speed'>{weatherData.main.humidity} %</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                                </>
                                )
                                }
                            </div>
                            <HourlyForecast changeTheme={changeTheme} handleChangeTheme={handleChangeTheme} city={weatherData.name} />
                        </div>
                        <div className="col-sm-6 text-white">
                            <WeeklyForecast changeTheme={changeTheme} handleChangeTheme={handleChangeTheme} city={weatherData.name} />
                        </div>
                    </>
                )}
                </div>
            </div>
            <Footer />
        </>
    )
}
export default DisplayWeather;