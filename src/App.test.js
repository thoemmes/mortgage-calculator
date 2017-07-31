import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

describe('App snapshot', () => {

  window.fetch = jest.fn().mockImplementation(() =>{
    return Promise.resolve({
                        ok: true,
                        json: () => {
                            return new Promise((resolve, reject) => {
                                process.nextTick(() => {
                                    resolve({
                                        dataset: {
                                            data: [
                                                [0, -0.3299]
                                            ]
                                        }
                                    });
                                });
                            });
                        }
                    });
  });
  
    
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});