import {useLocation, useParams} from 'react-router-dom';
import useGetDetails from '../Hooks/useGetDetails';
import Loader from '../Components/Loader';
import TitleDetails from '../Components/TitleDetails';
import WatchFrame from '../Components/WatchFrame';
import { useEffect } from 'react';

const Watch = () => {

    const sp = useParams();
    const showId = sp.showId;

    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    const {data, isLoading, error, refetch} = useGetDetails(showId);

    const pageTitle = data && `YassFlix - ${data?.Title}`;

    useEffect(() => {
        document.title = pageTitle ? pageTitle : 'YassFlix';
    }, [pageTitle])

    // Check if title contains inappropiate words
    const isInappropriate = (title) => {
        const inappropriateWords = ['sex', 'fuck', 'porn'];
        const regex = new RegExp(inappropriateWords.join('|'), 'i');
        return regex.test(title);
    };

    const isTitleInappropriate = isInappropriate(data?.Title);
    const isPlotInappropriate = isInappropriate(data?.Plot);

    if(isTitleInappropriate || isPlotInappropriate) {
        return (
            <section className='pt-[150px] min-h-screen relative bg-c-back my-container'>
                <div className='flex justify-center items-center w-full mt-20'>
                    <h1 className='font-texts text-white text-lg text-center'>This {data?.Type == "movie" ? "movie" : "show"} contains inappropriate content.</h1>
                </div>
            </section>
        )
    }


  return (
    <section className='pt-[150px] min-h-screen relative bg-c-back my-container'>
        {
            isLoading ? (
                <div className='flex justify-center items-center w-full mt-20'>
                    <Loader />
                </div>
            )
            : error ? (<div className='flex justify-center flex-col items-center w-full mt-24'>
                <h1 className='font-texts text-white text-lg text-center'>Something Wrong Happened! Please Try Again</h1>
                <button onClick={() => refetch()} className='mt-5 text-white font-texts border-c-secondary border-2 px-4 py-2 rounded-full transition duration-200 hover:bg-c-secondary'>Retry</button>
                <p className='mt-4 text-white font-texts text-sm'>Try again later if the problem presists.</p>
            </div>)
            : (
                <div className='text-white w-full'>
                    <TitleDetails data={data && data} />
                    <WatchFrame type={data?.Type} id={data?.imdbID} />
                </div>
            )
        }
    </section>
  )
}

export default Watch