const initialState = {
    selectedGradeSystem: 0,
    selectedLanguage: 0,
    amountTruances: 0,
    amountLateness: 0
}
export const systemGradesReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'CHANGE_GRADE_SYSTEM': {
            return {
                ...state,
                selectedGradeSystem: action.payload
            }
        }
        case 'CHANGE_LANGUAGE': {
            return {
                ...state,
                selectedLanguage: action.payload
            }
        }
        case 'CHANGE_AMOUNT_TRUANCES':{
            return {
                ...state,
                amountTruances: action.payload
            }
        }
        case 'CHANGE_AMOUNT_LATENESS':{
            return {
                ...state,
                amountLateness: action.payload
            }
        }
        default: {
            return state
        }
    }
}