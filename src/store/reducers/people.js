import {LOAD_PEOPLE, ADD_PERSON, REMOVE_PERSON} from '../types'
const initialState = {
    classRoomTeacher: {
        fullName: '',
        subject: '',
        birthday: '',
        phone: '',
        email: ''
    },
    students:[],
    teachers:[],
    other:[],
    numberOfClassMember: 1
}
import {rewriteAsyncPeopleData} from "../../store/asyncMethods/methods"
export const peopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PEOPLE:
            return {
                ...action.payload,
            }
        case ADD_PERSON:{
            const newItem = {
                id: new Date().getTime(),
                name: action.payload.name,
                subject: action.payload.subject,
                birthday: action.payload.birthday,
                phone: action.payload.phone,
                email: action.payload.email,
                type: action.payload.type
            }
            if(action.payload.type == 'teacher'){
                const newData = {
                    ...state,
                    teachers:[...state.teachers, newItem],
                }
                rewriteAsyncPeopleData(newData)
                return {
                    ...newData
                }
                
            }
            else if (action.payload.type == 'classmate'){
                const newData = {
                    ...state,
                    students:[...state.students, newItem],
                }
                rewriteAsyncPeopleData(newData)
                return {
                    ...newData
                }
                
            }
            else if (action.payload.type == 'other'){
                const newData = {
                    ...state,
                    other:[...state.other, newItem],
                }
                rewriteAsyncPeopleData(newData)
                return {
                    ...newData
                }
                
            }
            else if (action.payload.type == 'classRoomTeacher'){
                const newData = {
                    ...state,
                    classRoomTeacher:{
                        fullName: action.payload.name,
                        subject: action.payload.subject,
                        birthday: action.payload.birthday,
                        phone: action.payload.phone
                    },
                }
                rewriteAsyncPeopleData(newData)
                return {
                    ...newData
                }
            }
        }
        case REMOVE_PERSON:{
            if(action.payload.type == 'teacher'){
                rewriteAsyncPeopleData({    
                    ...state,
                    teachers: state.teachers.filter(item => item.id != action.payload.id),
                })
                return {
                    ...state,
                    teachers: state.teachers.filter(item => item.id != action.payload.id)
                }
            }
            if(action.payload.type == 'classmate'){
                rewriteAsyncPeopleData({
                    ...state,
                    students: state.students.filter(item => item.id != action.payload.id),
                })
                return {
                    ...state,
                    students: state.students.filter(item => item.id != action.payload.id)
                }
            }
            if(action.payload.type == 'other'){
                rewriteAsyncPeopleData({
                    ...state,
                    other: state.other.filter(item => item.id != action.payload.id),
                })
                return {
                    ...state,
                    other: state.other.filter(item => item.id != action.payload.id)
                }
            }
        }
        default:
            return {...state}
    }
}