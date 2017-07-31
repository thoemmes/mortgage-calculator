import SliderValueComponent from './slidervaluecomponent';
import { setInterestSliderPosition, setInterestSliderMove, setInterestMax, interestSelector, interestCursorSelector } from '../actions/actions';

const mapStateToProps = (state) => {
    return {
        sliderPosition: state.ui.interestSlider.position,
        cursor: interestCursorSelector(state),
        inputValue: interestSelector(state),
        step:0.1,
        max : state.interestMax
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSliderPosition: (v) => {
            dispatch(setInterestSliderPosition(v));

        },
        mouseDown: () => {
            dispatch(setInterestSliderMove(true));
        },
        mouseUp: () => {
            dispatch(setInterestSliderMove(false));

        },
        handleChange: (e, max) => {
            let input = e.target.value;    
            if(!Number.isNaN(input) && max !== 0){
                if(input > max){
                    dispatch(setInterestMax(input));
                    dispatch(setInterestSliderPosition(1));
                } else {
                    dispatch(setInterestSliderPosition(input/max));
                }
            }         
        }
    }
}
const SliderInterestComponent =  SliderValueComponent(mapStateToProps, mapDispatchToProps);

export default SliderInterestComponent;