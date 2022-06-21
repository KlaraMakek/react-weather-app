import React from 'react';

class CurrentWeather extends React.Component {
    render() {
        let weather;
        const num = Number(this.props.icon.replace(/([0-9]*)./, '$1')),
        tree = {
            'clear': 1,
            'partly': 2,
            'clouds': [3, 4],
            'rain': [9, 10],
            'thunder': 11,
            'snow': 13,
            'mist': 50
        };

        for(const leaf in tree) {
            if(typeof tree[leaf] == 'object') {
                for(let i = 0; i < tree[leaf].length; i++) {
                    if(tree[leaf][i] === num) weather = leaf;
                }
            } else if(tree[leaf] === num) {
                weather = leaf;
            }
        }

        return (
            <div className="current-weather">
                <div className="current-weather__temp">
                    <h3 className="current-weather__name">{this.props.name}</h3>
                    <p className="current-weather__temp">{this.props.currentTemperature} &#8451;</p>
                    <img className="current-weather__icon" src={`img/${weather}.png`} alt={this.props.description} />
                    <p className="current-weather__description">{this.props.description}</p>
                </div>
                <div>
                    <p className="current-weather__feels-like">Feels like: {this.props.feelsLike } &#8451;</p>
                </div>
            </div>
        )
    }
}

export default CurrentWeather;