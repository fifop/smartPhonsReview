
import React from 'react';

const BackgroundImage = ({ src, children }) => {
  return (
    <div 
      style={{ 
        backgroundImage: `url(${src})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundImage;
