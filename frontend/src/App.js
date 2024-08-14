import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import NewsSection from './Components/NewsSection'; 
import { Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useTheme } from './Theme';

const App = () => {
  const { darkMode } = useTheme(); 
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0); 


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } 
    else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);


  return (
    <div>
      <Navbar />
        <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <Routes>
          <Route path='/' element={<NewsSection apiKey={apiKey} setProgress={setProgress} key='general' category='general' />} />
          <Route path='/general' element={<NewsSection apiKey={apiKey} setProgress={setProgress} key='general' category='general' />} />
          <Route path='/business' element={<NewsSection apiKey={apiKey} setProgress={setProgress} key='business' category='business' />} />
          <Route path='/technology' element={<NewsSection apiKey={apiKey} setProgress={setProgress} key='technology' category='technology' />} />
          <Route path='/science' element={<NewsSection apiKey={apiKey} setProgress={setProgress} key='science' category='science' />} />
          <Route path='/sports' element={<NewsSection apiKey={apiKey} setProgress={setProgress} key='sports' category='sports' />} />
          <Route path='/health' element={<NewsSection apiKey={apiKey} setProgress={setProgress} key='health' category='health' />} />
          <Route path='/entertainment' element={<NewsSection apiKey={apiKey} setProgress={setProgress} key='entertainment' category='entertainment' />} />
          <Route path='/in' element={<NewsSection apiKey={apiKey} setProgress={setProgress} key='in' country='in' />} />
          <Route path='/us' element={<NewsSection apiKey={apiKey} setProgress={setProgress} key='us' country='us' />} />
        </Routes>
    </div>
  );
};

export default App;
