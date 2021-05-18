import React, { useState } from 'react'
import { Text, View } from 'native-base'
import { StyleSheet, Image, Dimensions } from 'react-native'
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import { Appbar } from 'react-native-paper';
import { connect, useSelector } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { languages } from '../../languages'
import "moment/locale/uk";
export const LessonTimeScreen = ({ navigation }) => {

    const interfaceLanguage = useSelector(state => state.gradeSystem)
    const selecteLanguage = interfaceLanguage.selectedLanguage
    const language = languages[selecteLanguage].translation

    const data = useSelector(state => state)
    const [endStudyTime, setEndStudyTime] = useState(moment.now())
    const [date, setDate] = useState(moment.now());
    const [show, setShow] = useState(false);
    const [showRefreshButton, setShowRefreshButton] = useState(false)
    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        setEndStudyTime(moment(selectedDate))
        setShowRefreshButton(true)
    };
    console.log(moment(endStudyTime).diff(moment(), 'seconds'))
    let store = data
    let starts = []
    let ends = []
    let result = []
    const [state, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    function arrayConcat(a, b) {
        let result = [];
        let len = a.length >= b.length ? a.length : b.length;
        for (let i = 0; i < len; i++) {
            if (a[i])
                result.push(a[i]);
            if (b[i])
                result.push(b[i]);
        }
        return result;
    }

    const DetectCurrentTimeRange = () => {
        starts = store.shedule.week[new Date().getDay() - 1].subjects.map(item => item.start)
        ends = store.shedule.week[new Date().getDay() - 1].subjects.map(item => item.end)
        let nextTime = 0
        result = arrayConcat(starts, ends).map(function (s) {
            return moment(s, "hh:mm:ss");
        })
            .sort(function (m) {
                return m.valueOf();
            })
            .find(function (m) { return m.isAfter(); });
        if (result) {
            nextTime = result.format("HH:mm:ss")
        }
        return nextTime
    }
    const isLesson = (str) => {
        const obj = store.shedule.week[new Date().getDay() - 1]
            .subjects.find(item => moment(str, 'HH:mm:ss').isBetween(moment(item.start, 'HH:mm:ss'), moment(item.end, 'HH:mm:ss')))
        if (obj != undefined) {
            return {
                subjectName: obj.name,
                timeStart: obj.start,
                timeEnd: obj.end,
                nameTeacher: obj.teacher,
                chamber: obj.room,
                nowIsLesson: true
            }
        } else {
            return {
                subjectName: ' ',
                nowIsLesson: false
            }
        }
    }
    const findDifference = (start, end) => {
        const startTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), start.split(':')[0], start.split(':')[1], start.split(':')[2])
        const endTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), end.split(':')[0], end.split(':')[1], end.split(':')[2])
        const ms = endTime.getTime() - startTime.getTime()
        const diff = Math.floor(ms / 1000)
        return (diff)
    }
    function HeaderIsLessonRender(props) {
        const isLessonNow = props.isLessonNow
        const lessonName = props.currentLesson
        if (isLessonNow) {
            return <Text style={styles.lessonTimeTitle}>{language.nowLesson}: <Text style={styles.bold}>{lessonName}</Text></Text>
        }
        else {
            return <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 24 }}>{language.toLesson}</Text>
        }
    }
    return (
        <View style={{ backgroundColor: 'white', height: Dimensions.get('window').height }}>
            <Appbar.Header style={{ backgroundColor: 'white', elevation: 0 }}>
                <Appbar.Action icon='menu' onPress={() => {
                    navigation.toggleDrawer
                    navigation.openDrawer()
                }} />
                <Appbar.Content title={language.timerTitle} subtitle={language.timerSubtitle} />
            </Appbar.Header>
            <View style={styles.countDownWrapper}>

                {
                    DetectCurrentTimeRange() == 0 ?
                        <View style={{ alignItems: 'center', marginTop: 50, flexDirection: 'row' }}>
                            <Image style={{ width: 60, height: 60 }} source={require('../../assets/finish.png')} />
                            <Text style={{ fontSize: 24, marginBottom: 20 }}>{language.lessonsEnd}</Text>
                            <Image style={{ width: 60, height: 60 }} source={require('../../assets/finish.png')} />
                        </View>
                        :
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <HeaderIsLessonRender
                                currentLesson={isLesson(moment().format('HH:mm:ss')).subjectName}
                                isLessonNow={isLesson(moment().format('HH:mm:ss')).nowIsLesson} />
                            <CountDown
                                style={styles.countDown}
                                digitStyle={{ backgroundColor: '#222831' }}
                                digitTxtStyle={{ color: 'white' }}
                                timeLabelStyle={{ color: '#222831' }}
                                until={findDifference(new Date().toLocaleTimeString(), DetectCurrentTimeRange())}
                                timeLabels={{ h: language.Hours, m: language.Minutes, s: language.Seconds }}
                                timeToShow={['H', 'M', 'S']}
                                size={30}
                                onFinish={() => {
                                    <HeaderIsLessonRender currentLesson={isLesson(moment().format('HH:mm:ss')).subjectName} isLessonNow={isLesson(moment().format('HH:mm:ss')).nowIsLesson} />
                                    findDifference(new Date().toLocaleTimeString(), DetectCurrentTimeRange())
                                }}
                            />
                            <View style={styles.lessonInfo}>

                                {
                                    isLesson(moment().format('HH:mm:ss')).nowIsLesson === true ?
                                        <View style={styles.currentLessonInfo}>
                                            <Text style={styles.lessonTimeTitle}>{language.startTime}:  <Text style={styles.bold}>{isLesson(moment().format('HH:mm:ss')).timeStart}</Text></Text>
                                            <Text style={styles.lessonTimeTitle}>{language.endTime}: <Text style={styles.bold}> {isLesson(moment().format('HH:mm:ss')).timeEnd}</Text></Text>
                                            <Text style={styles.lessonTimeTitle}>{language.teacher}: <Text style={styles.bold}> {isLesson(moment().format('HH:mm:ss')).nameTeacher}</Text></Text>
                                            <Text style={styles.lessonTimeTitle}>{language.room}: <Text style={styles.bold}> {isLesson(moment().format('HH:mm:ss')).chamber}</Text></Text>
                                        </View>
                                        :
                                        <View></View>
                                }

                            </View>
                        </View>

                }
                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: 'gray', marginTop: 20 }}></View>
                <Text style={{ fontSize: 18, color: 'black', marginLeft: 20, marginTop: 20 }}>{language.endOfStudyYear}: <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>
                    {moment(endStudyTime).locale('uk').format("DD MMM YYYY")}
                </Text>
                </Text>
                <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around' }}>
                    <CountDown
                        style={styles.countDown}
                        digitStyle={{ backgroundColor: '#555555' }}
                        digitTxtStyle={{ color: 'white' }}
                        timeLabelStyle={{ color: '#222831' }}
                        until={moment(endStudyTime).diff(moment(), 'seconds')}
                        timeLabels={{ d: language.Days, h: language.Hours, m: language.Minutes, s: language.Seconds }}
                        timeToShow={['D', 'H', 'M', 'S']}
                        size={30}
                    />
                    {
                        showRefreshButton && (
                            <TouchableOpacity onPress={() => {
                                forceUpdate()
                                setShowRefreshButton(false)
                            }}>
                                <Image style={{ width: 30, height: 30, marginLeft: 20, marginTop: 70 }} source={require('../../assets/refreshPage.gif')} />
                            </TouchableOpacity>
                        )
                    }

                </View>
                <TouchableOpacity style={{
                    width: 200,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: 30
                }} onPress={() => setShow(true)}>
                    <Image style={{ width: 30, height: 30, marginRight: 10 }} source={require('../../assets/change.png')} />
                    <Text style={{ fontSize: 18, color: '#393e46', textAlign: 'center' }}>{language.changeDate}</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
        </View>
    )
}
// const mapStateToProps = (state) => {
//     return { dataWeek: state };
// }
// export default connect(mapStateToProps)(LessonTimeScreen)
const styles = StyleSheet.create({
    timeLessonWrapper: {
        alignItems: 'center',
        paddingTop: '40%',
    },
    countDownWrapper: {
        alignItems: 'center',
        backgroundColor: 'white'
    },
    countDown: {
        marginTop: 10,
        width: '80%',
        color: 'white',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop: 20,
    },
    lessonTimeTitle: {
        fontSize: 20,
        marginTop: 20,
        color: '#222831',
    },
    bold: {
        color: '#222831',
        fontSize: 20,
        fontWeight: 'bold'
    },
    lessonInfo: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    currentLessonInfo: {
        marginTop: 30,
        borderTopWidth: 1,
        borderColor: '#cdc9c3',
        marginLeft: '15%'
    }
})