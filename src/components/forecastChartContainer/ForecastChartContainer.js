import { useState } from 'react';
import { dateBuilder } from '../../helper_functions.js';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Context } from '../Page/Page';

import triangle from '../../assets/triangle.png'
import triangle_blue from "../../assets/triangle_blue.png"
import { BarChart, Bar, LineChart, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

import styles from './ForecastChartContainer.module.css';

const CustomTooltip = ({ active, payload, label, unitState }) => {

    if (active) {
        return (
            <div className={styles.custom_tooltip}>
                <p className={styles.toolBox_dayLabel}>{`${label}`}
                </p>
                <img src={triangle} id={styles.triangle_icon} />
                <span className={styles.toolBox_temp}>
                    {`${payload[0].value[0]}`} {unitState}
                </span>
                <br></br>
                <img src={triangle_blue} id={styles.triangle_icon_blue} />
                <span className={styles.toolBox_temp} >
                    {`${payload[0].value[1]}`} {unitState}
                </span>
                <p className={styles.intro} ></p>
            </div>
        );
    }

    return null;
};

export const graphBuilderTemperature = (forecastWeather, unitState) => {
    if (forecastWeather.daily === undefined) return ' ';
    forecastWeather = forecastWeather.daily;

    const data = [
        {
            day: 'Today',
            temp: [
                Math.round(forecastWeather[0].temp.max),
                Math.round(forecastWeather[0].temp.min),
            ],
            temp_max: Math.round(forecastWeather[0].temp.max) + '°',
            temp_min: Math.round(forecastWeather[0].temp.min) + '°'
        }
    ];

    var dayIncrement = new Date();
    dayIncrement.setDate(dayIncrement.getDate() + 1);

    for (var i = 1; i < 5; i++) {
        data.push(
            {
                day: dateBuilder(dayIncrement).substr(
                    0, dateBuilder(dayIncrement).indexOf(' ')),
                temp: [
                    Math.round(forecastWeather[i].temp.max),
                    Math.round(forecastWeather[i].temp.min),
                ],
                temp_max: Math.round(forecastWeather[i].temp.max) + '°',
                temp_min: Math.round(forecastWeather[i].temp.min) + '°'
            }
        );
        dayIncrement.setDate(dayIncrement.getDate() + 1);
    }
    return (
        <ResponsiveContainer>
            <BarChart className="barChart"
                width="100%"
                height={250}
                data={data}
                margin={{
                    top: 50, bottom: 5, right: 10, left: 10
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="yellow" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="day" angle="-45" />
                <Tooltip
                    cursor={{ fill: '#2e2d2d' }}
                    content={<CustomTooltip unitState={unitState} />}
                />

                {/* <Line type="monotone" dataKey="temp_min" stroke="red" /> */}
                <Bar dataKey="temp" stroke="gray" fillOpacity={0.52} fill="url(#colorUv)" >
                    <LabelList dataKey="temp_min" position="top" offset={8} strokeWidth={1} stroke="white" />
                    <LabelList dataKey="temp_max" position="bottom" offset={8} stroke="white" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>

    )
}

export const graphBuilderPrecipitation = (forecastWeather) => {
    if (forecastWeather.daily === undefined) return ' ';
    forecastWeather = forecastWeather.daily;

    const data = [
        {
            day: 'Today',
            pop: Math.round(forecastWeather[0].pop * 100 ),
            pop_percent: Math.round(forecastWeather[0].pop  * 100) + '%',
            top_rect: 4

        }
    ];

    var dayIncrement = new Date();
    dayIncrement.setDate(dayIncrement.getDate() + 1);

    for (var i = 1; i < 5; i++) {
        data.push(
            {
                day: dateBuilder(dayIncrement).substr(
                    0, dateBuilder(dayIncrement).indexOf(' ')),
                pop: Math.round(forecastWeather[i].pop  * 100),
                pop_percent: Math.round(forecastWeather[i].pop  * 100) + '%',
                top_rect: 4
            }
        );
        dayIncrement.setDate(dayIncrement.getDate() + 1);
    }

    return (
        <ResponsiveContainer>
            <BarChart className="barChart"
                width="100%"
                height={250}
                data={data}
                margin={{
                    top: 50, bottom: 5, right: 10, left: 10
                }}
                barCategoryGap={0}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#558cd3" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="gray" />
                <Tooltip
                    cursor={{ fill: '#2e2d2d' }}
                    content={<CustomTooltip />}
                />

                {/* <Line type="monotone" dataKey="temp_min" stroke="red" /> */}
                <Bar dataKey="pop" stackId={1} strokeWitdth={6} fillOpacity={1} fill="url(#colorUv)" >
                    <LabelList dataKey="pop_percent" position="top" offset={15} stroke="white" />
                </Bar>
                <Bar dataKey="top_rect" stackId={1} fill="#1A73E8" ></Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

const ForecastChartContainer = ({ forecastWeather }) => {
    const [graphType, setGraphType] = useState("temp");

    const changeGraph = () => {
        graphType === "temp" ? setGraphType("precipitations") : setGraphType("temp")
    }

    const changeIcon = () => {
        if (graphType === "temp") {
            return `${styles.forecast_graph_reload} ${styles.precipitation}`;
        } else {
            return `${styles.forecast_graph_reload} ${styles.temperature}`;
        }
        // return (graphType === "temp") ? `${styles.forecast_graph_reload} ${styles.precipitation}`:`${styles.forecast_graph_reload} ${styles.temeprature}`
    }

    const { unitState } = useContext(Context);
    return (
        <div className={styles.forecast_graph} >
            {graphType === "temp" ? graphBuilderTemperature(forecastWeather, unitState) : graphBuilderPrecipitation(forecastWeather)}
            <button className={changeIcon()} onClick={() => changeGraph()}></button>
        </div>
    )

}

ForecastChartContainer.propTypes = {
    forecastWeather: PropTypes.object.isRequired,
};

export default ForecastChartContainer;