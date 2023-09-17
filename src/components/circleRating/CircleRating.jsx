import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./circleRating.scss";

const CircleRating = ({ rating }) => {
    return (
        <div className="circleRating">
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                strokeWidth={8}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "#e91e63" : rating < 7 ? "#ffc107" : "#4caf50",
                       
                })}
            />
        </div>
    );
};

export default CircleRating;