import logo from "../../Assets/img/logo.png";
import "../Header/Header.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = ({onSearch, includeScrollFunctionality = true, handleChangeTheme={handleChangeTheme}}) =>{
    const [city, setCity] = useState("");
    const [showInputField, setShowInputField] = useState(false);
    const [showHeaderBg, setShowHeaderBg] = useState(false);
    const [changeBackgroundBg, setChangeBackgroundBg] = useState(true);

    const handleBackgroundBg = () =>{
        setChangeBackgroundBg(!changeBackgroundBg);
        if(!changeBackgroundBg){
            document.body.style.backgroundColor = "#352E64";
        }
        else{
            document.body.style.backgroundColor = "#000";
        }
    }

    const handleKeyChange = (e) =>{
        if(e.key === "Enter"){
            onSearch(city.toLowerCase());
            setCity("");
        }
    }

    const handleShowInputField = () =>{
        setShowInputField(!showInputField);
    }

    useEffect(() => {
        if (!includeScrollFunctionality) {
            return;
        }
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const header = document.querySelector("header");
            const carousel = document.querySelector(".carousel");
          
            if (carousel) {
              const carouselHeight = carousel.offsetHeight;
            
              if (scrollPosition > carouselHeight) {
                setShowHeaderBg(true);
              } else {
                setShowHeaderBg(false);
              }
            }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    return(
        <>
            <header className={showHeaderBg ? "header-bg" : ""}>
                <div className="container">
                    <div className="row align-items-center header-row">
                        <div className="col-sm-6 header-left-container">
                            <div className="d-flex align-items-center logo-container">
                                <Link to="/weather24"><img className="logo" src={logo} alt="logo.png" /></Link>
                                <p className="text-white mb-0 logo-name">weather24</p>
                                <div style={{background: changeBackgroundBg ? "hsl(230deg 17% 85%)" : "linear-gradient(90deg,hsl(216deg 52% 48%),hsl(51deg 100% 60%))" }} onClick={()=>{handleBackgroundBg(); handleChangeTheme();}} className="toggle-bg"  >
                                    <div className='toggle-thumb'>
                                        <i className={`fa ${changeBackgroundBg ? "fa-sun-o" : "fa-moon-o"}`}></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-white mb-0 mobile-logo-name">weather24</p>
                        </div>
                        <div className="col-sm-6 header-right-container">
                            <div className="navbar_container">
                                <nav className="navbar navbar-expand-lg navbar-items">
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav mr-auto">
                                            <li>
                                                <input className={`input-field ${showInputField ? "visible-input" : ""}`} style={{width: showInputField ? "180px" : ""}} value={city} onChange={(e)=>setCity(e.target.value)} onKeyPress={handleKeyChange} type="text" placeholder="Enter your city" />
                                                <i onClick={handleShowInputField} class="fa fa-search"></i>
                                            </li>
                                            <Link to="/weather24"><li className="nav-item">Home</li></Link>
                                            <Link to="/weather24/aboutus"><li className="nav-item">About Us</li></Link>
                                            <Link to="/weather24/news"><li className="nav-item">News</li></Link>
                                            <Link to="/weather24/contactus"><li className="nav-item">Contact Us</li></Link>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header;