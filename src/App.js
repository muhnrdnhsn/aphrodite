import React, {  } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/navbar/navbar';
import Homepage from './components/homepage/homepage';
import AboutUs from './components/aboutus/aboutus';
import Collections from './components/collections/collections';
import Journal from './components/journal/journal';
import Footer from './components/footer/footer';
import Items from './components/items/items';

const App = () => {
  
  return(
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <Navbar />
          <br/>
          <Route exact path="/" render={() => <Homepage />} />
          <Route exact path="/about" render={() => <AboutUs />} />
          <Route exact path="/collections" render={() => <Collections />} />
          <Route exact path="/journal" render={() => <Journal />} />
          <Route exact path="/collections/:name" render={(props) => <Items {...props} />} />
        </Router>
      </div>
      <Footer/>
    </div>
  )
}

export default App;
