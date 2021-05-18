const initialState = {
    grades:{}
}
export const gradesReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_GRADE":
            const newGrade = {
                id: Date.now(),
                date: action.payload.date,
                description: action.payload.description,
                subject: action.payload.subject,
                isFinalGrade: action.payload.isFinalGrade,
                grade: {
                    color: action.payload.grade.color,
                    value: action.payload.grade.value,
                },
                randomIdForSubject: action.payload.randomIdForSubject
            }
            let newData = {}
            if(state.grades[action.payload.date] === undefined){
                newData = {
                    grades: {
                        ...state.grades,
                        [action.payload.date]:[
                           
                            {
                                ...newGrade
                            }
                        ]
                    }
                }
            }
            else{
                newData = {
                    grades: {
                        ...state.grades,
                        [action.payload.date]:[
                            ...state.grades[action.payload.date],
                            {
                                ...newGrade
                            }
                        ]
                    }
                }
            }
            return {
                ...newData
            }
        case "REMOVE_GRADE":
            return {
                ...state,
                grades:{
                    ...state.grades,
                    [action.payload.date]: [...state.grades[action.payload.date].filter(item => item.id !== action.payload.id)]
                }
            }
        case "EDIT_GRADE":
            console.log('edit grade')
            break
        default:
            return state
    }
}