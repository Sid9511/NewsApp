import React from 'react';
import loader from './loader.gif';

const Loader = () => {
  return (
    <div className="flex justify-center items-center my-5">
      <img src={loader} alt="Loading" />
    </div>
  );
};

export default Loader;
