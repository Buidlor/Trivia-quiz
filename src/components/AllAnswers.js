import React from "react";  

export default function AllAnswers(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#F5F7FB"
    }
    return(
        <div className="selection">
            <button 
                className="buttonSelection"
                style={styles}
                onClick={props.selected}
            >    
                    {props.value}
            </button>
        </div>
   
    )
}
      
      
