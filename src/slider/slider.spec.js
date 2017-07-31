import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Slider from './slider';
import './slider.css';
import SliderComponent from './slidercomponent';
import { setMortgageSliderPosition } from '../actions/actions';
import { Provider } from 'react-redux';
import { reducers } from '../store';
import { createStore } from 'redux';

describe('Slider', () => {

  const initialState = {
    mortgageSlider: {
      sliderPosition: 0.5,
      isMoving: true
    }
  };
  const mockStore = configureStore();
  let store;
  const el = document.createElement('div');
  beforeEach(() => {
    //store = mockStore(initialState);
    store = createStore(reducers);

  })

  it('renders without crashing', () => {
    shallow(<Slider />);
  });

  it('renders default cursor', () => {
    const component = renderer.create(<Slider cursor='default' />);
    //let handle= slider.find('.outer_handle');

    const slider = component.toJSON();

    expect(slider).toMatchSnapshot();
    expect(slider.props.style.cursor).toEqual('default');
  });


  it('renders starts with position 0.5', () => {
    const component = renderer.create(<Slider cursor='default' sliderPosition='0.5' />);

    const slider = component.toJSON();
    const handle = slider.children[0];

    expect(handle.props.style.marginLeft).toEqual('50%');
  });

  it('moves slider with mouse move and button left', () => {


    // const component = mount(<Provider store={store}><SliderComponent rect={{ left: 0, width: 100 }}/></Provider> );

    const component = mount(<SliderComponent store={store} rect={{ left: 0, width: 100 }} />);

    component.simulate('mousedown');
    component.simulate('mousemove', { buttons: 1, clientX: 90 });
    /*  let action = store.getActions();
      expect(action[0].type).toBe("SET_MORTGAGE_SLIDER");
      expect(action[0].position).toEqual(0.9);
      */
    //store.dispatch(setMortgageSliderPosition(0.9));

    let handle = component.find('.outer_handle');
    expect(handle.prop('style').marginLeft).toEqual('90%');

  });


  it(' should not move with no mouse buttons pressed', () => {


    const component = mount(<SliderComponent store={store} rect={{ left: 0, width: 100 }} />);

    component.simulate('mousemove', { buttons: 0, clientX: 90 });

    let handle = component.find('.outer_handle');
    expect(handle.prop('style').marginLeft).toEqual('50%');

  });

 it('changes cursor to e-resize on mouse down', () => {


    const sliderComponent = mount(<SliderComponent store={store} rect={{ left: 0, width: 100 }} />);

    sliderComponent.simulate('mousedown');
    
    let handle = sliderComponent.find('.outer_handle');
    expect(handle.prop('style').cursor).toEqual('e-resize');
    let slider = sliderComponent.find('.outer_handle');
    expect(slider.prop('style').cursor).toEqual('e-resize');
  });





 it('changes cursor to default on mouse up', () => {


    const sliderComponent = mount(<SliderComponent store={store} rect={{ left: 0, width: 100 }} />);

    sliderComponent.simulate('mousedown');
    
    const handle = sliderComponent.find('.outer_handle');
    const slider = sliderComponent.find('.slider');

    expect(handle.prop('style').cursor).toEqual('e-resize');

    sliderComponent.simulate('mouseup');
    expect(handle.prop('style').cursor).toEqual('default');
    expect(slider.prop('style').cursor).toEqual('default');

  });


})