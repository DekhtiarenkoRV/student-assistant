import {LOAD_HOME_WORKS, ADD_HOME_WORKS, REMOVE_HOME_WORKS, DO_COMPLETED_HOME_WORK} from '../../store/types'

export const addHomeWork = (title, description, term, subject, complexity) => {
    return {
        type: ADD_HOME_WORKS,
        payload: {
            title,
            description,
            term,
            subject,
            complexity
        }
    }
}
export const removeHomeWork = id => {
    return {
        type: REMOVE_HOME_WORKS,
        payload: id
    }
}
export const doCompletedHomeWork = (id, isCompletedHomeWork) =>{
    return{
        type: DO_COMPLETED_HOME_WORK,
        payload: {
            id,
            isCompletedHomeWork
        }
    }
}