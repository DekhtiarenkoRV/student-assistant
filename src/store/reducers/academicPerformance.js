import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    ADD_ATTENDANCE,
    ADD_LATENESS,
    REMOVE_ATTENDANCE,
    LOAD_ATTENDANCE,
    INCREASE_PROGRESS,
    DECREASE_PROGRESS,
    INCREASE_LATENESS_PROGRESS,
    DECREASE_LATENESS_PROGRESS,
    CHANGE_AMOUNT_ABSENSES,
    CHANGE_AMOUNT_LATENESS
} from '../types'
const initialState = {
    progress: 0,
    latenessProgress: 0,
    amountAbsences: 0,
    amountLateness: 0,
    Absences: [],
}
import {rewriteAsyncAttendance} from "../asyncMethods/methods"
export const AcademicPerformanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ATTENDANCE:
            return {
                ...action.payload,
            }
        case ADD_ATTENDANCE:{
            const newItem = {
                id: new Date().getTime().toString(),
                title: 'Прогул',
                time: action.payload.date,
                reason: action.payload.reason,
                color: '#bb2205'
            }
            const newData = {
                ...state,
                Absences:[...state.Absences, newItem],
            }
            rewriteAsyncAttendance(newData)
            return {
               ...newData
            }
        }
        case ADD_LATENESS:{
            const newItem = {
                id: new Date().getTime().toString(),
                title: 'Запізнення',
                time: action.payload.date,
                reason: action.payload.reason,
                color: '#edc988'
            }
            const newData = {
                ...state,
                Absences:[...state.Absences, newItem],
            }
            rewriteAsyncAttendance(newData)
            return {
               ...newData
            }
        }
            
        case REMOVE_ATTENDANCE:{
            const newDataAbcences = state.Absences.filter(item => item.id != action.payload.id)
            const newAttendanceData = {
                ...state,
                Absences:[...newDataAbcences],
            }
            rewriteAsyncAttendance(newAttendanceData)
            
            return {
                ...newAttendanceData,
            }
        }
        case INCREASE_PROGRESS:{
            const newDataProgress = action.payload
            const newData = {
                ...state,
                progress: newDataProgress,
            }
            rewriteAsyncAttendance(newData)
            return {
               ...newData,
            }
        }
        case DECREASE_PROGRESS:{
            const newData = {
                ...state,
                progress: action.payload,
            }
            rewriteAsyncAttendance(newData)
            return {
               ...newData,
           
            }
        }
        case INCREASE_LATENESS_PROGRESS:{
            const newDataProgress = action.payload
            const newData = {
                ...state,
                latenessProgress: newDataProgress,
            }
            rewriteAsyncAttendance(newData)
            return {
               ...newData
            }
        }
        case DECREASE_LATENESS_PROGRESS:{
            const newData = {
                ...state,
                latenessProgress: action.payload,
            }
            rewriteAsyncAttendance(newData)
            return {
               ...newData
            }
        }
        case CHANGE_AMOUNT_ABSENSES:{
            const newData = {
                ...state, 
                amountAbsences: action.payload
            }
            rewriteAsyncAttendance(newData)
            return {
                ...newData
            }
        }
        case CHANGE_AMOUNT_LATENESS:{
            const newData = {
                ...state, 
                amountLateness: action.payload
            }
            rewriteAsyncAttendance(newData)
            return {
                ...newData
            }
        }
        default:
            return state
    }
}