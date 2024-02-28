

// eslint-disable-next-line react/prop-types
const WatchFrame = ({type, id}) => {


    const watchType = type == 'series' ? 'tv' : 'movie';

  return (
    <div className="w-full pb-[56.25%] relative">
        <h1 className="font-texts text-white text-3xl mt-4 mb-7 pl-1">Enjoy</h1>
        <iframe src={`https://vidsrc.xyz/embed/${watchType}?imdb=${id}`}
            referrerPolicy="origin"
            allowFullScreen
            className="w-full h-full border-0 absolute top-15 left-0 pb-20"
            >

           </iframe>
    </div>
  )
}

export default WatchFrame