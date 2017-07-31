import { connect } from 'react-redux';
import SliderValue from './slidervalue';

const SliderValueComponent = (mapStateToProps, mapDispatchToProps) => {

    return connect(mapStateToProps, mapDispatchToProps)(SliderValue);
};

export default SliderValueComponent;