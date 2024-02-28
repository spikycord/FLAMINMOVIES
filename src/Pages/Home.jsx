import { useLocation } from "react-router-dom";
import MainScreen from "../Components/MainScreen"
import Tops from "../Components/Tops"
import { useEffect } from "react";

const Home = () => {

    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    const pageTitle = `YassFlix - Watch TV Shows & Movies Online`;

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle])



  return (
      <div>
        <MainScreen />
        <Tops 
            query="top_boxoffice_200"
            title="Top Movies"
        />
        <Tops 
            query="most_pop_series"
            title="Popular Series"
        />
      </div>
  )
}

export default Home