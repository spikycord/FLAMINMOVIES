import logoOnly from '../assets/icons/LogoOnly.png'


const Footer = () => {
  return (
    <footer className="bg-[#282828] font-texts my-container text-center text-white py-5 flex flex-col sm:flex-col justify-between items-center">
      <div className='flex justify-around items-center flex-col sm:flex-row'>
      <div className="mb-4 sm:mb-0 sm:mx-5">
        <img src={logoOnly} alt="Your Company Logo" className="w-16" />
      </div>
      <div className="mb-4 sm:mb-0 sm:mx-5">
        <p>By <span className="text-c-primary opacity-70 hover:opacity-100 transition duration-200 cursor-pointer">Yas</span><span className="text-c-secondary opacity-70 hover:opacity-100 transition duration-200 cursor-pointer">Ser</span>. All rights reserved. &copy;{new Date().getFullYear()}</p>
      </div>
      </div>
      <div className="text-xs sm:text-sm mt-10 max-sm:pb-14">
        <p>Our content is aggregated from various external providers. As such, we cannot guarantee the availability or functionality of all movies/shows.</p>
      </div>
    </footer>
  )
}

export default Footer