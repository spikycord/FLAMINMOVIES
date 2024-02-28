
import { Link } from 'react-router-dom';
import data from '../assets/data.json'



const MainScreen = () => {

    const random = Math.floor(Math.random() * data.length);
    const chosen = data[random];


  return (
    <div className='h-screen relative max-sm:h-[93vh]'>

        {/* Large Screens Content */}
        <div className='text-white max-sm:hidden text-center flex-col my-container flex justify-end items-center w-full max-h-[70vh] absolute bottom-0'>
            
            <h1 className='flex-1 text-5xl font-bold font-titles my-3'>{chosen.title}</h1>
            <p className='font-texts my-2 flex-1 overflow-auto'>{chosen.overview}</p>
            <Link to={`/watch/${chosen.imdb_id}`}>
            <button  className=' bg-c-secondary flex-1 font-texts border-c-secondary border-2 text-white text-lg font-bold px-8 py-3 rounded-full bg-opacity-0 transition-all duration-200 my-5 hover:bg-opacity-100'>
                <i className="fas fa-play mr-2"></i> Play
            </button>
            </Link>
        </div>


        {/* Small Screens Content */}
        <div 
        className='text-white absolute sm:hidden text-center flex-col my-container flex justify-center items-center w-full bottom-0'>
            <p className='font-texts text-lg my-2'>{chosen.tagline}</p>
        </div>
        <div className='absolute w-screen h-screen flex justify-center sm:hidden items-center'>
            <button  className='bg-c-primary flex justify-center text-3xl items-center border-c-primary border-0 text-c-primary px-5 py-5 rounded-full bg-opacity-0 transition-all duration-200 hover:bg-opacity-100 absolute'>
                <Link to={`/watch/${chosen.imdb_id}`} className='flex justify-center items-center w-fit h-fit'>
                    <i className="fas fa-play ml-1"></i>
                </Link>
            </button>
        </div>


        {/* Date */}
        <span className='absolute bg-c-back font-secondary bg-opacity-60 text-white font-semibold px-5 py-1 select-none max-sm:top-[20%] right-0 sm:bottom-40'>
            {chosen.type === "tv" ? chosen.first_air_date.split("-")[0] : chosen.release_date.split('-')[0]}
        </span>



        {/* Background */}
        <div className={`w-full absolute h-screen -z-20 top-0 left-0 hh bg-c-back`}>
                <img src={chosen.backdrop_path}  alt=""
                    className={`w-screen h-screen object-cover max-sm:hidden absolute -z-20`}
                />
                <img src={chosen.poster_path}  alt=""
                    className={`w-full h-full object-cover object-center sm:hidden absolute -z-20`}
                />
        </div>


    </div>
  )
}

export default MainScreen