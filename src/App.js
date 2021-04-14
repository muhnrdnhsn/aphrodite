import React, {  } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import Homepage from './components/homepage/homepage';
import AboutUs from './components/aboutus/aboutus';
import Collections from './components/collections/collections';
import Journal from './components/journal/journal';
import Footer from './components/footer/footer';
import Items from './components/items/items';
import ItemDetail from './components/itemdetail/itemdetail';

const App = () => {
  return(
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <Navbar 
            links={[
              {
                  name: 'HOME',
                  href: '/'
              },
              {
                  name: 'ABOUT US',
                  href: '/about'
              },
              {
                  name: 'COLLECTIONS',
                  href: '/collections'
              },
              {
                  name: 'JOURNAL',
                  href: '/journal'
              }
            ]}
          />
          <br/>
          <Route exact path="/" render={() => <Homepage />} />
          <Route exact path="/about" render={() => <AboutUs />} />
          <Route exact path="/collections" render={() => <Collections />} />
          <Route exact path="/journal" render={() => <Journal />} />
          <Route exact path="/collections/:name" render={(props) => <Items {...props} />} />
          <Route exact path="/collections/:name/:id" render={(props) => <ItemDetail {...props} />} />
        </Router>
      </div>
      <Footer/>
    </div>
  )
}

export default App;
