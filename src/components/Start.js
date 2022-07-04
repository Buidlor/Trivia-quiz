export default function Start(props){
    return(
        <div className="startScreen">
            <h1>Quizzical</h1>
            <h5>Click the start button to start the Quiz</h5>
            <button onClick={props.clickStart} className="startButton">Start</button>
        </div>
    )
}