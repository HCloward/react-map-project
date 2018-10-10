import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar.js';
import Map from './components/Map.js';

class App extends Component {

  state = {
    map: "",
    lat: 34.7123858,
    lng: -84.165507,
    zoom: 9,
    trails: [
      { id:"7031453", label:"Hike Inn Lodge Trail", lat: 34.577172, lng: -84.24291, zoom: 8 },
      { id:"7013740", label:"Raven Cliff Falls", lat: 34.709647, lng: -83.789289, zoom: 8 },
      { id:"7003447", label:"Coosa Backcountry", lat: 34.7638690, lng: -83.9267850, zoom: 8 },
      { id:"7022692", label:"Panther Creek Falls Trail", lat: 34.676931, lng: -83.388147, zoom: 8 },
      { id:"7019570", label:"West Rim Loop Trail", lat: 34.83431, lng: -85.480393, zoom: 8 }
    ]
  }

  setMapState = ((app)=>(map)=>{
    app.setState({ map });
  })(this);

  render() {
    return (
      <div role="main" className="App">
      <header>
        <h1>North Georgia Hiking Trails</h1>
      </header>
        <div className="container">
            <div role="navigation" id="menuToggle" className="dest-list-panel">
              <input id="checkbox" role="navigation" tabIndex="0" name="hamburger icon" aria-label="Hamburger icon" type="checkbox" />
                  <span></span>
                  <span></span>
                  <span></span>
                  <Sidebar map={this.state.map} trails={this.state.trails}/>
            </div>
            <Map lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} setMapState={this.setMapState}/>
        </div>
      </div>
    );
  }
}

export default App;
