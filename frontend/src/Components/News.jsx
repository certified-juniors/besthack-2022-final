import React, {useState} from "react";
import {Spinner} from "react-bootstrap";
import NewsList from "./NewsList";
import {useEffect} from "react";
import axios from "axios";
import config from "../config";



const News = () => {
    const [myNews, setMyNews] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const [intervalId, setIntervalId] = useState(null);
    useEffect(() => {
        setIntervalId(setInterval(() => {
        const url = 'http://' + config.host + '/get_news?amount=20';
        axios.post(url).then((resp) => {
            let news =[];
            Object.keys(resp.data).forEach(key => {
                news.push(resp.data[key]);
            });
            setMyNews(news);
            setLoaded(true);
        })
    }, 1000*10))}, []);

    return(
        <div align = "center" style = {{marginTop: "50px"}}>
            {loaded ? <NewsList myNews={myNews}/> : <Spinner animation = "border" />}
        </div>
    )
}

export default News;