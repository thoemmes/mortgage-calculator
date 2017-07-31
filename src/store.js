import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';


// const ui = (state, action) => {
//     console.log(state);
//     switch (action.type) {
//         case 'SET_MORTGAGE_SLIDER':
//         case 'MORTGAGE_SLIDER_MOVING':
//             return {
//                 ...state,
//                 mortgageSlider: mortgageSlider(state.mortgageSlider, action)
//             };
//         case 'SET_AMORTISATION_SLIDER':
//         case 'AMORTISATION_SLIDER_MOVING': 
//             return{
//                 ...state,
//                 amortisationSlider: amortisationSlider(state.amortisationSlider, action)
//             }; 

//         default:
//             return { 
//                 mortgageSlider : mortgageSlider(state, action),
//                 amortisationSlider : amortisationSlider(state, action)
//             };
//     }
// }



const mortgageSlider = (state = {
    position: 0.5,
    isMoving: false
}, action) => {
    switch (action.type) {
        case 'SET_MORTGAGE_SLIDER':
            return {
                ...state,
                position: action.position,
            };
        case 'MORTGAGE_SLIDER_MOVING':
            return {
                ...state,
                isMoving: action.isMoving
            }
        default:
            return state;
    }
}

const amortisationSlider = (state = {
    position: 0.5,
    isMoving: false
}, action) => {
    switch (action.type) {
        case 'SET_AMORTISATION_SLIDER':
            return {
                ...state,
                position: action.position,
            };
        case 'AMORTISATION_SLIDER_MOVING':
            return {
                ...state,
                isMoving: action.isMoving
            }
        default:
            return state;
    }
}


const interestSlider = (state = {
    position: 0.5,
    isMoving: false
}, action) => {
    switch (action.type) {
        case 'SET_INTEREST_SLIDER':
            return {
                ...state,
                position: action.position,
            };
        case 'INTEREST_SLIDER_MOVING':
            return {
                ...state,
                isMoving: action.isMoving
            }
        default:
            return state;
    }
}


const ui = combineReducers({mortgageSlider, amortisationSlider, interestSlider});

const mortgageMax = (state = 500000
    , action) => {
    switch (action.type) {

        case 'SET_MORTGAGE_MAX': {
            return action.max;

        }
        default:
            return state;
    }
}

const amortisationMax = (state = 2000
    , action) => {
    switch (action.type) {

        case 'SET_AMORTISATION_MAX': {
            return action.max;

        }
        default:
            return state;
    }
}

const interestMax = (state = 5
    , action) => {
    switch (action.type) {

        case 'SET_INTEREST_MAX': {
            return action.max;

        }
        default:
            return state;
    }
}


// const interest = (state = 0.02, action) => {
//     switch (action.type) {
//         case 'SET_INTEREST':
//             return action.interest;
//         default:
//             return state;
//     }
// }

// const amortisation = (state = 0.02, action) => {
//     switch (action.type) {
//         case 'SET_AMORTISATION':
//             return action.amortisation;
//         default:
//             return state;
//     }
// }


export const reducers = combineReducers({
    ui,
    mortgageMax,
    //interest,
    amortisationMax,
    interestMax
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;




// const mortgage = (mortgage: 50000, action) => {
//     switch (action.type) {
//         case 'MORTGAGE':
//             return {
//                 ...state,
//                 mortgage: action.amount
//             };
//     }

//     return state;
// }

// const mortgageSliderPosition = (state = 0.5, action) => {
//     switch (action.type) {
//         case 'SET_MORTGAGE_SLIDER':
//             return action.position;
//         default:
//             return state;
//     }
// }

// const mortgageSliderCursor = (state = 'default', action) => {
//     switch (action.type) {
//         case 'SET_CURSOR':
//             return action.cursor;
//         default:
//             return state;
//     }
// }

// const mortgageSliderMove = (state = 'default', action) => {
//     switch (action.type) {
//         case 'MORTGAGE_SLIDER_MOVE':
//             return action.move ? 'e-resize' : 'default';
//         default:
//             return state;
//     }
// }
