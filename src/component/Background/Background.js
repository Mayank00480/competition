import React from 'react';
import ReactDOM from 'react-dom';

const Background = ({ backgroundStyle }) => {
  return ReactDOM.createPortal(
    <div style={backgroundStyle}></div>,
    document.getElementById('background-image') // This will render the div directly into the body (or another target outside the root)
  );
};

export default Background;
