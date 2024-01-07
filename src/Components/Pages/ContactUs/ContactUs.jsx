import "../ContactUs/ContactUs.css";
import contactus1 from "../../../Assets/img/contactus1.png";
import contactus2 from "../../../Assets/img/contactus2.png";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import { useState } from "react";

const ContactUs = () =>{
    const [changeTheme, setChangeTheme] = useState(true);

    const handleChangeTheme = () =>{
        setChangeTheme(!changeTheme);
    }
    return(
        <>
            <div className="contactus-header">
                <Header includeScrollFunctionality = {false} handleChangeTheme={handleChangeTheme} />
            </div>
            <secion>
                <div className="container contactus_container">
                    <div className="row">
                        <div className="col-sm-6 contact-column">
                            <div className={`contact-info-container ${changeTheme ? "":"contactus-theme"}`}>
                                <h3 className={`contact-heading ${changeTheme ? "":"contactinfo-theme"}`}>contact Information</h3>
                                <p className={`contact-description ${changeTheme ? "":"contactinfo-theme"}`}>Say something to start a live chat!</p>
                                <div className={`d-flex align-items-baseline text-white ${changeTheme ? "":"contactinfo-theme"}`}>
                                    <i className="fa fa-mobile-phone"></i>
                                    <p>+1012 3456 789</p>
                                </div>
                                <div className={`d-flex align-items-baseline text-white ${changeTheme ? "":"contactinfo-theme"}`}>
                                    <i className="fa fa-envelope"></i>
                                    <p>demo@gmail.com</p>
                                </div>
                                <div className={`d-flex align-items-baseline text-white map-marker-icon ${changeTheme ? "":"contactinfo-theme"}`}>
                                    <i className="fa fa-map-marker"></i>
                                    <p>132 Dartmouth Street Boston,<br /> Massachusetts 02156 United States</p>
                                </div>
                                {/* <div className="d-flex social-media-icon">
                                    <div className="twitter-icon">
                                        <i className="fa fa-twitter"></i>
                                    </div>
                                    <div className="twitter-icon">
                                        <i className="fa fa-instagram"></i>
                                    </div>
                                    <div className="twitter-icon">
                                        <i className="fa fa-youtube-play"></i>
                                    </div>
                                </div> */}
                                <img className="contactus-image" src={contactus1} alt="contactus1.png" />
                                <img className="circle-contactus-image" src={contactus2} alt="contactus2.png" />
                            </div>
                        </div>
                        <div className="col-sm-6 form-column">
                            <div className="form-container">
                                <form>
                                    <div className="row">
                                        <div className="col-sm-6 mb-5">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">First Name</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter first name" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 mb-5">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Last Name</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter last name" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 mb-5">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Email</label>
                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 mb-5">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Phone Number</label>
                                                <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter phone number" />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 mb-5">
                                            <div class="form-group">
                                                <label for="exampleFormControlTextarea1">Message</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Write your message"></textarea>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <button className="submit-btn">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </secion>
            <div className="contactus-footer-content">
                <Footer />
            </div>
        </>
    )
}
export default ContactUs;