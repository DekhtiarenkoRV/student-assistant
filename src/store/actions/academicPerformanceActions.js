import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    ADD_ATTENDANCE,
    REMOVE_ATTENDANCE,
    ADD_LATENESS,
    LOAD_ATTENDANCE,
    INCREASE_PROGRESS,
    DECREASE_PROGRESS,
    INCREASE_LATENESS_PROGRESS,
    DECREASE_LATENESS_PROGRESS,
    CHANGE_AMOUNT_ABSENSES,
    CHANGE_AMOUNT_LATENESS
}from '../types'
import {createStorage} from '../asyncMethods/methods'
export const loadAttendance = () => {
    createStorage()
    return async dispach => {
        dispach({
            type: LOAD_ATTENDANCE,
            payload: JSON.parse(await AsyncStorage.getItem('attendanceData'))
        })
    }
}
export const addAbsencesToState = (date, reason) =>{
    return{
        type: ADD_ATTENDANCE,
        payload:{
            date,
            reason,
        }
    }
}
export const addLatenessToState = (date, reason) =>{
    return{
        type: ADD_LATENESS,
        payload:{
            date,
            reason,
        }
    }
}
export const removeAbsencesFromState = (id) =>{
    return{
        type: REMOVE_ATTENDANCE,
        payload:{
            id
        }
    }
}

// export const addLatenessToState = (date, reason) =>{
//     return{
//         type: ADD_LATENESS,
//         payload:{
//             date,
//             reason
//         }
//     }
// }
// export const removeLatenessFromState = (id) =>{
//     return{
//         type: REMOVE_LATENESS,
//         payload:{
//             id
//         }
//     }
// }
export const changeAmountAbsenses = (amount) => {
    console.log('action')
    return {
        type: CHANGE_AMOUNT_ABSENSES,
        payload: amount
    }
}
export const changeAmountLateness = (amount) => {
    return {
        type: CHANGE_AMOUNT_LATENESS,
        payload: amount
    }
} 
export const increaseProgressBarValue = (progressValue) =>{
    return{
        type: INCREASE_PROGRESS,
        payload: progressValue
    }
}
export const decreaseProgressBarValue = (progressValue) =>{
    return{
        type: DECREASE_PROGRESS,
        payload: progressValue
    }
}
export const increaseLatenessBarValue = (progressValue) =>{
    return{
        type: INCREASE_LATENESS_PROGRESS,
        payload: progressValue
    }
}
export const decreaseLatenessBarValue = (progressValue) =>{
    return{
        type: DECREASE_LATENESS_PROGRESS,
        payload: progressValue
    }
}