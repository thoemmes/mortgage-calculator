import React, { Component } from 'react';

import SliderMortgageComponent from './slider-value/slidermortgagecomponent';
import SliderAmortisationComponent from './slider-value/slideramortisationcomponent';
import SliderInterestComponent from './slider-value/sliderinterestcomponent';

import './slider/slider.css';
import './App.css';

import { Provider } from 'react-redux'

import store from './store';

import D3Component, { createBarChart } from './charts/chart';
import { fetchEuribor, setInterestSliderPosition } from './actions/actions';

// store.dispatch(fetchEuribor('reactjs')).then(() =>
//   console.log(store.getState())
// )


class App extends Component {

  constructor() {
    super();
    fetchEuribor('https://www.quandl.com/api/v3/datasets/BOE/IUQAERB3.json?api_key=FfF1zN9ZYyTEitZzhEDJ')
      .then(euribor => {
        store.dispatch(setInterestSliderPosition((euribor + 2) / store.getState().interestMax));
      })
      .catch(err => {
        console.log(err);
      });

  }
  render() {

    return (
      <Provider store={store}>
        <div className="App" >
          {/* prevent selecting any element besides input, as once an element is selected while actually sliding , sliding won't work properly */}
          <D3Component size={[window.innerWidth, 400]} d3render={createBarChart} ref={node => { this.d3Node = node.firstChild; }} />
          <div className="slidercontainer" onMouseDown={e => { if (e.target.nodeName.localeCompare('INPUT') !== 0) e.preventDefault() }}  >
            <div className="slidergroup">
              <div className="label">Interest</div><SliderInterestComponent unit="%" />
            </div>
            <div className="slidergroup">
              <div className="label">Amortisation</div><SliderAmortisationComponent unit="€" />
            </div>
            <div className="slidergroup">
              <div className="label">Mortgage</div><SliderMortgageComponent unit="€" />
            </div>
          </div>
          <div className="license">Icons made by
            <a href="http://www.freepik.com" title="Freepik">Freepik</a> from
            <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by
            <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
          </div>
        </div>
      </Provider >
    );
  }
}

export default App;

// let i = 0;
// const Probe = ({ total }) => {
//   ++i;
//   return (
//     <div>{Math.round(total)}  {i}</div>

//   )
// }

// const mapStateToProps = (state) => {
//   return {
//     value: state.ui.mortgageSlider.position,
//     total: mortgageSelector(state) * ((1 + state.ui.interestSlider.position) * state.interestMax)
//   }
// }
// const ProbeComponent = connect(mapStateToProps)(Probe);
// <ProbeComponent total={store.getState().total} position={store.getState().ui.mortgageSlider.position} />