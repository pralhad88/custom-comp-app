import React, { Component } from 'react';

export class Autocomplete extends Component {
    state = {
        activeOption: 0,
        filteredCities: [],
        showCity: false,
        userInput: ''
    };

    onChange = (e) => {
        const { options } = this.props;
        const userInput = e.currentTarget.value;
        const filteredCities = options.filter((optionName) => // filtering autosugested cities
            optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        this.setState({
            filteredCities,
            showCity: true,
            userInput: e.currentTarget.value
        });
    };

    onClick = (e) => { // onclicking list item set city name as userInput
        this.setState({
            activeOption: 0,
            filteredCities: [],
            showCity: false,
            userInput: e.currentTarget.innerText
        });
    };

    onKeyDown = (e) => { // it works for arrow key up and down 
        const { activeOption, filteredCities } = this.state;
        if (e.keyCode === 13) {
            this.setState({
                activeOption: 0,
                showCity: false,
                userInput: filteredCities[activeOption]
            });
        } else if (e.keyCode === 38) {
            if (activeOption === 0) {
                return;
            }
            this.setState({ activeOption: activeOption - 1 });
        } else if (e.keyCode === 40) {
            if (activeOption === filteredCities.length - 1) {
                console.log(activeOption);
                return;
            }
            this.setState({ activeOption: activeOption + 1 });
        }
    };
    
    onClickButton = () => { // search city weather on clicking on search button
        this.props.handelChange(this.state.userInput);
    }

    render() {
        const { onChange, onClick, onKeyDown, onClickButton, state: { activeOption, filteredCities, showCity, userInput } } = this;
        let optionList;
        if (showCity && userInput) {
            if (filteredCities.length) {
                optionList = (
                    <ul className="options">
                        {filteredCities.map((cityName, index) => {
                            let className;
                            if (index === activeOption) {
                                className = 'option-active';
                            }
                            return (
                                <li className={className} key={cityName} onClick={onClick}>
                                    {cityName}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        }
        return (
            <React.Fragment>
                <div className="search">
                    <input
                        type="text"
                        className="search-box"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        placeholder="Search..."
                        value={userInput}
                    />
                    <button onClick={onClickButton}>Search</button>
                </div>
                <div className="option-box">
                    {optionList}
                </div>
            </React.Fragment>
        );
    }
}

export default Autocomplete;
