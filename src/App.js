import React, { useState, useEffect } from 'react';
import './App.css';
import DropBox from './component/DropBox';

function SplashScreen() {
  const phrase = "Welcome to Image Classifier!";
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < phrase.length) {
        const nextChar = phrase[index]; 
        setDisplayedText((prev) => prev + nextChar);
        index += 1;
      } else {
        clearInterval(interval); 
      }
    }, 100);

    return () => clearInterval(interval); 
  }, [phrase]);

  return (
    <div className="splash-screen">
      <h1>{displayedText}</h1>
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); 
    }, 5000);

    return () => clearTimeout(timer); 
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="App">
      <h1>Image Classifier</h1>
      <DropBox />
    </div>
  );
}

export default App;
