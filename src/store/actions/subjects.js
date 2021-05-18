import {ADD_STUDY_SUBJECT, REMOVE_STUDY_SUBJECT, EDIT_STUDY_SUBJECT, ADD_GRADE_TO_SUBJECT, REMOVE_GRADE_FROM_SUBJECT} from '../types'

export const add_study_subject = (subjectName, subjectTeacher, subjectType, subjectAbrevation) =>{
    return {
        type: ADD_STUDY_SUBJECT,
        payload: {
            subjectName,
            subjectTeacher,
            subjectType, 
            subjectAbrevation
        }
    }
}
export const remove_study_subject = (id) =>{
    return {
        type: REMOVE_STUDY_SUBJECT,
        payload: id
    }
}
export const edit_study_subject = () =>{
    return {
        type: EDIT_STUDY_SUBJECT
    }
}
export const add_grade_to_subject = (grade, date, subject, randomIdForSubject) => {
    return {
        type: ADD_GRADE_TO_SUBJECT,
        payload: {
            grade,
            date,
            subject,
            randomIdForSubject
        }
    }
}
export const remove_grade_from_subject = (subject, randomIdForSubject) => {
    return {
        type: REMOVE_GRADE_FROM_SUBJECT,
        payload: {
            subject, 
            randomIdForSubject,
        }
    }
}