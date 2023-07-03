import { createSlice } from '@reduxjs/toolkit'

/* 
In terms of date logic, I need to have it so that any time the app is opened and the date has changed since the last time the app was opened, it performs a date flush of the Daily Health checkin and moves it to History

The current structure is that we have separate slices for all the data required on a specific date.
When the date changes, we need to run some logic that groups all that data with the respective date and adds it to the data store.
We then need to reset all of those groups in preparation for the new date.

Right now I am considering two options:
The first is to continue with this separated group structure. This is much simpler to interact with, since we do it on a day-by-day basis, but resetting every day will be more annoying
The alternative is to change it so that we only interact with the date structure, and always query to the associated date. This would simplify resetting, as we can now query to reset whenever we load the Daily Health or History pages. The Daily Health then simply presents whatever is inside the store for that day.

Going to try the second and see how it goes.

Thinking about it, it may be better to perform a reset whenever we visit the Homepage. If someone is in the Daily Health screen at midnight, we would ideally let them continue editing it UNTIL they exit back to Home.

Think I figured it out:
1. When we access the Daily Health screen, we pass it a date. If we access today's, then we pass it the date at the time we access it. If we access History, then we pass it an old date. The daily health screen will then process and fetch all of its results from the date that gets passed in.
2. We should either query for a date change whenever we go back to Home screen, since this will matter for the traffic light system, OR we could listen for the date change at any time and just perform it then. Alternatively, we could just query the current date, and then query today's daily health data to see if anything is complete.
3. History can simply display any dates in its system that precede the current date.
*/

export const dateSlice = createSlice({
    name: 'date',
    initialState: {
      history: {
        "2023-04-20": {
            "diet": [], 
            "exercises": [
                {
                    "intensity": "light", 
                    "time": 60, 
                    "title": "Walking"
                }, 
                {
                    "intensity": "vigorous", 
                    "time": 120, 
                    "title": "Volleyball"
                }
            ], 
            "sleep": {
                "quality": "Decent", 
                "time": 8
            }
        }
      }
      /* 
        history: {
            date (yyyy-mm-dd): {
                exercises: [{
                    type: string
                    timeSpent (minutes): Number
                    intensity: light | moderate | vigorous
                }],
                sleep: {
                    timeSpent (minutes): Number
                },
                diet: [{
                    mealIndex: Number
                    imageSource: Obj
                }],
            },
            date2 (yyyy-mm-dd): {
                ...
            },
            ...
        }
      */
    },
    reducers: {
        verifyDateExists: {
            reducer(state, action) {
                const { date } = action.payload;
                if (state.history[date] === undefined) {
                    state.history[date] = {
                        exercises: [],
                        sleep: {},
                        diet: []
                    }
                }
                console.log("date verified");
                // if (state.history.find(day => day.date === action.payload.date) === undefined) {
                //     state.history.push({
                //         date: action.payload.date,
                //         exercises: [],
                //         sleep: {},
                //         diet: []
                //     });
                // }
            },
            prepare(date) {
                return {
                    payload: {
                        date
                    }
                }
            },
        },
        addPicture: {
            reducer(state, action) {
                const { date, mealIndex, imageSource } = action.payload;
                const dailyHealth = state.history[date];
                if (dailyHealth != undefined) {
                    dailyHealth.diet.splice(mealIndex, 0, imageSource);
                }
                // const dailyHealth = state.history.find(day => day.date === date);
                // if (dailyHealth != undefined) {
                //     dailyHealth.diet.splice(mealIndex, 0, imageSource);
                // }
                console.log(state.history[date]);
            },
            prepare(date, mealIndex, imageSource) {
                return {
                    payload: {
                        date,
                        mealIndex,
                        imageSource
                    }
                }
            }
        },
        addExercise: {
            reducer(state, action) {
                const { date, exerciseObj } = action.payload;
                const dailyHealth = state.history[date];
                // const dailyHealth = state.history.find(day => day.date === date);
                if (dailyHealth != undefined) {
                    dailyHealth.exercises.push(exerciseObj);
                }
            },
            prepare(date, exerciseObj) {
                return {
                    payload: {
                        date,
                        exerciseObj
                    }
                }
            }
        },
        addSleep: {
            reducer(state, action) {
                const { date, sleepObj } = action.payload;
                const dailyHealth = state.history[date];
                // const dailyHealth = state.history.find(day => day.date === date);
                if (dailyHealth != undefined) {
                    dailyHealth.sleep = sleepObj;
                }
            },
            prepare(date, sleepObj) {
                return {
                    payload: {
                        date,
                        sleepObj
                    }
                }
            }
        },

        // addSleep: {
        //     reducer(state, action) {
        //         const { date, sleepObj } = action.payload;
        //         const dailyHealth = state.history[date];
        //         // const dailyHealth = state.history.find(day => day.date === date);
        //         if (dailyHealth != undefined) {
        //             dailyHealth.sleep.push(sleepObj);
        //         }
        //     },
        //     prepare(date, sleepObj) {
        //         return {
        //             payload: {
        //                 date,
        //                 sleepObj
        //             }
        //         }
        //     },
        // }
    },
});
  
export const { verifyDateExists, addExercise, addPicture, addSleep } = dateSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPicture = (state) => state.diet.dietPictures

export default dateSlice.reducer
  