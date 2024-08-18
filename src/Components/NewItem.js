import React from 'react';
import { useTheme } from '../Theme';

const NewItem = (props) => {
  const { title, description, imageUrl, newsUrl, authors, date, source } = props;
  const { darkMode } = useTheme();

  return (
    <div className={`card my-4 mx-3 h-[31rem] w-[90%]  ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
    
      <img 
      src={imageUrl || "https://www.livemint.com/lm-img/img/2024/03/11/1600x900/TCS_on_overseas_payments_for_investments_1695628348453_1710144311141.jpg"} 
      className="card-img-top h-60"
      alt="News" />
        
        <div className="flex absolute top-0 right-0 text-sm">
          <span className="badge rounded-pill bg-primary">{source}</span>
        </div>

        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text mx-0"><small className="text-muted">By- {authors || 'Unknown'}, on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} className={`btn btn-sm ${darkMode ? 'btn-light' : 'btn-dark'}`}>Read More</a>
        </div>
    </div>
  );
}

export default NewItem;
