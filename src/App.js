import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import VillainDataEntry from './containers/VillainDataEntry'
import 'react-toastify/dist/ReactToastify.min.css' 

class App extends Component {
  render() {
    return (
      <div className="App">
        <VillainDataEntry />
      </div>
    );
  }
}

export default App;
