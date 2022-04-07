import React, { useState } from "react";
import "./Styles/ReactsIcon.css"

function ReactsIcon (props) {
        return(
            <div className="reactsIcon" /*onClick={this.onIncrement(this.props.number)}*/>
                <div className="icon">
                    {React.createElement(props.Icon)}
                </div>
                <div className="iconInfo">
                    <h6 className="text">{props.text}</h6>
                    <h6 className="number">{props.number}</h6>
                </div>
            </div>
          )
}
 
export default ReactsIcon;