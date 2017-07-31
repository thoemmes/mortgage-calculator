import SliderValueComponent from './slidervaluecomponent';
import { setAmortisationSliderPosition, setAmortisationSliderMove, setAmortisationMax, amortisationSelector, amortisationCursorSelector } from '../actions/actions';


const mapStateToProps = (state) => {
    
    return {  
        sliderPosition: state.ui.amortisationSlider.position,
        cursor: amortisationCursorSelector(state),
        inputValue: amortisationSelector(state),
        step: 100,
        max: state.amortisationMax
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSliderPosition: (v) => {
            dispatch(setAmortisationSliderPosition(v));

        },
        mouseDown: () => {
            dispatch(setAmortisationSliderMove(true));
        },
        mouseUp: () => {
            dispatch(setAmortisationSliderMove(false));

        },
        handleChange: (e, max) => {

            let input = e.target.value;    
            if(!Number.isNaN(input) && max !== 0){
                if(input > max){
                    dispatch(setAmortisationMax(input));
                    dispatch(setAmortisationSliderPosition(1));
                } else {
                    dispatch(setAmortisationSliderPosition(input/max));
                }
            }         

        }
    }
}

const SliderAmortisationComponent = SliderValueComponent(mapStateToProps, mapDispatchToProps);

export default SliderAmortisationComponent;