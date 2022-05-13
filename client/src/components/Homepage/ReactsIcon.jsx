import React, { useState } from "react";
import "./Styles/ReactsIcon.css"
/**
 * reusable component for reacts on posts
 * @param {Icon} Icon the desired icon chosen (example: heart icon for like)
 * @param {string} text the desired text to be displayed for the user describing the react (example: like)
 * @param {number} number the number of users who reacted (example: number of likes on a post)  
 * @returns {div}
 *          <ReactsIcon text="Like" number={numberOfLikes} Icon={LikeIcon}/>
 */
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