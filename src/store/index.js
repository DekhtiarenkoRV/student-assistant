import { createStore, combineReducers, applyMiddleware } from 'redux'
import { dayReducer } from './reducers/shedule'
import {AcademicPerformanceReducer} from './reducers/academicPerformance'
import {peopleReducer} from './reducers/people'
import {homeWorksReducer} from './reducers/homeWork'
import {gradesReducer} from './reducers/grades'
import {subjectsReducer} from './reducers/subjects'
import {systemGradesReducer} from './reducers/settings'
import thunk from 'redux-thunk'
const rootReducer =  combineReducers({
    shedule: dayReducer,
    Attendances: AcademicPerformanceReducer,
    people: peopleReducer,
    homeWork: homeWorksReducer,
    grade: gradesReducer,
    subjects: subjectsReducer,
    gradeSystem: systemGradesReducer

})
export default createStore(rootReducer, applyMiddleware(thunk));
