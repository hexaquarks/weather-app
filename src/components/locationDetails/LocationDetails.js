
import { dateBuilder } from '../../helper_functions.js';
import PropTypes from 'prop-types';

import styles from './LocationDetails.module.css'

const LocationDetails = ({ weather }) => {
    return (
        <div className={styles.location_box}>
            <div className={styles.location}>{weather.name}, {weather.sys.country}</div>
            <div className={styles.date}>{dateBuilder(new Date())}</div>
        </div>
    )
};

LocationDetails.propTypes = {
    weather: PropTypes.object.isRequired,
};

export default LocationDetails;