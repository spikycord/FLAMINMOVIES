import axios from "axios";
import { useEffect, useState } from "react";


const useGetTops = (imdb_id) => {


    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: 'https://movie-database-alternative.p.rapidapi.com/',
        params: {
          r: 'json',
          i: imdb_id
        },
        headers: {
        //   'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
          // eslint-disable-next-line no-undef
          'X-RapidAPI-Key': process.env.VITE_RAPID_API_KEY,
          'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
        }
      };


      const fetchData = async () => {

        setIsLoading(true)

          try {
              const response = await axios.request(options);
              setData(response.data);
              setIsLoading(false)
            } catch (error) {
                setError(error)
            }
            finally {
                setIsLoading(false)
            }
            
        }

        useEffect(() => {
            fetchData()
        }, [])

        const refetch = () => {
            setIsLoading(true)
            fetchData()
        }

        return {data, isLoading, error, refetch}
}


export default useGetTops