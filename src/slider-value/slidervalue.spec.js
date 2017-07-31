import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import SliderValue from './slidervalue';
import SliderMortgageComponent from './slidermortgagecomponent';

import { reducers } from '../store';
import { createStore } from 'redux';

describe('SliderValue', () => {

    it('renders SliderValue', () => {
        const sliderValue = renderer.create(<SliderValue sliderPosition="0.8" cursor="e-resize" unit="€" inputValue="50000" />);
        expect(sliderValue).toMatchSnapshot();
    });

    describe('SliderMortgageComponent', () => {

        let store;
        beforeEach(() => {
            store = createStore(reducers);

        });
       
        it('sets the slider to new position when inputValue is changed to a value lesser than max', () => {
            const sliderMortgageComponent = mount(<SliderMortgageComponent store={store} />);
            sliderMortgageComponent.find('input').simulate('change', { target: { value: 400000 } });
            let handle = sliderMortgageComponent.find('.outer_handle');
            expect(handle.prop('style').marginLeft).toEqual('80%');

        });

        
        it('sets the slider to new max when inputValue is changed to a value greater than max', () => {
            const sliderMortgageComponent = mount(<SliderMortgageComponent store={store} />);
            sliderMortgageComponent.find('input').simulate('change', { target: { value: 600000 } });
            let handle = sliderMortgageComponent.find('.outer_handle');
            expect(handle.prop('style').marginLeft).toEqual('100%');
            expect(store.getState().mortgageMax).toEqual(600000);

        });
    });

});
