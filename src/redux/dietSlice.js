import { createSlice } from '@reduxjs/toolkit'

export const dietSlice = createSlice({
    name: 'diet',
    initialState: {
      dietPictures: [],
    },
    reducers: {
      addPicture: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        console.log(action.payload);
        state.dietPictures.splice(action.payload.index, 0, action.payload.source)
        console.log(state.dietPictures[0]);
      },
    },
  })
  
export const { addPicture } = dietSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPicture = (state) => state.diet.dietPictures

export default dietSlice.reducer
  