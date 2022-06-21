import './App.css';
import React from 'react';
import SearchBar from './components/searchbar';
import CurrentWeather from './components/current-weather';
import { getCurrentWeather, getForecast, getLocationData } from './apis/open-weather-api';
import Forecast from './components/forecast-weather';


class App extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = {
			location: 'Zagreb',
			temp: '',
			feelsLike: '',
			description: '',
			icon: '',
			name: 'Loading...',
			hourlyForecast: []
		};
	}

	onInputChange(e) {
			this.setState({
				location: e.target.value
			});
	}

    componentDidMount() {
		navigator.geolocation.getCurrentPosition(async (pos) => {
            let data = await getLocationData(pos.coords.latitude, pos.coords.longitude);
			this.onFormSubmit(data.data.results[0].components.town);
        });
    }
	

	async onFormSubmit(x) {
			const weatherRes = await getCurrentWeather(x || this.state.location);
			const lat = weatherRes.data.coord.lat;
			const lon = weatherRes.data.coord.lon;	
			const forecastRes = await getForecast(lat, lon);
			
			this.setState({
				temp: weatherRes.data.main.temp,
				feelsLike: weatherRes.data.main.feels_like,
				description: weatherRes.data.weather[0].main,
				icon: weatherRes.data.weather[0].icon,
				name: weatherRes.data.name,
				hourlyForecast: forecastRes.data.hourly
			});

	}

	render() {
		return (
			<div id="app">

				<div id="menu">
					<SearchBar 
						location={this.state.location} 
						inputChange={(e) => this.onInputChange(e)} 
						formSubmitted={() => this.onFormSubmit()}
					/>
				</div>	

				<CurrentWeather 
					name={this.state.name}
					currentTemperature={this.state.temp} 
					feelsLike={this.state.feelsLike}
					description={this.state.description}
					icon={this.state.icon}
				/>

				<h4 className='hourly-title'>Hourly forecast:</h4>

				<div className='hourly-forecast__container'>
				
					<Forecast forecast={this.state.hourlyForecast} />

				</div>
			</div>
		);
	}
}

export default App;
