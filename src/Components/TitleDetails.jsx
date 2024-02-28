
const TitleDetails = (data) => {

    const neededData = [
        {
            Type: "Type",
            info: data?.data?.Type.charAt(0).toUpperCase() + data?.data?.Type.slice(1),
        },
        {
            Type: "Genre",
            info: data?.data?.Genre,
        },
        {
            Type: "Plot",
            info: data?.data?.Plot,
        },
        {
            Type: "Release Year",
            info: data?.data?.Year.substr(0, 4),
        },
        {
            Type: "Rating",
            info: data?.data?.imdbRating,
        
        },
        {
            Type: "Runtime",
            info: data?.data?.Runtime,
        }
    ]





  return (
    <div className="flex flex-row max-md:flex-col mb-20 max-md:items-center justify-start items-start">
        <div className="flex-1">
            <img src={data?.data?.Poster} className="object-contain max-w-[250px]" alt={data?.data?.Title} />
        </div>
        <div className="md:ml-10">
            <h1 className="flex-1 text-white font-titles text-4xl mb-5 max-md:mt-10">
                {data?.data?.Title}
            </h1>
            <ul className="flex-1">
                {neededData.map((item, index) => (
                    <li key={index} className="flex flex-row items-center border-c-gris border">
                        <h1 className="text-white font-texts text-lg py-2 h-full px-4 border-c-gris min-w-40">{item.Type}</h1>
                        <p className="text-white font-texts text-sm px-2 py-4 min-h-fit h-full border-l  border-c-gris">{item.info}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default TitleDetails