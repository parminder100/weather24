import "../AboutUs/AboutUs.css";
import ourmission from "../../../Assets/img/ourmission.jpg";
import ourvision from "../../../Assets/img/ourvision.jpg";
import ourcorevalues from "../../../Assets/img/ourcorevalues.jpg";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import { useState } from "react";

const AboutUs = () =>{
    const [changeTheme, setChangeTheme] = useState(true);

    const handleChangeTheme = () =>{
        setChangeTheme(!changeTheme);
    }
    return(
        <>
            <div className="headerchange-bg">
                <Header includeScrollFunctionality={false} handleChangeTheme={handleChangeTheme} />
            </div>
            <section className="about-us">
                <div className="aboutus-bg"></div>
                <div className="about-us-content">
                    <h2>About Us</h2>
                    <p>At Weather24, we are dedicated to providing accurate and reliable 
                        weather information to individuals, businesses, and communities. 
                        Our mission is to empower people with the knowledge they need to 
                        make informed decisions, stay safe, and plan their activities 
                        based on reliable weather forecasts.
                    </p>
                </div>
                <div className="container mt-5 aboutus_main_container">
                    <div className="row align-items-center">
                        <div className="col-sm-6 ourmission-content">
                            <img className="w-100" src={ourmission} alt="ourmission.jpg" />
                        </div>
                        <div className="col-sm-6 text-white ourmission-content">
                            <h2>Our Mission</h2>
                            <p>At Weather24, our mission is to provide individuals, 
                                businesses, and communities with accurate and timely 
                                weather information. We believe that access to 
                                reliable weather forecasts is essential for making 
                                informed decisions, staying safe, and planning activities 
                                effectively. We strive to deliver the most precise and 
                                up-to-date weather data, ensuring that our users can 
                                trust the information we provide.
                            </p>
                            <p>
                                Through our mission, we aim to empower our users by equipping them 
                                with the knowledge they need to navigate weather conditions with 
                                confidence. Whether it's planning a weekend getaway, organizing 
                                outdoor events, or managing day-to-day operations, we are committed 
                                to helping individuals and organizations make informed choices based 
                                on reliable weather forecasts.
                            </p>
                        </div>
                        <div className="col-sm-6 text-white ourmission-content">
                            <h2>Our Vision</h2>
                            <p>Our vision for Weather24 is to be the leading provider of weather 
                                information globally, serving as a trusted source for accurate 
                                forecasts and comprehensive weather insights. We aim to empower
                                individuals and organizations across various sectors with the 
                                knowledge they need to plan effectively, mitigate risks, and 
                                adapt to weather-related challenges.
                            </p>
                            <p>
                                We envision a future where Weather24 plays a crucial role in improving 
                                safety, optimizing operations, and supporting decision-making processes 
                                in areas such as agriculture, transportation, energy, construction, and 
                                emergency management. We strive to be at the forefront of technological
                                advancements in the field of meteorology, ensuring that our users benefit 
                                from the latest innovations in weather forecasting.
                            </p>
                        </div>
                        <div className="col-sm-6 ourmission-content">
                            <img className="w-100" src={ourvision} alt="ourvision.jpg" />
                        </div>
                        <div className="col-sm-6 ourcorevalues-content">
                            <img className="w-100 core-values" src={ourcorevalues} alt="ourcorevalues.jpg" />
                        </div>
                        <div className="col-sm-6 text-white ourcorevalues-content">
                            <h2>Our Core Values</h2>
                            <p>We understand the importance of dependability 
                                when it comes to weather forecasts. Our team 
                                of meteorologists and data scientists works 
                                diligently to ensure that our users can rely 
                                on our services to make crucial decisions, 
                                whether it's planning outdoor activities, 
                                managing agricultural operations, or optimizing 
                                logistics.
                            </p>
                            <p>
                                We embrace innovation and leverage advanced technologies to 
                                enhance the accuracy and usability of our weather services. 
                                We continuously explore new forecasting techniques, data 
                                analysis methods, and visualization tools to deliver the 
                                most comprehensive and insightful weather information to our 
                                users.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
export default AboutUs;