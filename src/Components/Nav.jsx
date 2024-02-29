import largeIcon from '../assets/icons/large.png'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const Nav = () => {

    const [isInputVisible, setInputVisible] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [searchTerm, setSearchTerm] = useState('')
    const location = useLocation();
    const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleButtonClick = (e) => {
    e.preventDefault()
    
    if (isInputVisible) {
        if (searchTerm.length < 3) return alert('Search term must be at least 3 characters long');
        handleSearch(e)
        setInputVisible(false)
    } else {
        setInputVisible(true)
    }
  };


  const editTerm = (e) => { 
        setSearchTerm(e.target.value)
  }

    const handleSearch = (e) => {
        e.preventDefault()

        // Check if searchTerm contains bad words
        const badWords = ['fuck', 'sex', 'porn'];

        if (badWords.some(word => searchTerm.toLowerCase().includes(word))) {
            return alert('Search term contains inappropriate words');
        }


        if (searchTerm.length == 0) return;
        navigate(`search/${searchTerm}`)
    }

  return (
    <nav className={`my-container z-30 ${location.pathname == "/" ? "fixed" : "absolute"} w-full transition duration-200 bg-c-back ${location.pathname == '/' ? scrollPosition <= 300 ? 'bg-opacity-45 shadow-c-back' : 'bg-opacity-100 shadow-c-primary' : 'bg-opacity-100 shadow-c-primary'} shadow-md flex justify-between items-center`}>
        <div className="logo mr-4">
            <Link to='/'>
            <img src={largeIcon} alt="YassFlix"
                className="object-contain sm:w-[180px] max-sm:w-[150px]"
             />
            </Link>
        </div>
        <form onSubmit={handleSearch} className="relative flex font-texts items-center sm:w-[360px] text-[19px] max-sm:hidden">
            <input type="text" minLength={3} onChange={editTerm} className="w-full search-bar" placeholder="Search..." />
            <button type='submit' className="absolute right-4 flex justify-center items-center">
                <i className="fa fa-search text-c-primary"></i>
            </button>
        </form>
        
        {/* Another Searchbar for small-width devices */}
        <form className="hiden max-sm:block">
            <button onClick={handleButtonClick} className="p-2 text-white text-[19px] bg-transparent rounded-full border-c-primary sm:hidden">
                <i className="fa fa-search text-c-primary"></i>
            </button>
            <div className={`bg-c-back ${location.pathname == '/' ? scrollPosition <= 300 ? 'bg-opacity-45' : 'bg-opacity-100 shadow-c-primary shadow-md' : 'bg-opacity-100 shadow-c-primary shadow-md'}  w-full -bottom-[80px] absolute flex transition-all duration-300 ease-in-out justify-center transform items-center left-0 h-20 origin-top ${isInputVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                <input type="text" minLength={3} onChange={editTerm} className={`absolute w-[80%] ${!isInputVisible && 'hiden'} search-bar`} placeholder="Search..." />
                <i onClick={() => setInputVisible(false)} className="fa fa-arrow-up text-c-primary right-4 absolute"></i>
            </div>
        </form>
    </nav>
  )
}

export default Nav