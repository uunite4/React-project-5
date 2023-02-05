import React from "react";

export default function Die(props) {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#282D35"
  }

  return (
    <div onClick={props.hold} className="die" style={styles}>
      <p className="die-num">{props.value}</p>
    </div>
  )
}