import AsyncStorage from '@react-native-async-storage/async-storage'
export const rewriteAsyncSubject = async (data) => {
    await AsyncStorage.setItem('weekValue', JSON.stringify(data))
}
export const rewriteAsyncAttendance = async (data) => {
    await AsyncStorage.setItem('attendanceData', JSON.stringify(data))
}
export const rewriteAsyncPeopleData = async (data) => {
    await AsyncStorage.setItem('peopleData', JSON.stringify(data))
}
export const createStorage = async () => {
    const week = [{
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
    const attendance = {
        progress: 0,
        amountAbsences: 0,
        Absences: []
    }
    const people = {
        classRoomTeacher: {
            fullName: '',
            subject: '',
            birthday: '',
            phone: ''
        },
        students:[],
        teachers:[],
        other:[],
        numberOfClassMember: 1
    }
    if(await AsyncStorage.getItem('weekValue') == null){
        await AsyncStorage.setItem('weekValue', JSON.stringify(week))
    }
    if(await AsyncStorage.getItem('attendanceData') == null){
        await AsyncStorage.setItem('attendanceData', JSON.stringify(attendance))
    }
    if(await AsyncStorage.getItem('peopleData') == null){
        await AsyncStorage.setItem('peopleData', JSON.stringify(people))
    }
}