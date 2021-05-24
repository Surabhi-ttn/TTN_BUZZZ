import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import Login from './components/auth/login';
import {connect} from 'react-redux'
import {fetchUserAction} from './actions/action'

function App(props) {
  useEffect(()=>{
     props.fetch_user()
  },[])
  return (
   <BrowserRouter>
     <Login/>
   </BrowserRouter>
  );
}

const mapDispathToProps = (dispatch)=>{
  return {
    fetch_user:()=>{dispatch(fetchUserAction())}
  }
}

export default connect(null,mapDispathToProps)(App);