import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './components/login/Login'
import Home from './components/pages/Home'
import Detail from './components/pages/Detail'
import 'bootstrap-css-only'
import './signin.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  
  }


componentDidMount() {

}

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login}/>
          <Route path='/home/:ts/:pv/:pb' component={Home}/>
          <Route path='/detail/:id/:ts/:pb' component={Detail}/>
        </div>
      </Router>
    );
  }
}

export default App;
