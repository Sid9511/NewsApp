import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import NewsSection from './Components/NewsSection';
import LoadingBar from 'react-top-loading-bar';
import { useTheme } from './Theme';

const App = () => {
  const { darkMode } = useTheme();
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const renderNewsSection = (key, category, country) => (
    <NewsSection
      apiKey={apiKey}
      setProgress={setProgress}
      key={key}
      category={category}
      country={country}
    />
  );

  return (
    <div>
      <Navbar />
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Routes>
        <Route path="/" element={renderNewsSection('general', 'general')} />
        <Route path="/general" element={renderNewsSection('general', 'general')} />
        <Route path="/business" element={renderNewsSection('business', 'business')} />
        <Route path="/technology" element={renderNewsSection('technology', 'technology')} />
        <Route path="/science" element={renderNewsSection('science', 'science')} />
        <Route path="/sports" element={renderNewsSection('sports', 'sports')} />
        <Route path="/health" element={renderNewsSection('health', 'health')} />
        <Route path="/entertainment" element={renderNewsSection('entertainment', 'entertainment')} />
        <Route path="/in" element={renderNewsSection('in', undefined, 'in')} />
        <Route path="/us" element={renderNewsSection('us', undefined, 'us')} />
      </Routes>
    </div>
  );
};

export default App;
