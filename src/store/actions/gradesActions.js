import {ADD_GRADE, REMOVE_GRADE, EDIT_GRADE} from "../types" 
export const addGrade = (date, description, subject, isFinalGrade, color, value, randomIdForSubject) => {
    return {
        type: ADD_GRADE,
        payload: {
            date,
            description,
            subject,
            isFinalGrade,
            grade: {
                color,
                value 
            },
            randomIdForSubject
        }
    }
}
export const removeGrade = (date,id) => {
    return {
        type: REMOVE_GRADE,
        payload: {
            date,
            id
        }
    }
}
export const editGrade = () =>{
    return {
        type: EDIT_GRADE
    }
}