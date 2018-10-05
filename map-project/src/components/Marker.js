import React, { Component } from 'react';

class Marker extends Component {

    state = {
        marker: ''
    }

    componentDidMount() {
        this.createMarker()
    }

    componentDidUpdate() {
        this.createMarker()
    }

    createMarker() {
        if(this.props.map) {
        let marker = new window.google.maps.Marker({
            map: this.props.map,
            position: {lat: this.props.trail.lat, lng: this.props.trail.lng},
            title: this.props.trail.label,
            animation: window.google.maps.Animation.DROP,
            id: this.props.trail.id
        });
    //    this.setState({ marker: marker }) 
      this.state.marker = marker
    }
}

    componentWillUnmount() {
        if (this.state.marker) {
          //  this.props.map.removeMarker(this.state.marker)
          this.state.marker.setMap(null)
          console.log("inside if statement")
        } 
    }

    render() {
        return (
            <li>{this.props.trail.label}</li>
        );
    }
}
export default Marker;