import { createSelector } from 'reselect';
import { calculateAmortisation } from './calculations';

export const setMortgageSliderPosition = (pos) => {
    return {
        type: 'SET_MORTGAGE_SLIDER',
        position: pos
    }
}


export const setMortgageSliderMove = (isMoving) => {
    return {
        type: 'MORTGAGE_SLIDER_MOVING',
        isMoving
    }
}



export const setMortgageMax = (max) => {
    return {
        type: 'SET_MORTGAGE_MAX',
        max
    }
}


export const setAmortisationSliderPosition = (pos) => {
    return {
        type: 'SET_AMORTISATION_SLIDER',
        position: pos
    }
}


export const setAmortisationSliderMove = (isMoving) => {
    return {
        type: 'AMORTISATION_SLIDER_MOVING',
        isMoving
    }
}



export const setAmortisationMax = (max) => {
    return {
        type: 'SET_AMORTISATION_MAX',
        max
    }
}


export const setInterestSliderPosition = (pos) => {
    return {
        type: 'SET_INTEREST_SLIDER',
        position: pos
    }
}

export const setInterestMax = (max) => {
    return {
        type: 'SET_INTEREST_MAX',
        max
    }
}


export const setInterestSliderMove = (isMoving) => {
    return {
        type: 'INTEREST_SLIDER_MOVING',
        isMoving
    }
}



export const setInterest = (interest) => {
    return {
        type: 'SET_INTEREST',
        interest
    }
}


export const REQUEST_EURIBOR = 'REQUEST_EURIBOR'

export const requestEuribor = (period) => {
    return {
        type: REQUEST_EURIBOR,
        period
    }
}


export const RECEIVE_EURIBOR = 'RECEIVE_EURIBOR'

export const receiveEuribor = (response) => {
    return {
        type: RECEIVE_EURIBOR,
        response
    }
}


// export const fetchEuribor = (period) => {

//     // Thunk middleware knows how to handle functions.
//     // It passes the dispatch method as an argument to the function,
//     // thus making it able to dispatch actions itself.

//     //return (dispatch) => {

//     // First dispatch: the app state is updated to inform
//     // that the API call is starting.

//     //dispatch(requestPosts(subreddit))

//     // The function called by the thunk middleware can return a value,
//     // that is passed on as the return value of the dispatch method.

//     // In this case, we return a promise to wait for.
//     // This is not required by thunk middleware, but it is convenient for us.

//     //https://www.quandl.com/api/v3/datasets/BOE/IUQAERB3.json?api_key=FfF1zN9ZYyTEitZzhEDJ

//     return fetch(`https://www.quandl.com/api/v3/datasets/BOE/IUQAERB3.json?api_key=FfF1zN9ZYyTEitZzhEDJ`)
//         .then(response => {

//             if (response.ok) {
//                 //Promise with json data    
//                 return response.json();
//             }

//             throw new Error('Network response was not ok.');
//             //console.log('fetch');
//             //console.log(response);

//             // We can dispatch many times!
//             // Here, we update the app state with the results of the API call.

//             //dispatch(receiveEuribor(response))
//             //dispatch(setInterest(0.1));
//         })

//     // In a real world app, you also want to
//     // catch any error in the network call.
//     //}
// }


export const fetchEuribor = (url) => {

    return fetch(url)
        .then(response => {

            if (response.ok) {
                //Promise with json data    
                return response.json().then(euriborData => euriborData.dataset.data[0][1]);
            }

            throw new Error('Network response was not ok.');

        });

}



export const fetchEuriborX = (fetch, url) => {

    return fetch(url); //.then(response => {

    //return new Promise( () => -0.3299);
    // if (response.ok) {
    //     //Promise with json data    
    //     return response.json();
    // }

    // throw new Error('Network response was not ok.');
    //});

}





const sliderPosition = state => state.ui.mortgageSlider.position;
const mortgageMaximum = state => state.mortgageMax;

const isMoving = state => state.ui.mortgageSlider.isMoving;


export const mortgageSelector = createSelector([sliderPosition, mortgageMaximum], (sliderPos, max) => {
    let raw = sliderPos * max;
    if (raw < 1000) {
        return raw;
    }
    return Math.round(sliderPos * max / 1000) * 1000;
});


export const cursorSelector = createSelector([isMoving], (isMoving) => isMoving ? 'e-resize' : 'default');



const amortisationSliderPosition = state => state.ui.amortisationSlider.position;
const amortisationMaximum = state => state.amortisationMax;

const amortisationIsMoving = state => state.ui.amortisationSlider.isMoving;

export const amortisationSelector = createSelector([amortisationSliderPosition, amortisationMaximum], (sliderPos, max) => {
    let raw = sliderPos * max;
    if (raw < 100) {
        return raw;
    }
    return Math.round(sliderPos * max / 100) * 100;

});


export const amortisationCursorSelector = createSelector([amortisationIsMoving], (isMoving) => isMoving ? 'e-resize' : 'default');


const interestSliderPosition = state => state.ui.interestSlider.position;
const interestMaximum = state => state.interestMax;

const interestIsMoving = state => state.ui.interestSlider.isMoving;

export const interestSelector = createSelector([interestSliderPosition, interestMaximum], (sliderPos, max) => {
    return Math.round(sliderPos * max * 10) / 10;
});


export const interestCursorSelector = createSelector([interestIsMoving], (isMoving) => isMoving ? 'e-resize' : 'default');



export const mortgage = state => state.ui.mortgageSlider.position * state.mortgageMax
export const amortisation = state => state.ui.amortisationSlider.position * state.amortisationMax
export const interestRate = state => state.ui.interestSlider.position * state.interestMax

export const ratesSelector = createSelector([mortgage, amortisation, interestRate], (mortgage, amortisation, interestRate) => {

    let payments = calculateAmortisation(mortgage, amortisation, interestRate);
    payments.unshift({ mortgage, amortisation: 0, total: mortgage });

    return payments;

});



