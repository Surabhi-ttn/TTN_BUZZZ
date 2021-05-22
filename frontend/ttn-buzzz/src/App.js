import React from 'react';
import "./App.css";
import UpdateProfile from './profile/updateprofile';

class App extends React.Component {
  
  render() {
    return(
      <div className="App">
        <UpdateProfile/>
      </div>
    );
  }
}

export default App;
