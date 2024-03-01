import axios from "axios";
import { useEffect, useState } from "react";


const useGetTops = (type) => {


    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles',
        params: {
          list: type,
          sort: 'year.decr',
          info: 'base_info',
          limit: '30'
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
          // eslint-disable-next-line no-undef
        //   'X-RapidAPI-Key': process.env.VITE_RAPID_API_KEY,
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
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