import React, { useState, useEffect } from 'react';
import './Splash.css';

function SplashScreen() {
  const phrase = "Hi";
  const [displayedText, setDisplayedText] = useState(''); // 초기값 설정

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < phrase.length) {
        setDisplayedText((prev) => prev + phrase[index]); // 정확히 한 글자 추가
        index += 1;
      } else {
        clearInterval(interval); // 애니메이션 종료
      }
    }, 100); // 한 글자당 100ms

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [phrase]);

  return (
    <div className="splash-screen">
      <h1>{displayedText}</h1>
    </div>
  );
}

export default SplashScreen;
