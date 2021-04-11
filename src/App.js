import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/navbar/navbar';
import Homepage from './components/homepage/homepage';
import AboutUs from './components/aboutus/aboutus';
import Collections from './components/collections/collections';
import Journal from './components/journal/journal';
import Footer from './components/footer/footer';

const App = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url('bg.png')`;
  });
  return(
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <Navbar />
          <br/>
          <Route path="/" exact component={Homepage} />
          <Route path="/about" component={AboutUs} />
          <Route path="/collections" component={Collections} />
          <Route path="/journal" component={Journal} />
        </Router>
      </div>
      <Footer/>
    </div>
  )
}

export default App;
