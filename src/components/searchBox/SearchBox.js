import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import styles from './SearchBox.module.css';
import { Wrapper } from '@googlemaps/react-wrapper';

import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';

const API_KEY = "AIzaSyBjKKec37EAKDxD0xiWTBOIN9NzbeQiZOY";

const SearchBox = ({ submitSearch }) => {

    const [cityName, setCityName] = useState('');

    const onKeyPress = e => {
        if (!cityName || cityName === '') return;
        if (e.key === "Enter") submitSearch(cityName);
    }
    return (
        <Wrapper apiKey={API_KEY}>
            <div className={styles.search_box} >
                <input
                    type="text"
                    className={styles.search_bar}
                    placeholder="Search..."
                    onChange={e => setCityName(e.target.value)}
                    value={cityName} //cityName
                    onKeyPress={onKeyPress} //search 
                />
            </div>
        </Wrapper>
    )
}

SearchBox.propTypes = {
    submitSearch: PropTypes.func.isRequired,
};

export default SearchBox;