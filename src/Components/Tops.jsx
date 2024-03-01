import useGetTops from "../Hooks/useGetTops"

import TitleCard from "./TitleCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Loader from "./Loader";
import { useEffect, useState } from "react";





// eslint-disable-next-line react/prop-types
const Tops = ({query, title}) => {


    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        // autoplay: true,
        // autoplaySpeed: 6000,
        arrows: true,
        responsive: [
                {
                breakpoint: 1060,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 3,
                  infinite: true,
                  arrows: true
                }
              },
                {
                breakpoint: 900,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
                  infinite: true,
                  arrows: false
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2,
                  arrows: false
                }
              },
              {
                breakpoint: 325,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: false
                }
              },
        ]
      };

      const {data, isLoading, error} = useGetTops(query)




  return (
    <section className={`bg-c-back my-container w-full ${title == 'Top Movies' ? 'pt-12 pb-2' : 'pt-3 pb-20' }`}>
        <div className="max-w-full w-full">
            <h3 className="text-white font-titles my-8 text-4xl">{title}</h3>
            {
                isLoading ? (
                    <div className="min-h-[250px] mt-5 flex justify-center items-center">
                        <Loader />
                    </div>
                ) : error ? (
                    <div className="min-h-[250px] flex items-center justify-center">
                        <h3 className="text-white font-texts text-center">Something went wrong, please try again.</h3>
                    </div>
                ) : (
                    <Slider {...settings}>
                    {
                        data?.results?.map((movie) => (
                            <TitleCard 
                                key={movie.id}
                                title={movie.titleText.text}
                                rating={movie.ratingsSummary.aggregateRating}
                                img={movie.primaryImage.url}
                                year={movie.releaseYear.year}
                                titleId={movie.id}
                                compress={true}
                                />
                        ))
                    }
                </Slider>
                )
            }
           
        </div>
    </section>
  )
}

export default Tops