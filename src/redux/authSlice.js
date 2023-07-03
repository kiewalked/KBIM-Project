import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isSignedIn: false,
        userList: [{
            username: "kbimtest@gmail.com",
            password: "12345",
        }],
    },
    reducers: {
        authenticate: {
            reducer(state, action) {
                const { username, password } = action.payload
                const userObj = {
                    username: username,
                    password: password
                }
                console.log("attempting sign in");
                console.log(state.userList);
                if (state.userList.find(element => element.username === username
                                        && element.password === password) != undefined) {
                    state.isSignedIn = true;
                    console.log("signed in!")
                }
            },
            prepare(username, password) { 
                return {
                    payload: {
                        username,
                        password
                    }
                }
            }
        },
        signup: {
            reducer(state, action) {
                const { username, password } = action.payload;
                state.userList.push({
                    username: username,
                    password: password
                })
            },
            prepare(username, password) {
                return {
                    payload: {
                        username,
                        password
                    }
                }
            }
        },
        logout: {
            reducer(state, action) {
                state.isSignedIn = false;
            },
            prepare(username) {
                return {
                    payload: {
                        username
                    }
                }
            }
        }
    },
  })
  
export const { authenticate, signup, logout } = authSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPicture = (state) => state.auth.authPictures

export default authSlice.reducer
  