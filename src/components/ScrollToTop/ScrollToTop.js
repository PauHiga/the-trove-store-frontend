import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  console.log("pathname", pathname);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }, 100);
  }, [pathname]);

  // useEffect(() => {
  //   console.log("useEffect")
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  // });
  // }, [pathname]);
};

export default ScrollToTop;
