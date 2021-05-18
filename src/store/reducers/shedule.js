import {
    ADD_SUBJECT,
    LOAD_DAYS,
    REMOVE_SUBJECT,
    UPDATE_SUBJECT
} from "../types"
const initialState = {
    week: [{
            title: 'Понеділок',
            titleUa: 'Понеділок',
            titleEng: 'Monday',
            dayIndex: 1,
            subjects: [],
        },
        {
            titleUa: 'Вівторок',
            titleEng: 'Tuesday',
            title: 'Вівторок',
            dayIndex: 2,
            subjects: []
        },
        {
            title: 'Середа',
            titleUa: 'Середа',
            titleEng: 'Wednesday',
            dayIndex: 3,
            subjects: []
        },
        {
            title: 'Четвер',
            titleUa: 'Четвер',
            titleEng: 'Thursday',
            dayIndex: 4,
            subjects: []
        },
        {
            title: 'Пятниця',
            titleUa: 'Пятниця',
            titleEng: 'Friday',
            dayIndex: 5,
            subjects: []
        },
        {
            title: 'Субота',
            titleUa: 'Субота',
            titleEng: 'Saturday',
            dayIndex: 6,
            subjects: []
        },
        {
            title: 'Неділя',
            titleUa: 'Неділя',
            titleEng: 'Sunday',
            dayIndex: 7,
            subjects: []
        },
    ]
}
import {rewriteAsyncSubject} from '../asyncMethods/methods'
export const dayReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_DAYS:
            return {
                ...state, week: [
                    ...action.payload
                ]
            }
            case ADD_SUBJECT:
                const dataWeek = state.week;
                dataWeek[action.payload.dayIndex - 1].subjects = [
                    ...state.week[action.payload.dayIndex - 1].subjects,
                    action.payload.subject
                ]
                rewriteAsyncSubject([...dataWeek])
                return {
                    ...state,
                    week: [...dataWeek]
                }
            case REMOVE_SUBJECT:
                const newSubjectDay = state.week[action.payload.dayIndex - 1].subjects.filter(item => item.id != action.payload.id)
                const newDataWeek = state.week
                newDataWeek[action.payload.dayIndex - 1].subjects = [...newSubjectDay]
                rewriteAsyncSubject([...newDataWeek])
                return {
                    ...state,
                    week: [...newDataWeek]
                }
            case UPDATE_SUBJECT:
                const updateSubject = state.week[action.payload.dayIndex - 1].subjects.find(item => item.id == action.payload.id)
                updateSubject.name = action.payload.name
                updateSubject.room = action.payload.room
                updateSubject.teacher = action.payload.teacher
                updateSubject.start = action.payload.startLessonTime
                updateSubject.end = action.payload.endLessonTime
                const updateDataWeek = state.week
                updateDataWeek[action.payload.dayIndex - 1].subjects.map(item => {
                    if (item.id == action.payload.id) {
                        return updateSubject
                    }
                })
                rewriteAsyncSubject([...updateDataWeek])
                return {
                    ...state,
                    week: [...updateDataWeek]
                }
                default:
                    return state
    }
}