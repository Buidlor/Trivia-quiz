import React from "react";

export default function Questions(props){
    return (
        <div className="questions">
            <h4>{decodeURIComponent(props.question)}</h4>
            <p><b>Correct answer:</b> {props.correct}</p>
        </div>
    )
}