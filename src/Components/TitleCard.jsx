import { useState } from "react"
import { Link } from "react-router-dom"
import Loader from "./Loader"



// eslint-disable-next-line react/prop-types
const TitleCard = ({title, img, rating, year, titleId}) => {

    const [isImageLoaded, setIsImageLoaded] = useState(false)

    const handleLoad = () => {
        setIsImageLoaded(true)
    }

 


  return ( 
      <div className="flex flex-col mx-2 w-full overflow-hidden items-center relative max-w-[180px] max-h-fit max-sm:max-w-[130px]">
            <Link to={{pathname: `/watch/${titleId}`}}>
                <div className="w-fit h-fit overflow-hidden rounded-md">
                <img onLoad={handleLoad} src={img ? img : 'https://placehold.co/180x250/EEE/31343C?font=raleway&text=Image+Not\nFound'}
                className={`w-full h-auto rounded-md hover:scale-125 hover:-rotate-6  transition duration-200 `}
                alt={title} 
                />
                </div>
            </Link>
            {
                isImageLoaded ? (
                    <>
                    <h4 className="text-white text-center px-2 font-texts text-xl">{title}</h4>
                    <span className="absolute top-0 left-0 py-0.5 px-1 rounded-br-md rounded-tl-md font-secondary bg-c-primary font-semibold text-white">{year}</span>
        
        
                    {rating && (<div className="flex items-center justify-center absolute top-0 right-0">
                        <i className="fas fa-star text-yellow-500 text-4xl"></i>
                        <span className="absolute text-white font-secondary">{rating}</span>
                    </div>)
                    }
                    </>

                )
                : (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                )
            }


        </div>
  )
}

export default TitleCard