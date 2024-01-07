import { useEffect, useState} from "react";
import "../HourlyForecast/HourlyForecast.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import HourlyForecastSkeleton from "../Loader/HourlyForecastSkeleton/HourlyForecastSkeleton";

const HourlyForecast = ({city, changeTheme={changeTheme}, handleChangeTheme={handleChangeTheme}}) =>{
    const [hourlyData, setHourlyData] = useState([]);
    const [staticHourlyData, setStaticHourlyData] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setShowLoader(false);
        },3000)
    },[])

    const getHourlyForecast = async(city) =>{
        const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        if(!apiKey){
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        setShowLoader(true);
        try{
        const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}`);
        const response = await data.json();
        console.log(response);
        setHourlyData(response.list);
        }
        catch (error) {
        console.log(error);
        } finally {
        setShowLoader(false);
        }
    }

    useEffect(() => {
        getHourlyForecast(city);
    }, [city]);

    useEffect(() => {
        // Set static hourly data
        setStaticHourlyData([
          { dt_txt: "2023-06-11 15:00:00", weather: [{ icon: "01d" }], main: { temp: 25 } },
          { dt_txt: "2023-06-11 18:00:00", weather: [{ icon: "02d" }], main: { temp: 27 } },
          { dt_txt: "2023-06-11 21:00:00", weather: [{ icon: "03d" }], main: { temp: 24 } },
          { dt_txt: "2023-06-12 00:00:00", weather: [{ icon: "04d" }], main: { temp: 23 } },
          { dt_txt: "2023-06-12 03:00:00", weather: [{ icon: "09d" }], main: { temp: 21 } }
        ]);
    }, []);

    const formatTime = (time) =>{
        return new Date(time).toLocaleTimeString([],{hour: "numeric", hour12: true})
    }
      
    useEffect(() => {
        if (hourlyData && hourlyData.length > 0) {
          // Overwrite static data with dynamic data
          setStaticHourlyData(hourlyData);
        }
    }, [hourlyData]);

    const responsiveOptions = {
        0: {
          items: 1,
          margin: 10
        },
        576: {
          items: 2,
          margin: 10
        },
        768: {
          items: 3,
          margin: 10
        },
        992: {
          items: 4,
          margin: 10
        },
        1200: {
          items: 5,
          margin: 10
        }
    };
      
    return(
        <>
            <div className="container hourly-forecast-bg">
                {staticHourlyData  && staticHourlyData.length > 0 ? (
                    <div className="row">
                        {
                            showLoader? (
                                <HourlyForecastSkeleton />
                            ):(
                    <div className="col-sm-12">
                        <div className={`hourly_forecast_container text-white ${changeTheme ? "":"hourly-theme"}`}>
                            <h3 className="mb-3">Hourly Forecast</h3>
                            <OwlCarousel className='owl-theme' loop margin={10} dots={false} items={5} responsive={responsiveOptions}>
                                {
                                    staticHourlyData.map((item, index)=>(
                                        <div key={index} className="item">
                                            <div className="hourly_forecast_card">
                                                <p>{formatTime(item.dt_txt)}</p>
                                                <img className="hourly_forecast_image" src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="weather-icon" />
                                                <p className="hourly_forecast_temp">{Math.round(item.main.temp-273.15)} °C</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </OwlCarousel>
                        </div>
                    </div>
                    )
                    }
                </div>
                ):(
                    <p>Loading</p>
                )}
            </div>
        </>
    )
}
export default HourlyForecast;