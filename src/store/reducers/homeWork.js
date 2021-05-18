import {ADD_HOME_WORKS, REMOVE_HOME_WORKS, DO_COMPLETED_HOME_WORK} from '../../store/types'
const initialState = {
    homeWorks :[]
}
export const homeWorksReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_HOME_WORKS:{
            const newHomeWork = {
                id: new Date().getTime(),
                title: action.payload.title,
                description: action.payload.description,
                term: action.payload.term,
                subject: action.payload.subject,
                complexity: action.payload.complexity,
                isCompleted: false
            }
            const newData = {
                ...state,
                homeWorks:[...state.homeWorks, newHomeWork],
            }
            return {
                ...newData
            }
        }
        case REMOVE_HOME_WORKS:{
            return {
                ...state,
                homeWorks: state.homeWorks.filter(item => item.id !== action.payload),
            }
            
        }
        case DO_COMPLETED_HOME_WORK:{
            return {
                ...state,
                homeWorks: state.homeWorks.map(item => item.id === action.payload.id ? 
                    {...item, isCompleted: action.payload.isCompletedHomeWork}:item
                )
            }
        }
        default:{
            return {...state}
        }
    }
}