import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



// eslint-disable-next-line react/prop-types
const TitleCard = ({title, img, rating, year, titleId, compress}) => {

    const [imageUrl, setImageUrl] = useState(null)



    useEffect(() => {

            if (compress) {
                // eslint-disable-next-line react/prop-types
                const imgArr = img.split("/")
                const imgName = imgArr[imgArr.length - 1]
                if (imgName) {
                    setImageUrl(`https://yassflix.imgix.net/${imgName}?w=300`)
                }else if (!imgName && img) {
                    setImageUrl(img);
                }else {
                    setImageUrl('https://placehold.co/180x250/EEE/31343C?font=raleway&text=Image+Not+Found')
                }
            }else {
                setImageUrl(img)
            }
      }, [])


  return ( 
      <div className="flex flex-col mx-2 w-full overflow-hidden items-center relative max-w-[180px] max-h-fit max-sm:max-w-[130px]">
            <Link to={{pathname: `/watch/${titleId}`}}>
                <div className="w-fit h-fit overflow-hidden rounded-md">
                <img src={imageUrl}
                className={`w-full h-auto rounded-md hover:scale-125 hover:-rotate-6  transition duration-200 `}
                alt={title} 
                />
                </div>
            </Link>

                    <h4 className="text-white text-center px-2 font-texts text-xl">{title}</h4>
                    <span className="absolute top-0 left-0 py-0.5 px-1 rounded-br-md rounded-tl-md font-secondary bg-c-primary font-semibold text-white">{year}</span>
        
                    {rating && (<div className="flex items-center justify-center absolute top-0 right-0">
                        <i className="fas fa-star text-yellow-500 text-4xl"></i>
                        <span className="absolute text-white font-secondary">{rating}</span>
                    </div>)
                    }


        </div>
  )
}

export default TitleCard