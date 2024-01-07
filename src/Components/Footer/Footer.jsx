import "../Footer/Footer.css";
import open_weather_map_logo from "../../Assets/img/open_weather_map_logo.png";
import newsdata_logo from "../../Assets/img/newsdata_logo.png";

const Footer = () =>{
    return(
        <>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="copy_right">
                                <p className="copy-right">© 2024. All rights reserved. Developed with<span className="heart"></span> by Parminder Singh</p>
                                <div className="open-weather-map-logo-container">
                                    <a href="https://openweathermap.org" target="_blank">
                                        Powered by
                                        <img src={open_weather_map_logo} alt="open_weather_map_logo" />
                                    </a>
                                </div>
                                <div className="newsdata-logo-container">
                                    <a href="https://newsdata.io" target="_blank">
                                        Powered by
                                        <img src={newsdata_logo} alt="newsdata_logo" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer;