import React, {useEffect, useState, useRef} from "react";
import './NewsSlideShow.css'


type Props = {
  releaseDate: number;
  title: string;
  imgUrl: string;
  source: string;
  summary: string;
  url: string;
}

const Slide: React.FC<Props> = ({
  releaseDate, title, imgUrl, source, summary, url
}) => {
  return(
  <div className="news-slide">
    <h3>{title}</h3>
    <div className="news-release-info">
      <span>Source:</span>
      <a className="news-source" href={url}>{source}</a>
      <span className="news-release-date">{new Date(releaseDate * 1000).toLocaleTimeString('it-IT')}</span>
    </div>
    <img className="news-img" src={imgUrl} alt='news thumbnail'/>
    <span className="news-summary">{summary}</span>
  </div>
  )
}


function NewsSlideShow() {
  interface Provider {
    category: string,
    datetime: number,
    headline: string,
    id: number,
    image: string,
    related: string,
    source: string,
    summary: string,
    url: string
  }

  const [news, setNews] = useState<Provider[]>([]);
  const [currentNewsPage, setCurrentNewsPage] = useState(0);
  const slideChangeRate = 10000;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  useEffect(() => {
    const finnhub = require('finnhub');

    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.marketNews("general", {}, (error: any, data: any, response: any) => {
      setNews(data.slice(0, 10));
    });
  }, [])


  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout( () => {
      setCurrentNewsPage((prevVal) => prevVal === news.length -1 ? 0 : prevVal +1)
    }, slideChangeRate); // triggers twice during loading

    return () => {resetTimeout();};
  }, [currentNewsPage])


  return (
  <div className="slideshow">
    <div className="slides-container"
    style={{transform: `translateX(${-currentNewsPage * 100}%)`}}>
      {news.map(_news =>
        <Slide
          releaseDate={_news.datetime}
          title={_news.headline}
          imgUrl={_news.image}
          source={_news.source}
          summary={_news.summary}
          url={_news.url}
          key={_news.id}
        />
      )}
    </div>
    <div className="slideshow-dots">
      {news.map((_, idx) => (
        <div
          className={"slideshowDot" + (idx === currentNewsPage ? " active" : "")}
          key={idx}
          onClick={() => setCurrentNewsPage(idx)}
        />
      ))}
    </div>
  </div>
  )
}

export default NewsSlideShow;