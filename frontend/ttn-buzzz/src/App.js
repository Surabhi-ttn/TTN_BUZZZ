import React from 'react';
import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Feeds from './components/feeds/feeds'
import Profile from './components/profile/profile'
import UpdateProfile from './components/profile/updateprofile'

function App(props) {
  
  return (
   <BrowserRouter>
     <Switch>
            <Route exact path='/' component={Feeds}></Route>
           {/* <Route exact path='/login' component={Signin}></Route> */}
            <Route exact path='/viewprofile' component={Profile}></Route>
            <Route exact path='/updateprofile' component={UpdateProfile}></Route>
          </Switch>
   </BrowserRouter>
  );
}


export default App;