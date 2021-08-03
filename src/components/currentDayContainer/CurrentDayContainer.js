
import CurrentDayContainerOverview from "../currentDayContainerOverview/CurrentDayContainerOverview.js"
import CurrentDayContainerDetails from "../currentDayContainerDetails/CurrentDayContainerDetails.js"
import PropTypes from 'prop-types';

import styles from './CurrentDayContainer.module.css'


import React, { useState, useEffect, useRef } from 'react'


const CurrentDayContainer = ({ weather }) => {
    // const [dimensions, setDimensions] = React.useState({
    //     height: window.innerHeight,
    //     width: window.innerWidth
    // });
    // const [ scale, setScale ] = useState(0);
    // useEffect(() => {
    //     // function handleResize() {
    //     //     setScale(
    //     //         Math.min(this.offsetWidth / window.innerWidth , 
    //     //             this.offsetHeight / window.innerHeight
    //     //     ));
    //     // }
    //     function handleResize() {
    //         setDimensions({
    //             height: this.offsetHeight / window.innerHeight,
    //             width: this.offsetWidth / window.innerWidth
    //         });

    //     }

    //     window.addEventListener('resize', handleResize)

    //     return _ => {
    //         window.removeEventListener('resize', handleResize)

    //     }
    // });
    const stageCanvasRef = useRef(null);

    // useEffect will run on stageCanvasRef value assignment
    useEffect( () => {

        // The 'current' property contains info of the reference:
        // align, title, ... , width, height, etc.
        if(stageCanvasRef.current){

            let height = stageCanvasRef.current.offsetHeight;
            let width  = stageCanvasRef.current.offsetWidth;
        }

    }, [stageCanvasRef]);
    // { width: `${dimensions.width}px`, height: `${dimensions.height}px` }
    // transform: `translate(-50%, -50%) ` + `scale(` + scale + `)`
    

    return (
        <div className={styles.main_container} >
            {/* the weather box (left) */}
            < CurrentDayContainerOverview weather={weather} />
            {/* the weather information rectangle (right) */}
            < CurrentDayContainerDetails weather={weather} />
        </div>
    )
}

CurrentDayContainer.propTypes = {
    weather: PropTypes.object.isRequired,
};

export default CurrentDayContainer;