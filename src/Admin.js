import React, {useEffect} from 'react'
import { BrowserRouter as Router, Redirect, Route, useHistory } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import axios from 'axios';
import AdminCollections from './components/admincollections/admincollections';
import AdminItems from './components/adminitems/adminitems';
import Logout from './components/logout/logout';

const Admin = (props) => {
    const history = useHistory();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BE_URL}/auth/login`, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        .then((res) => {
            if(!res.data.auth){
                history.push('/login')  
            }
        }).catch(() => history.push('/login'))
    });

    return(
        <div className="page-container">
          <div className="content-wrap">
            <Router>
              <Navbar 
                links={[
                  {
                      name: 'COLLECTIONS',
                      href: '/admin/collections'
                  },
                  {
                      name: 'ITEMS',
                      href: '/admin/items'
                  },
                  {
                      name: 'LOGOUT',
                      href: '/admin/logout'
                  }
                ]}
              />
              <br/>
              <Route exact path="/admin/" render={() => <Redirect to="/admin/collections" />} />
              <Route exact path="/admin/collections" render={() => <AdminCollections />} />
              <Route exact path="/admin/items" render={() => <AdminItems />} />
              <Route exact path="/admin/logout" render={() => <Logout />} />
            </Router>
          </div>
        </div>
      )
}

export default Admin