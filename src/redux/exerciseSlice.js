import { createSlice } from '@reduxjs/toolkit'

export const exerciseSlice = createSlice({
    name: 'exercise',
    // State of exercises will be a list of objects
    // Exercise object needs to contain:
    // Time spent exercising
    // Intensity level of exercise
    initialState: {
      exercises: [],
    },
    reducers: {
      addExercise: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.exercises.push(action.payload)
      },
    },
  })
  
export const { addExercise } = exerciseSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.exercise.value)`
export const selectExercise = (state) => state.exercise.exercises

export default exerciseSlice.reducer
  