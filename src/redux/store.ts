import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import dietReducer from './dietSlice'
import exerciseReducer from './exerciseSlice'
import dateReducer from './dateSlice'
import authReducer from './authSlice'
import goalReducer from './goalSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    exercise: exerciseReducer,
    diet: dietReducer,
    dailyHealth: dateReducer,
    auth: authReducer,
    goal: goalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;