import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './SearchBox.module.css';


const SearchBox = ({ submitSearch }) => {

    const [cityName, setCityName] = useState('');

    const onKeyPress = e => {
        if(!cityName || cityName ==='') return;
        if(e.key==="Enter") submitSearch(cityName);
    }
    return (
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
    )
}

SearchBox.propTypes = {
    submitSearch: PropTypes.func.isRequired,
};

export default SearchBox;