import { SET_COUNTER } from './actions';

const initialState = {
    counter: 0,
}

function counterReducer(state = initialState, action) {
    switch (action.type) {
        case SET_COUNTER: 
            return { ...state, counter: state.counter + 1};
        default:
            return state;
    }
}

export default counterReducer;