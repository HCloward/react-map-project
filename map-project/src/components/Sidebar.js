import React, { Component } from 'react';
import Marker from './Marker.js';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class Sidebar extends Component {

    state = {
        query: '',
        marker: {}
    }

    updateMarker = (id, marker)=>{
        this.setState((state)=>{state.marker[id] = marker; return state})
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    render() {
        let showingTrails
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingTrails = this.props.trails.filter((trail) => match.test(trail.label))
        } else {
            showingTrails = this.props.trails
        }

        showingTrails.sort(sortBy('label'))

        return (
            <div id="menu">
                <label>Filter</label>
                <input 
                    tabIndex="0"
                    id="filterField" 
                    type="text"
                    placeholder="Search trails"
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    ></input>
                <ul className="dest-list">
                    {showingTrails.map((trail, i)=><Marker
                        ti={i+1}
                        key={trail.id}
                        map={this.props.map}
                        marker={this.state.marker[trail.id]}
                        trail={trail}
                        updateMarker={this.updateMarker}
                    />)}
                </ul>
            </div>
        );
    }
}
export default Sidebar;