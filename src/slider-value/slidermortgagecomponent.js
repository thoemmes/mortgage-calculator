
import SliderValueComponent from './slidervaluecomponent';
import { setMortgageSliderPosition, setMortgageSliderMove, setMortgageMax, mortgageSelector, cursorSelector } from '../actions/actions';

const mapStateToProps = (state) => {
    return {
        sliderPosition: state.ui.mortgageSlider.position,
        cursor: cursorSelector(state),
        inputValue: mortgageSelector(state),
         max : state.mortgageMax
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

        },
        handleChange: (e, max) => {
            let input = e.target.value;
            if (!Number.isNaN(input) && max !== 0) {
                if (input > max) {
                    dispatch(setMortgageMax(input));
                    dispatch(setMortgageSliderPosition(1));
                } else {
                    dispatch(setMortgageSliderPosition(input / max));
                }
            }
        }
    }
}
const SliderMortgageComponent = SliderValueComponent(mapStateToProps, mapDispatchToProps);

export default SliderMortgageComponent;