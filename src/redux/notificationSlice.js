import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        notificationsEnabled: false,
        notificationTime: '0900',
    },
    reducers: {
        toggleNotifications: {
            reducer(state, action) {
                console.log(state)
                state.notificationsEnabled = action.payload
            }
        },
        changeNotificationTime: {
            reducer(state, action) {
                state.notifications.notificationTime = action.payload
            }
        }
    }
});
  
export const { toggleNotifications, changeNotificationTime } = notificationSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.goal.value)`
export const selectGoal = (state) => state.goal.goals

export default notificationSlice.reducer
  