import React, { useEffect, useState } from "react";
import NewItem from "./NewItem";
import Loader from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTheme } from '../Theme';
import staticData from './data';

const NewsSection = (props) => {
  const { darkMode } = useTheme();
  const [articles, setArticles] = useState([]);
  const [staticArticles, setStaticArticles] = useState([]);
  const [filteredStaticArticles, setFilteredStaticArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [itemCount, setitemCount] = useState(0); 
  const [staticLoading, setstaticLoading] = useState(false); 

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true);
    setError(null);
    props.setProgress(40);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message} (Code: ${errorData.code})`);
      }
      const newdata = await response.json();
      props.setProgress(70);
      if (newdata.articles) {
        setArticles(newdata.articles);
        setTotalResults(newdata.totalResults);
      } 
      else {
        console.error("Unexpected data format:", newdata);
      }
    } 
    catch (error) {
      setError(error.message);
      console.error("Failed to fetch news:", error.message);
    } finally {
      setLoading(false);
      props.setProgress(100);
    }
  };


  useEffect(() => {
    updateNews();
    document.title = `${capitalize(props.category)} - NewsReport`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.country, props.category, props.pageSize]);


  useEffect(() => {
    if (staticData && staticData.articles) {
      setStaticArticles(staticData.articles);
    }
  }, []);


  useEffect(() => {
    if (staticArticles.length > 0) {
      const filteredArticles = staticArticles.filter(article => article.category === props.category);
      setFilteredStaticArticles(filteredArticles);
    }
  }, [props.category, staticArticles]);

  
  useEffect(() => {
    if (filteredStaticArticles.length > 0) {
      setstaticLoading(true); 
      const interval = setInterval(() => {
        setitemCount((prevCount) => {
          if (prevCount < filteredStaticArticles.length) {
            return prevCount + 3;
          } 
          else {
            clearInterval(interval);
            setstaticLoading(false);
            return prevCount;
          }
        });
      }, 1500); 

      return () => clearInterval(interval);
    }
  }, [filteredStaticArticles]);


  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`;
    setPage(prevPage => prevPage + 1);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message} (Code: ${errorData.code})`);
      }
      const newdata = await response.json();
      if (newdata.articles) {
        setArticles(prevArticles => [...prevArticles, ...newdata.articles]);
        setTotalResults(newdata.totalResults);
      } 
      else {
        console.error("Unexpected data format:", newdata);
      }
    } 
    catch (error) {
      setError(error.message);
      console.error("Failed to fetch more news:", error.message);
    }
  };


  return (
    <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h1 className={`header text-3xl font-semibold text-center pb-7 pt-24 ${darkMode ? 'text-white' : 'text-black'}`}>
        NewsReport - Today's Top {capitalize(props.category)} Headlines
      </h1>
      <h1 className={`header font-semibold text-center pb-8 mx-24 ${darkMode ? 'text-white' : 'text-black'}`}>
        Free News API works only on LocalHost. For daily news updates buy Premium.  
      </h1>
      <h1 className={`header font-semibold text-center pb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
        Till then, Catch a glimpse of what you're missing....
      </h1>


      {!loading && !error && (
        <InfiniteScroll
          dataLength={articles.length || 0}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Loader />}
        >
          <div className={`w-full px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex flex-wrap -mx-2">
              {articles.length > 0 ? articles.map((element, index) => (
                <div className="w-full md:w-1/3 px-2 mb-4" key={`${element.url}_${index}`}>
                  <NewItem
                    title={element.title ? element.title.slice(0, 50) : ""}
                    description={element.description ? element.description.slice(0, 130) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    authors={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              )) : !loading && <p className="text-center text-gray-500">No articles available</p>}
            </div>
          </div>
        </InfiniteScroll>
      )}


      <div className={`w-full px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`header text-2xl font-semibold text-center pb-7 ${darkMode ? 'text-white' : 'text-black'}`}>
          Exclusive news, a sneak-peek straight from our demo feed !!!
        </h2>
        <div className="flex flex-wrap -mx-2">
          {filteredStaticArticles.slice(0, itemCount).map((element, index) => (
            <div className="w-full md:w-1/3 px-2 mb-4" key={`${element.url}_${index}`}>
              <NewItem
                title={element.title ? element.title.slice(0, 50) : ""}
                description={element.description ? element.description.slice(0, 130) : ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                authors={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
          {staticLoading && (
            <div className="w-full flex justify-center items-center py-4">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


NewsSection.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};


NewsSection.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default NewsSection;
