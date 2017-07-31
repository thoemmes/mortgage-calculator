import React from 'react';
import './slider.css';

//const isLeftButtonPressed = ev => ev.buttons === 1;
const sliderInMoveMode = cursor => cursor !== 'default';


const calculateRelativePosition = (sliderPos, rect) => {

  let value = (sliderPos - rect.left) / (rect.width);

  if (value > 1) {
    value = 1;
  } else if (value < 0) {
    value = 0;
  }
  return value;
}

// A horizontal slider component. The slider can be "dragged" by pressing the left mouse button
// The slider is positioned via the margin-left css property. The Position prop is manipulated by calling
// the setSliderPosition function, sliderPosition is in the range of [0,1]
const Slider = ({ setSliderPosition, mouseDown, mouseUp, sliderPosition, cursor, rect }) => {

  const mouseMove = (ev) => {
    //if (ev.buttons !== 0 && rect.width !== 0) {
    if (sliderInMoveMode(cursor) && rect.width !== 0) {

      let newPos = calculateRelativePosition(ev.clientX, rect);
      setSliderPosition(newPos);

    }
  }
  
  return (
    <div className="slider"
      
      onMouseMove={mouseMove}
      //By calling mouseMove it is assured that the user can reach the slider limits
      // regardless of screen resolution issues
      onMouseLeave={(e) => { mouseMove(e); mouseUp(e); }}
      //onMouseLeave={(e) => { mouseMove(e); }}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      ref={el => { if (el && !rect) rect = el.getBoundingClientRect(); }}
      style={{
        cursor: cursor
      }}
    >
      <div className="outer_handle"
        draggable="false"
        style={{
          marginLeft: sliderPosition * 100 + '%',
          cursor: cursor
        }}><span className="handle">IIII</span></div>
    </div>
  )
};



export default Slider;