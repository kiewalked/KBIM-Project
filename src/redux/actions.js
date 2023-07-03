export const SET_COUNTER = 'SET_COUNTER';

export const setCounter = counter => dispatch => {
    dispatch({
        type: SET_COUNTER,
        payload: counter,
    });
}