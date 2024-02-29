/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import TitleCard from "../Components/TitleCard";
import axios from "axios";

const Search = () => {

    const {pathname} = useLocation();
    const params = useParams();
    const {query} = params;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [resultsNum, setResultsNum] = useState(null);
    const [numOfPages, setNumOfPages] = useState(null);
    const [page, setPage] = useState(1);

    const pageTitle = data && `YassFlix - Search for ${query}`;

    // check if query contains bad words
    const bad = ["fuck", "sex", "porn"];
    const containsBadWords = bad.some(word => query.toLowerCase().includes(word));
    if (containsBadWords) {
        return (
            <section className="pt-[150px] pb-10 text-white my-container min-h-screen bg-c-back">
                <div className='flex justify-center flex-col items-center w-full mt-20'>
                    <h1 className='font-texts text-white text-4xl text-center'>inappropriate words detected!</h1>
                </div>
            </section>
        )
    }

    useEffect(() => {
        document.title = pageTitle ? pageTitle : "YassFlix - Search";
    }, [pageTitle])


    let fetchData = async (q, p) => {
        let options = {
            method: 'GET',
            url: 'https://movie-database-alternative.p.rapidapi.com/',
            params: {
                s: q,
                r: 'json',
                page: p
            },
    
            headers: {
              'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
                        // eslint-disable-next-line no-undef
                // 'X-RapidAPI-Key': process.env.VITE_RAPID_API_KEY,
              'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
            }
          };


          setIsLoading(true)
          setError(null)

          try {
              const response = await axios.request(options);
              if(response.data.Response == 'True') {
                  setData(response.data);
                  console.log(response.data.totalResults);
                  setResultsNum(+response.data.totalResults);
                  setNumOfPages(response.data.totalResults <= 100 ? Math.ceil(response.data.totalResults/10) : 10)
                  numOfPages && console.log("Num of pages: ", numOfPages);
                  resultsNum && console.log("Results: ", resultsNum);
                  setIsLoading(false)
              }else {
                    setError(response.data.Error)
              }
            } catch (error) {
                setError(error)
            }
            finally {
                setIsLoading(false)
            }

    }

    useEffect(() => {

        setPage(1);
        fetchData(query, page)
        
    }, [query])


    useEffect(() => {
        fetchData(query, page)
    }, [page])
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const nextPage = () => {
        setPage(page + 1);
        window.scrollTo(0, 0);
    }
    
    const prevPage = () => {
        setPage(page - 1)
        window.scrollTo(0, 0);
    }

  return (
    <section className="pt-[150px] pb-10 text-white my-container min-h-screen bg-c-back">
        {
            isLoading ? (
                <div className='flex justify-center items-center w-full mt-20'>
                    <Loader />
                </div>
            ): error == "Movie not found!" ? (
                <div className='flex justify-center flex-col items-center w-full mt-20'>
                    <h1 className='font-texts text-white text-4xl text-center'>Makanch menha ga3 hadi: &quot;{query}&quot;</h1>
                    <p className='font-texts text-white text-xl mt-2 text-center'>3awed verify blk rak ghalet.</p>
                </div>
            ): error ? (
                <div className='flex justify-center flex-col items-center w-full mt-20'>
                    <h1 className='font-texts text-white text-4xl text-center'>Something Wrong Happened!</h1>
                    <p className='font-texts text-white text-xl mt-2 text-center'>Please try again later.</p>
                </div>
            ):(
                <div>
                    <h1 className='font-texts mb-1 pl-2 text-white text-2xl'>Search Results for: &quot;{query}&quot;</h1>
                    <p className='font-texts mb-10 pl-2 text-white text-lg'>Page: {page}</p>
                    <div className='grid max-sm:place-items-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                        {
                            data?.Search?.map((movie) => {
                                return (
                                    <TitleCard key={movie.imdbID}
                                        title={movie.Title}
                                        img={movie.Poster == "N/A" ? "https://placehold.co/180x250/EEE/31343C?font=raleway&text=No+Image+Provided" : movie.Poster}
                                        year={movie.Year}
                                        titleId={movie.imdbID}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className='flex justify-center items-center mt-10'>
                        {page > 1 && (<button onClick={prevPage} className='bg-c-primary text-white font-secondary font-semibold py-2 px-4 rounded-md mr-2'>Prev</button>)}
                        {resultsNum > 10 && page < numOfPages && (<button onClick={nextPage} className='bg-c-primary text-white font-secondary font-semibold py-2 px-4 rounded-md'>Next</button>)}
                    </div>
                </div>
            )
        }
    </section>
  )
}

export default Search