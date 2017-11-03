import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import App from './App'
import Login from './components/login/Login'

export default (
    <Router path="/" component={App}>
        <Route path="login" component={Login} />
    </Router>
  );