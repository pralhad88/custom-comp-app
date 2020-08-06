import React, {Component} from 'react';
import Moment from 'react-moment'; // importing Moment for displaying user friendly date and timm

class WeatherDetails extends Component {
    render () {
        const {weatherDetails, cityName} = this.props; // get weather details and cityname for displaying weather details.
        return (
            <div className="row">
                {weatherDetails.map((weather, index) => <div className="column" key={index}>
                    <div className="card" style={{backgroundColor: Math.round(weather.main.temp - 273.15) > 16 ? "#f54029": "#A0E6FF" }} >
                            <h2>{cityName}</h2>
                            <h3> <Moment format="D MMM YYYY hh:mm a" withTitle>{weather.dt_txt}</Moment></h3>
                            <img
                                className="weather-image"
                                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            />
                            <h2> {weather.weather[0].description} </h2>
                            <hr></hr>
                        <div className="weather-details">
                            <div className="column1">
                                <h1>{Math.round(weather.main.temp - 273.15)}<span className="temp">&#176;</span>C</h1>
                            </div>
                            <div className="column1">
                                <h3><i className="wi wi-raindrop"></i> {weather.main.humidity} %</h3>
                                <h3><i className="wi wi-small-craft-advisory"></i> {weather.wind.speed} km/h</h3>
                            </div>
                        </div>
                    </div>
                </div> )}
            </div>
        )
    }
}

export default WeatherDetails;