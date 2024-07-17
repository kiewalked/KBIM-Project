import { createSlice } from '@reduxjs/toolkit'

export const goalSlice = createSlice({
    name: 'goals',
    // State of goals will be a list of objects
    // goal object needs to contain:
    /*
    goal: {
        frequency: daily | weekly | monthly
        freqDays: frequency == daily ? [bool] : null
        freqCount: frequency != daily ? Number : null
        quantity: 60
        description: String
        category: exercise: {
                    intensity: light | moderate | vigorous
                    measurement: minutes | hours
                }
                | sleep: {
                    measurement: minutes | hours
                }
                | diet: {
                    measurement: meals | water | standard beverages (alcohol)
                }
                | smoking: {
                    measurement: cigarettes | puffs
                }

    }
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
        ],y
        diet: [

        ],
        miscellaneous: [
            description: 
        ]
    }
    */
    initialState: {
        goals: [
    
        ],
    },
    reducers: {
        addGoal: {
            reducer(state, action) {
                state.goals.push(action.payload)
                console.log(action.payload)
            },
            prepare(frequency, freqDays, freqCount, quantity, category, categoryObj, description) {
                let exerciseObj = {}
                if (frequency === 'daily') {
                    return {
                        payload: {
                            frequency: frequency,
                            freqDays: freqDays,
                            quantity: quantity,
                            description: description,
                            category: category,
                            categoryObj: categoryObj
                        }
                    }
                } else {
                    return {
                        payload: {
                            frequency: frequency,
                            freqCount: freqCount,
                            quantity: quantity,
                            description: description,
                            category: category,
                            categoryObj: categoryObj
                        }
                    }
                }
            }
        },
        // addExerciseGoal: {
        //     reducer(state, action) {
        //         state.goals.push(action.payload)
        //         console.log(action.payload)
        //     },
        //     prepare(frequency, freqDays, freqCount, exerciseType, goalTime, description) {
        //         let exerciseObj = {}
        //         if (frequency === 'daily') {
        //             return {
        //                 payload: {
        //                     frequency: frequency,
        //                     freqDays: freqDays,
        //                     quantity: goalTime,
        //                     description: description,
        //                     category: "exercise",
        //                     categoryObj: {
        //                         intensity: exerciseType,
        //                         measurement: "minutes"
        //                     }
        //                 }
        //             }
        //         } else {
        //             return {
        //                 payload: {
        //                     frequency: frequency,
        //                     freqCount: freqCount,
        //                     quantity: goalTime,
        //                     description: description,
        //                     category: "exercise",
        //                     categoryObj: {
        //                         intensity: exerciseType,
        //                         measurement: "minutes"
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // },
        // addSleepGoal: {
        //     reducer(state, action) {
        //         state.goals.push(action.payload)
        //     },
        //     prepare(frequency, freqCount, goalTime, description) {
        //         if (frequency === 'daily') {
        //             return {
        //                 payload: {
        //                     frequency: frequency,
        //                     freqCount: freqCount,
        //                     quantity: goalTime,
        //                     description: description,
        //                     category: "sleep",
        //                     categoryObj: {
        //                         measurement: "hours"
        //                     }
        //                 }
        //             }
        //         } else {
        //             return {
        //                 payload: {
        //                     frequency: frequency,
        //                     freqCount: freqCount,
        //                     quantity: goalTime,
        //                     description: description,
        //                     category: "sleep",
        //                     categoryObj: {
        //                         measurement: "hours"
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // },
        // addDietGoal: {
        //     reducer(state, action) {
        //         state.goals.push(action.payload)
        //     },
        //     prepare(frequency, freqCount, goalMeals, description) {
        //         if (frequency === 'daily') {
        //             return {
        //                 payload: {
        //                     frequency: frequency,
        //                     freqCount: freqCount,
        //                     quantity: goalTime,
        //                     description: description,
        //                     category: "diet",
        //                     categoryObj: {
        //                         measurement: "meals"
        //                     }
        //                 }
        //             }
        //         } else {
        //             return {
        //                 payload: {
        //                     frequency: frequency,
        //                     freqCount: freqCount,
        //                     quantity: goalTime,
        //                     description: description,
        //                     category: "diet",
        //                     categoryObj: {
        //                         measurement: "meals"
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // },
        addMiscGoal: {
            reducer(state, action) {
                state.goals.push(action.payload)
            },
            prepare(description) {
                return {
                    payload: {
                        description,
                        category: "misc"
                    }
                }
            }
        },
    }
});
  
export const { addGoal, /*addExerciseGoal, addSleepGoal, addDietGoal,*/ addMiscGoal } = goalSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.goal.value)`
export const selectGoal = (state) => state.goal.goals

export default goalSlice.reducer
  