import React, { Component } from 'react';
import axios from 'axios';
import { cities } from '../config/constant'
import Autocomplete from './Autocomplete';
import WeatherDetails from './weatherDetails'

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherDetails: [],  // weatherDetails used for storing responded wether details from API
            cities: [], // cities are used for autosuggest some city name
            cityName: 'bangalore', // the default city is bangalore to display the default weather.
            updateCityName: '' // updated city name after calling the API.
        }
    }

    componentDidMount() { // initial API call to display bangalore weather.
        this.fetchWeatherDetails() // Separately API call.
    }

    fetchWeatherDetails = async () => {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&appid=d3a3b7d46bc7ba3f57826b9708d4ea46`)
            .then((res) => {
                this.setState({
                    weatherDetails: res.data.list,
                    updateCityName: res.data.city['name']
                })
            }).catch(() => {
                alert("City not found! Or it is poor internet connection")
            })
    }
    
    handelChange = async (cityName) => {
        await this.setState({
            cityName: cityName
        })
        this.fetchWeatherDetails()
    }

    render() {
        const { handelChange } = this;
        return (
            <>
                <Autocomplete options={cities} handelChange={handelChange} />
                <WeatherDetails
                    weatherDetails={this.state.weatherDetails}
                    cityName={this.state.updateCityName}
                />
            </>
        )
    }
}

export default SearchBox;