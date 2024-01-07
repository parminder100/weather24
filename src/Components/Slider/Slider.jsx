import Carousel from "react-bootstrap/Carousel";
import banner2 from "../../Assets/img/banner2.jpg";
import banner3 from "../../Assets/img/banner3.jpg";
import "../Slider/Slider.css";
import 'animate.css';
import weathervideo from "../../Assets/img/weathervideo.mp4";

const Slider = () =>{
    return(
        <>
            <Carousel>
                <Carousel.Item>
                    <div className="slider-item">
                        <video className="weather-video" src={weathervideo} type="video/mp4" autoPlay loop muted />
                        <Carousel.Caption>
                            <div className="slider-content">
                                <h3 className="animate__animated animate__fadeInDown animate__delay-1s">Welcome to Weather24</h3>
                                <p className="animate__animated animate__fadeInUp animate__delay-2s">Stay informed with accurate and up-to-date weather forecasts from Weather24. We provide real-time weather data, hourly forecasts, and more, so you can plan your day with confidence.</p>
                            </div>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slider-item">
                        <img
                        className="d-block w-100 slider-image"
                        src={banner2}
                        alt="banner2.jpg"
                        />
                        <Carousel.Caption>
                            <div className="slider-content">
                                <h3 className="animate__animated animate__fadeInDown animate__delay-1s">Explore Weather Insights</h3>
                                <p className="animate__animated animate__fadeInUp animate__delay-2s">Discover fascinating weather insights and trends with Weather24. Our team of meteorologists and data scientists analyze weather patterns to provide you with valuable information and forecasts.</p>
                            </div>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="slider-item">
                        <img
                        className="d-block w-100 slider-image"
                        src={banner3}
                        alt="banner3.jpg"
                        />
                        <Carousel.Caption>
                            <div className="slider-content">
                                <h3 className="animate__animated animate__fadeInDown animate__delay-1s">Plan Your Adventures</h3>
                                <p className="animate__animated animate__fadeInUp animate__delay-2s">Weather24 helps you plan your outdoor adventures with precision. From hiking and camping to beach trips and city explorations, we give you the weather details you need to make the most of your plans.</p>
                            </div>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
            </Carousel>
        </>
    )
}
export default Slider;