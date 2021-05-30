import React from 'react';
import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Feeds from './components/feeds/feeds'
import Profile from './components/profile/profile'
import UpdateProfile from './components/profile/updateprofile'
import Login from './components/auth/login'

function App(props) {
  
  return (
   <BrowserRouter>
     <Switch>
        <Route exact path='/feeds/:user_id' component={Feeds}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/viewprofile/:user_id' component={Profile}></Route>
        <Route exact path='/updateprofile' component={UpdateProfile}></Route>
      </Switch>
   </BrowserRouter>
  );
}


export default App;