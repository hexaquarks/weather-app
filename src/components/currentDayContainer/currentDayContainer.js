
import Overview from "./components/overview.js"
import Details from "./components/details.js"
import PropTypes from 'prop-types';

import styles from './currentDayContainer.module.css'
import React from 'react'

const CurrentDayContainer = ({ weather }) => {
    return (
        <div className={styles.main_container} >
            {/* the weather box (left) */}
            < Overview weather={weather} />
            {/* the weather information rectangle (right) */}
            < Details weather={weather} />
        </div>
    )
}

CurrentDayContainer.propTypes = {
    weather: PropTypes.object.isRequired,
};

export default CurrentDayContainer;