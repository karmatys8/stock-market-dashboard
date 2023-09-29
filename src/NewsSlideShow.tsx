import React, {useEffect, useState, useRef} from "react";

function NewsSlideShow() {
  const [news, setNews] = useState(undefined);
  const [currentNewsPage, setCurrentNewsPage] = useState(undefined);

  useEffect(() => {
    const finnhub = require('finnhub');

    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY;
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.marketNews("general", {}, (error: any, data: any, response: any) => {
      console.log(data)
    });
  }, [])


  return (<></>)
}

export default NewsSlideShow;