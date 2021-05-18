export const change_grade_system = (selectedSystem) =>{
    return {
        type: 'CHANGE_GRADE_SYSTEM',
        payload: selectedSystem
    }
}
export const change_language = (selectedLanguage) =>{
    return {
        type: 'CHANGE_LANGUAGE',
        payload: selectedLanguage
    }
}
export const change_amount_truances = (amount) =>{
    return {
        type: 'CHANGE_AMOUNT_TRUANCES',
        payload: amount
    }
}
export const change_amount_lateness = (amount) =>{
    return {
        type: 'CHANGE_AMOUNT_LATENESS',
        payload: amount
    }
}