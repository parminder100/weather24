import { useState } from "react";
import { useEffect } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import NewsSkeleton from "../../Loader/NewsSkeleton/NewsSkeleton";
import "../News/News.css";

const News = () =>{
    const [newsData, setNewsData] = useState([]);
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

    const getNews = async() =>{
        const apiKey = process.env.REACT_APP_NEWS_API_KEY;
        if(!apiKey){
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        setShowLoader(true);
        try{
            const data = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&q=weather`)
            const response = await data.json();
            setNewsData(response.results);
            console.log(response.results);
        }
        catch (error) {
            console.log("Error: ", error);
        }
        finally{
            setShowLoader(false);
        }
    }

    useEffect(()=>{
        getNews();
    },[])
    return(
        <>
            <div className="news-header">
                <Header includeScrollFunctionality = {false} handleChangeTheme={handleChangeTheme}/>
            </div>
            <section className="news-container">
                <div className="container">
                    <div className="row">
                        {showLoader ?(
                            Array.from({length: 20}).map((index)=>(
                                <div key={index} className="col-sm-6">
                                    <NewsSkeleton />
                                </div>
                            ))
                        ):(
                        newsData &&
                            newsData.map((news,index)=>(
                                <>
                                    <div key={index} className="col-sm-6 news-items">
                                        {news.image_url ? (
                                        <img className="w-100" src={news.image_url} alt="news.jpg" />
                                        ):(
                                            <p className="image_not_available">No image Available</p>
                                        )}
                                    </div>
                                    <div className="col-sm-6 text-white news-items">
                                        <h3>{news.title}</h3>
                                        <p>{news.pubDate}</p>
                                        <p className="text-limit">{news.content}</p>
                                    </div>
                                </>
                            ))
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
export default News;