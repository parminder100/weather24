import { useEffect, useState, useRef } from "react";
import "../WeeklyForecast/WeeklyForecast.css";
import Chart from 'chart.js/auto';
import WeeklyForecastSkeleton from "../Loader/WeeklyForecastSkeleton/WeeklyForecastSkeleton";
import WeeklyForecastGraphSkeleton from "../Loader/WeeklyForecastGraphSkeleton/WeeklyForecastGraphSkeleton";

const WeeklyForecast = ({city,changeTheme={changeTheme}, handleChangeTheme={handleChangeTheme}}) =>{
    const [weeklyData, setWeeklyData] = useState([]);
    const chartRef = useRef(null);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(()=>{
      setTimeout(()=>{
        setShowLoader(false);
      },3000)
    },[])

    const getWeeklyData = async(city) =>{
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        if(!apiKey){
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
      setShowLoader(true)
      try{
        const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}`);
        const response = await data.json();
        console.log(response);
        if (response.list) {
            setWeeklyData(response.list.slice(0, 7));
        }
      }
      catch(error){
        console.log(error);
      }
      finally{
        setShowLoader(false);
      }
    }

    const formatTime = (time) => {
        const date = new Date(time * 1000); // Convert time to milliseconds
        const options = {
          hour: "numeric",
          hour12: true,
        };
        return date.toLocaleTimeString([], options);
    };

    const generateLineGraph = (data) => {
        const ctx = chartRef.current.getContext("2d");
      
        // Check if an existing chart instance exists
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy(); // Destroy the previous chart
        }
      
        const labels = data.map((item) => formatTime(item.dt));
        const temperatures = data.map((item) => Math.round(item.main.temp - 273.15));

        Chart.defaults.color = "rgb(255, 255, 255)";
      
        chartRef.current.chart = new Chart(ctx, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "Temperature (°C)",
                data: temperatures,
                borderColor: "rgb(75, 192, 192)",
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Time",
                    color: "#fff",
                  },
                  ticks: {
                    color: "rgba(255, 255, 255)", // Change the color of x-axis tick marks
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "Temperature (°C)",
                    color: "#fff"
                  },
                  ticks: {
                    color: "rgba(255, 255, 255)", // Change the color of y-axis tick marks
                  },
                },
              },
            },
        });
    };  

    useEffect(()=>{
        getWeeklyData(city);
    },[city])

    useEffect(() => {
      if (weeklyData.length > 0) {
        generateLineGraph(weeklyData);
      }
    }, [weeklyData]);

    const displayDay = (index) => {
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const d = new Date();
        const currentDay = d.getDay();
        const targetDay = (currentDay + index) % 7;
        return weekday[targetDay];
    };
    
    return(
        <>
            {
              showLoader ? (
                <WeeklyForecastSkeleton />
              )
              :
              (
            <div className={`weekly_forecast_container ${changeTheme ? "" : "weekly-theme"}`}>
                <h3 className="mb-3">Weekly Forecast</h3>
                {
                    weeklyData.map((item, index)=>(
                        <>
                            <div key={index}>
                                <div className="row align-items-baseline">
                                    <div className="col-sm-3 weekly-forecast-days-name">
                                        <p>{index === 0 ? "Today" : displayDay(index)}</p>
                                    </div>
                                    <div className="col-sm-3 text-end weekly-forecast-image">
                                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="weather-icon" />
                                    </div>
                                    <div className="col-sm-3 weekly-forecast-description">
                                        <p>{item.weather[0].description}</p>
                                    </div>
                                    <div className="col-sm-3 text-end weekly-forecast-temperature">
                                        <p>{Math.round(item.main.temp-273.15)} °C</p>
                                    </div>
                                    <div>
                                        <hr className="weekly_forecast_divider" />
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>
            )
            }
            <div>
              <canvas ref={chartRef} className={`canvas-hourly ${changeTheme ? "":"weekly-theme"}`} />
            </div>
        </>
    )
}
export default WeeklyForecast;