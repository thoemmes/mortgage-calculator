import React from 'react';
import Slider from '../slider/slider';
import PropTypes from 'prop-types';
import '../slider/slider.css';
import './slidervalue.css';

const SliderValue = ({setSliderPosition, mouseDown, mouseUp, sliderPosition, cursor, unit, handleChange, inputValue, step=1000, max }) => {

    return (
        //Show numeric value corresponding to sliderposition and allow to extend the range by setting the input value 
        <div className="slidervalue">
            <Slider  sliderPosition={sliderPosition} setSliderPosition={setSliderPosition}
                cursor={cursor}
                mouseDown={mouseDown}
                mouseUp={mouseUp}
               
                 />
            <input type="number" className="value" step={step} value={inputValue} onChange={e =>handleChange(e,max)} />
            <div className="unit">{unit}</div>
        </div>
    );
}


SliderValue.propTypes = {
  setSliderPosition: PropTypes.func.isRequired,
  mouseDown: PropTypes.func.isRequired,
  mouseUp: PropTypes.func.isRequired,
  sliderPosition: PropTypes.number.isRequired,
  cursor: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  inputValue: PropTypes.number.isRequired
}

export default SliderValue;
