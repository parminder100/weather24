import DisplayWeather from "../DisplayWeather/DisplayWeather";
import AboutUs from "./AboutUs/AboutUs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import News from "./News/News";
import ContactUs from "./ContactUs/ContactUs";

const Pages = () =>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/weather24" element={<DisplayWeather />}></Route>
                    <Route path="weather24/aboutus" element={<AboutUs />}></Route>
                    <Route path="weather24/news" element={<News />}></Route>
                    <Route path="weather24/contactus" element={<ContactUs />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Pages;