import React, { Component } from 'react';
import Marker from './Marker.js';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class Sidebar extends Component {

    state = {
        query: ''
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
                <input 
                    id="filterField" 
                    type="text"
                    placeholder="Search trails"
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    ></input>
                <button>Filter</button>
                <ul className="dest-list">
                    {showingTrails.map((trail)=><Marker key={trail.id} map={this.props.map} trail={trail} />)}
                </ul>
            </div>
        );
    }
}
export default Sidebar;