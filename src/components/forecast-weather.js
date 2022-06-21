import React from 'react';

class Forecast extends React.Component {
    render(){

        const forecastItems = this.props.forecast.map((f, i) => {
            const key = `forecast-item_${i}`;

            let weather;
            const num = Number(f.weather[0].icon.replace(/([0-9]*)./, '$1')),
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
            
            let hour = new Date(f.dt * 1000).getHours();

            return (

                <div className='hourly-forecast'>

                        <div className='forecast-item' key={key}>

                            <div>
                                <p className='forecast-item__hour'>
                                    {hour}:00h
                                </p>
                                <p className='forecast-item__temp'>
                                    {f.temp} &#176;C
                                </p>
                            </div>

                            {/* <p className='forecast-item__description'>{f.weather[0].main}</p>  */}

                            <img src={`img/${weather}.png`} alt={f.weather[0].description} />
                        </div>

                </div>
            );

        });

        return (
            <div className='forecast'>
                {forecastItems}
            </div>
        );
    }

}

export default Forecast;