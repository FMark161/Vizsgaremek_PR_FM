import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Ez sima, egyenletes görgetést biztosít
    });
  }, [pathname]);

  return null; // Ez a komponens nem renderel semmit
};

export default ScrollToTop;