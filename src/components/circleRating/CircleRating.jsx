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
                strokeWidth={5}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "#846cfff3" : rating < 7 ? "#746cfff3" : "#646cfff3",
                       
                })}
            />
        </div>
    );
};

export default CircleRating;