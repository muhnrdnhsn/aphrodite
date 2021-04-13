import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/login/login';
import './App.scss';
import Admin from './Admin';

// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/login" render={() => <Login />} />
        <Route path="/admin" render={() => <Admin />} />
        <Route render={() => <App />} />
      </Switch>
    </Router>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals();
