import {
    ADD_SUBJECT,
    LOAD_DAYS,
    REMOVE_SUBJECT,
    UPDATE_SUBJECT
} from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {createStorage} from '../asyncMethods/methods'

export const loadDays = () => {
    createStorage()
    return async dispach => {
        dispach({
            type: LOAD_DAYS,
            payload: JSON.parse(await AsyncStorage.getItem('weekValue'))
        })
    }
}
export const addSubject = (dayIndex, titleSubject, teacher, subjectRoom, startLessonTime, endLessonTime) => {
    return {
        type: ADD_SUBJECT,
        payload: {
            dayIndex,
            subject: {
                id: Date.now().toString(),
                name: titleSubject,
                room: subjectRoom,
                teacher: teacher,
                start: startLessonTime,
                end: endLessonTime
            }
        }
    }
}
export const removeSubject = (dayIndex,id) => {
    return{
        type: REMOVE_SUBJECT,
        payload: {
            dayIndex,
            id
        }
    }
}
export const updateSubject = (dayIndex, id, name, room, teacher, startLessonTime, endLessonTime ) => {
    return{
        type: UPDATE_SUBJECT,
        payload: {
            dayIndex,
            id,
            name,
            room,
            teacher,
            startLessonTime,
            endLessonTime
        }
    }
}