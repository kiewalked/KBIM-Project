import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import dietReducer from './dietSlice'
import exerciseReducer from './exerciseSlice'
import dateReducer from './dateSlice'
import authReducer from './authSlice'
import goalReducer from './goalSlice'
import notificationReducer from './notificationSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    exercise: exerciseReducer,
    diet: dietReducer,
    dailyHealth: dateReducer,
    auth: authReducer,
    goal: goalReducer,
    notifications: notificationReducer,
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