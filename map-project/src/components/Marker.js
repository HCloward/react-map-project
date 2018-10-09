import React, { Component } from 'react';

class Marker extends Component {

    state = {

    }

    componentDidMount() {
        if (this.props.marker) {
            this.props.marker.setVisible(true);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.map !== prevProps.map) {
            this.createMarker()
        }
        if (this.props.marker) {
            this.getTrailInfo();
        }
    }

    createMarker() {
        let marker = new window.google.maps.Marker({
            map: this.props.map,
            position: {lat: this.props.trail.lat, lng: this.props.trail.lng},
            title: this.props.trail.label,
            animation: window.google.maps.Animation.DROP,
            id: this.props.trail.id
        });
        this.props.updateMarker(this.props.trail.id, marker);
    }

    componentWillUnmount() {
        if (this.props.marker) {
            this.props.marker.setVisible(false);
        } 
    }

    getTrailInfo = function() {
        let map = this.props.map, marker = this.props.marker;
        fetch("https://www.hikingproject.com/data/get-trails-by-id?ids=" + this.props.trail.id + "&key=200367802-6611b7dc45a485188fb817b905b4cc86").then((response)=>{
            
            response.text().then((r)=>{
                
                let trail = JSON.parse(r).trails[0];
                let content = `
                    <img class="trail-img" src="` + trail.imgSmall + `" alt="` + trail.name + `">
                    <div class="trail-title">` + trail.name + `</div>
                    <div class="trail-summary">` + trail.summary + `</div>
                    `;
                let infowindow = new window.google.maps.InfoWindow({
                    content: content
                });
                marker.addListener("click", ()=>{
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                        infowindow.close();
                    } else {
                        infowindow.open(map, marker);
                        marker.setAnimation(window.google.maps.Animation.BOUNCE);
                    }
                });
                window.document.getElementById(this.props.trail.id).addEventListener("click", ()=>{
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                        infowindow.close();
                    } else {
                        infowindow.open(map, marker);
                        marker.setAnimation(window.google.maps.Animation.BOUNCE);
                    }
                })
            });
        });
    }

    showTrailInfo = function() {

    }

    render() {
        return (
            <li 
            id={this.props.trail.id}
            tabIndex="0"
            >{this.props.trail.label}</li>
        );
    }
}
export default Marker;