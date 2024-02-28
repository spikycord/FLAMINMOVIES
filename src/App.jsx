import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Watch from './Pages/Watch';
import Footer from './Components/Footer'
import Nav from './Components/Nav'


const App = () => {


  return (
    <Router>
        <Nav />
      <Routes>
        <Route exact path="/" element={<Home />}  />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/watch/:showId" element={<Watch />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;