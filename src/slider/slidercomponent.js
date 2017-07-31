import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from './slider'


const mapStateToProps = (state) => {
  return {
    sliderPosition: state.ui.mortgageSlider.position,
    cursor: (state.ui.mortgageSlider.isMoving ? 'e-resize' : 'default')
  }
}


const setMortgageSliderPosition = (pos) => {
  return {
    type: 'SET_MORTGAGE_SLIDER',
    position: pos
  }
}


const setMortgageSliderMove = (isMoving) => {
  return {
    type: 'MORTGAGE_SLIDER_MOVING',
    isMoving
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSliderPosition: (v) => {
      dispatch(setMortgageSliderPosition(v));
    },
    mouseDown: () => {
      dispatch(setMortgageSliderMove(true));
    },
    mouseUp: () => {
      dispatch(setMortgageSliderMove(false));

    }
  }
}

const SliderComponent = connect(mapStateToProps, mapDispatchToProps)(Slider);

// SliderComponent.propTypes = {
//   setSliderPosition: PropTypes.func.isRequired,
//   //   mouseDown: PropTypes.func.isRequired,
//   //   mouseUp: PropTypes.func.isRequired,
//   //   sliderPosition: PropTypes.number.isRequired,
//   cursor: PropTypes.string.isRequired
// };

export default SliderComponent;

