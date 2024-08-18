// import React, { useEffect, useState } from "react";
// import NewItem from "./NewItem";
// import Loader from "./Loader";
// import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { useTheme } from '../Theme';

// const NewsSection = (props) => {
//   const { darkMode } = useTheme();
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const [error, setError] = useState(null); 

//   const capitalize = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   const updateNews = async () => {
//     props.setProgress(10);
//     const url = "mongodb+srv://siddhantdeshmukhwork:Siddhant_Atlas%40Work.0106@news.lmhep.mongodb.net/?retryWrites=true&w=majority&appName=news";
//     setLoading(true);
//     setError(null); 
//     props.setProgress(40);

//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Error ${response.status}: ${errorData.message} (Code: ${errorData.code})`);
//       }
//       const newdata = await response.json();
//       props.setProgress(70);
//       if (newdata.articles) {
//         setArticles(newdata.articles);
//         setTotalResults(newdata.totalResults);
//       } else {
//         console.error("Unexpected data format:", newdata);
//       }
//     } catch (error) {
//       setError(error.message);
//       console.error("Failed to fetch news:", error.message);
//     } finally {
//       setLoading(false);
//       props.setProgress(100);
//     }
//   };

//   useEffect(() => {
//     updateNews();
//     document.title = `${capitalize(props.category)} - NewsReport`;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [props.country, props.category, props.pageSize]);

//   const fetchMoreData = async () => {
//     const url =  "mongodb+srv://siddhantdeshmukhwork:Siddhant_Atlas%40Work.0106@news.lmhep.mongodb.net/?retryWrites=true&w=majority&appName=news";
//     setPage(prevPage => prevPage + 1);
    
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Error ${response.status}: ${errorData.message} (Code: ${errorData.code})`);
//       }
//       const newdata = await response.json();
//       if (newdata.articles) {
//         setArticles(prevArticles => [...prevArticles, ...newdata.articles]);
//         setTotalResults(newdata.totalResults);
//       } else {
//         console.error("Unexpected data format:", newdata);
//       }
//     } catch (error) {
//       setError(error.message);
//       console.error("Failed to fetch more news:", error.message);
//     }
//   };

//   return (
//     <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//       <h1 className={`header text-3xl font-semibold text-center pb-7 pt-24 ${darkMode ? 'text-white' : 'text-black'}`}>
//         NewsReport - Today's Top {capitalize(props.category)} Headlines
//       </h1>
//       <h3 className={`header font-semibold text-center pb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
//         Free News API works only on LocalHost
//       </h3>

//       {loading && <Loader />}
//       {error && <p className="text-center text-red-500">Error: {error}</p>}

//       {!loading && !error && (
//         <InfiniteScroll
//           dataLength={articles.length || 0}
//           next={fetchMoreData}
//           hasMore={articles.length < totalResults}
//           loader={<Loader />}
//         >
//           <div className={`w-full px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//             <div className="flex flex-wrap -mx-2">
//               {articles.length > 0 ? articles.map((element, index) => (
//                 <div className="w-full md:w-1/3 px-2 mb-4" key={`${element.url}_${index}`}>
//                   <NewItem
//                     title={element.title ? element.title.slice(0, 50) : ""}
//                     description={element.description ? element.description.slice(0, 130) : ""}
//                     imageUrl={element.urlToImage}
//                     newsUrl={element.url}
//                     authors={element.author}
//                     date={element.publishedAt}
//                     source={element.source.name}
//                   />
//                 </div>
//               )) : !loading && <p className="text-center text-gray-500">No articles available</p>}
//             </div>
//           </div>
//         </InfiniteScroll>
//       )}
//     </div>
//   );
// };

// NewsSection.defaultProps = {
//   country: "in",
//   pageSize: 6,
//   category: "general",
// };

// NewsSection.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
//   apiKey: PropTypes.string.isRequired,  
//   setProgress: PropTypes.func.isRequired, 
// };

// export default NewsSection;





























import React, { useEffect, useState } from "react";
import NewItem from "./NewItem";
import Loader from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTheme } from '../Theme';

const NewsSection = (props) => {
  const { darkMode } = useTheme();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    // Fetch data from your backend
    const url = `${props.apiBaseUrl}/?category=${props.category}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    setError(null); 
    props.setProgress(40);

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${props.apiKey}`, // Assuming Bearer token is needed
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message} (Code: ${errorData.code})`);
      }
      const newdata = await response.json();
      props.setProgress(70);
      if (newdata[props.category]) {
        setArticles(newdata[props.category]);
        setTotalResults(newdata[props.category].length); // Assuming total results are the length of the array
      } else {
        console.error("Unexpected data format:", newdata);
      }
    } catch (error) {
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

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `${props.apiBaseUrl}/?category=${props.category}&page=${nextPage}&pageSize=${props.pageSize}`;
    setPage(nextPage);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${props.apiKey}`, // Assuming Bearer token is needed
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message} (Code: ${errorData.code})`);
      }
      const newdata = await response.json();
      if (newdata[props.category]) {
        setArticles(prevArticles => [...prevArticles, ...newdata[props.category]]);
        setTotalResults(newdata[props.category].length + articles.length); // Update total results
      } else {
        console.error("Unexpected data format:", newdata);
      }
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch more news:", error.message);
    }
  };

  return (
    <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h1 className={`header text-3xl font-semibold text-center pb-7 pt-24 ${darkMode ? 'text-white' : 'text-black'}`}>
        NewsReport - Today's Top {capitalize(props.category)} Headlines
      </h1>
      <h3 className={`header font-semibold text-center pb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
        Free News API works only on LocalHost
      </h3>

      {loading && <Loader />}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

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
    </div>
  );
};

NewsSection.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
  apiBaseUrl: "https://your-backend-url/api/news", // Replace with your actual API endpoint
};

NewsSection.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
  apiBaseUrl: PropTypes.string.isRequired,
};

export default NewsSection;

