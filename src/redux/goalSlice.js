import { createSlice } from '@reduxjs/toolkit'

export const goalSlice = createSlice({
    name: 'goals',
    // State of goals will be a list of objects
    // goal object needs to contain:
    /*
    goal: {
        exercise: [
            frequency: daily | weekly | monthly
            freqDays: [bool]
            freqCount: frequency === daily ? [bool] : Number
            exerciseType: light | moderate | vigorous
            goalTime: Number
            description: String
        ],
        sleep: [
            frequency: daily | weekly | monthly
            freqCount: frequency === daily ? [bool] : Number
            exerciseType: light | moderate | vigorous
            goalTime: Number
            description: String
        ],
        diet: [

        ],
        miscellaneous: [
            description: 
        ]
    }
    */
    initialState: {
      goals: {
        exercise: [],
        sleep: [],
        diet: [],
        misc: []
      },
    },
    reducers: {
        addExerciseGoal: {
            reducer(state, action) {
                state.goals.exercise.push(action.payload)
                console.log(action.payload)
            },
            prepare(frequency, freqDays, freqCount, exerciseType, goalTime, description) {
                let exerciseObj = {}
                if (frequency === 'daily') {
                    exerciseObj = {
                        frequency: frequency,
                        freqDays: freqDays,
                        exerciseType: exerciseType,
                        goalTime: goalTime,
                        description: description
                    }
                } else {
                    exerciseObj = {
                        frequency: frequency,
                        freqCount: freqCount,
                        exerciseType: exerciseType,
                        goalTime: goalTime,
                        description: description
                    }
                    }
                    return {
                        payload: {
                            exerciseObj
                        }
                    }
            }
        },
        addSleepGoal: {
            reducer(state, action) {
                state.goals.sleep.push(action.payload)
            },
            prepare(frequency, freqCount, goalTime, description) {
            if (frequency === 'daily') {
                const sleepObj = {
                    frequency: frequency,
                    freqDays: freqDays,
                    goalTime: goalTime,
                    description: description
                }
            } else {
                const sleepObj = {
                    frequency: frequency,
                    freqCount: freqCount,
                    goalTime: goalTime,
                    description: description
                }
            }
                return {
                    payload: {
                        sleepObj
                    }
                }
            }
        },
        addDietGoal: {
            reducer(state, action) {
                state.goals.diet.push(action.payload)
            },
            prepare(frequency, freqCount, goalMeals, description) {
                if (frequency === 'daily') {
                    const dietObj = {
                        frequency: frequency,
                        freqDays: freqDays,
                        goalTime: goalTime,
                        description: description
                    }
                } else {
                    const dietObj = {
                        frequency: frequency,
                        freqCount: freqCount,
                        goalTime: goalTime,
                        description: description
                    }
                }
                    return {
                    payload: {
                        dietObj
                    }
                }
            }
        },
        addMiscGoal: {
            reducer(state, action) {
                state.goals.misc.push(action.payload)
            },
            prepare(description) {
                return {
                    payload: {
                        description
                    }
                }
            }
        },

    }
});
  
export const { addExerciseGoal, addSleepGoal, addDietGoal, addMiscGoal } = goalSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.goal.value)`
export const selectGoal = (state) => state.goal.goals

export default goalSlice.reducer
  