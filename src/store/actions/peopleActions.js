import {LOAD_PEOPLE, ADD_PERSON, REMOVE_PERSON} from '../types'
import {createStorage} from '../asyncMethods/methods'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const loadPeople = () =>{ 
    createStorage()
    return async dispach => {
        dispach({
            type: LOAD_PEOPLE,
            payload: JSON.parse(await AsyncStorage.getItem('peopleData'))
        })
    }

}
export const addPerson = (name, subject, birthday, phone, type, email) => {
    return {
        type: ADD_PERSON,
        payload: {
            name,
            subject,
            birthday,
            phone,
            email,
            type
        }
    }
}
export const removePerson = (id, type) => {
    return {
        type: REMOVE_PERSON,
        payload: {
            id,
            type
        }
    }
}