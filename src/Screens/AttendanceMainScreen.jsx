import React, { useState, useEffect } from 'react'
import { Text, } from 'native-base'
import { Dimensions, StyleSheet, View, Image, Keyboard, } from 'react-native'
import ProgressBar from 'react-native-progress/Bar';
import { FAB, Modal, TextInput, Title, IconButton, Colors, Button, Appbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/ru';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux'
import {
    addAbsencesToState,
    addLatenessToState,
    removeAbsencesFromState,
    increaseProgressBarValue,
    decreaseProgressBarValue,
    increaseLatenessBarValue,
    decreaseLatenessBarValue,
} from '../store/actions/academicPerformanceActions'
// import { rewriteAsyncAttendance } from "../../store/asyncMethods/methods"
import { loadAttendance } from "../store/actions/academicPerformanceActions"
import { languages } from '../../languages'

export default AttendanceMainScreen = ({ navigation }) => {
    const interfaceLanguage = useSelector(state => state.gradeSystem)
    const selecteLanguage = interfaceLanguage.selectedLanguage
    const language = languages[selecteLanguage].translation

    const data = useSelector(state => state)
    const [progress, setProgress] = useState(0)
    const [latenessProgress, setLatenessProgres] = useState(0)
    const amountAbsences = data.gradeSystem.amountTruances
    const amountLateness = data.gradeSystem.amountLateness
    const [currentAmountAbsences, setCurrentAbsencesAmount] = useState(0)
    const [currentLatenessAmount, setCurrentLatenessAmount] = useState(0)
    const [state, setState] = React.useState({ open: false });
    const [visibleAbsencesModal, setVisibleAbsencesModal] = React.useState(false);
    const [visibleLatenessModal, setVisibleLatenessModal] = React.useState(false);
    const [dateInput, setDateInput] = useState('');
    const [reasonInput, setReasonInput] = useState('');
    const [date, setDate] = useState(new Date().getTime());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const { open } = state;
    const absencesLength = data.Attendances.Absences.filter(item => item.title == 'Прогул').length
    const latenessLength = data.Attendances.Absences.filter(item => item.title == 'Запізнення').length
    const dispach = useDispatch()

    const showAbsencesModal = () => setVisibleAbsencesModal(true);
    const hideAbsencesModal = () => setVisibleAbsencesModal(false);
    const showLatenessModal = () => setVisibleLatenessModal(true);
    const hideLatenessModal = () => setVisibleLatenessModal(false);

    useEffect(() => {
        dispach(loadAttendance())
        setProgress(data.Attendances.progress)
        setLatenessProgres(data.Attendances.latenessProgress)
        setCurrentAbsencesAmount(absencesLength)
        setCurrentLatenessAmount(latenessLength)
    }, [data.Attendances.progress, data.Attendances.latenessProgress])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        const selDate = moment(selectedDate).locale('ru').format('LL')

        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDateInput(selDate)
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = (type) => {
        showMode('type');
    };
    const onStateChange = ({ open }) => setState({ open });
    const addAbsences = () => {
        dispach(increaseProgressBarValue(data.Attendances.progress + 1 / amountAbsences))
        hideAbsencesModal()
    }
    const removeAbsences = () => {
        dispach(decreaseProgressBarValue(data.Attendances.progress - 1 / amountAbsences))
        setCurrentAbsencesAmount(currentAmountAbsences - 1)
    }
    const addLateness = () => {
        dispach(increaseLatenessBarValue(data.Attendances.latenessProgress + 1 / amountLateness))
        hideLatenessModal()
    }
    const removeLateness = () => {
        dispach(decreaseLatenessBarValue(data.Attendances.latenessProgress - 1 / amountLateness))
        setCurrentLatenessAmount(currentLatenessAmount - 1)
    }
    const RenderAttendance = ({ reason, time, title, id, color }) => {
        return (
            <View style={styles.RenderAttendanceWrapper}>
                <View style={{ width: '80%', flexDirection: 'row' }}>
                    <View style={{
                        width: 40, height: 40,
                        backgroundColor: color,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{ color: 'white', fontSize: 18, }}>{title[0]}</Text>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 18 }}>{time}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16 }}>{reason}</Text>
                        </View>
                    </View>


                </View>
                <View style={{ alignItems: 'flex-end', marginLeft: 20, }}>
                    {
                        title == 'Прогул' ?
                            <IconButton
                                icon={'delete'}
                                color={Colors.grey600}
                                size={30}
                                onPress={() => {
                                    dispach(removeAbsencesFromState(id))
                                    removeAbsences()
                                }}
                            /> :
                            <IconButton
                                icon={'delete'}
                                color={Colors.grey600}
                                size={30}
                                onPress={() => {
                                    dispach(removeAbsencesFromState(id))
                                    removeLateness()
                                }}
                            />

                    }

                </View>
            </View>
        )
    }
    return (
        <>
            <View style={styles.mainScreenWrapper}>
                <Appbar.Header style={{
                    backgroundColor: '#f5f5f5',
                    elevation: 0,
                }}>
                    <Appbar.Action icon='menu' onPress={() => {
                        navigation.toggleDrawer
                        navigation.openDrawer()
                    }} />
                    <Appbar.Content title={language.attendanceTitle} />
                </Appbar.Header>
                <View style={styles.AbsencesInfoBlockWrapper}>
                    {
                        <>
                            <View style={styles.AbsencesInfoBlock} >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', paddingRight: 20 }}>
                                    <Text style={styles.AbsencesInfoBlockText}>{language.absencesLabel}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16 }}> {currentAmountAbsences} {language.of} </Text>
                                        <Text style={{ fontSize: 16 }}> {amountAbsences}</Text>
                                    </View>
                                </View>

                                <ProgressBar
                                    style={styles.ProgressBar}
                                    progress={progress} width={300}
                                    height={10}
                                    color={'#ee6f57'}
                                    unfilledColor={'#f05454'}
                                    borderWidth={0}
                                />

                            </View>
                            <View style={styles.AbsencesInfoBlock} >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', paddingRight: 20 }}>
                                    <Text style={styles.AbsencesInfoBlockText}>{language.latenessLabel}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16 }}> {currentLatenessAmount} {language.of} </Text>
                                        <Text style={{ fontSize: 16 }}> {amountLateness}</Text>
                                    </View>
                                </View>
                                <ProgressBar
                                    style={styles.ProgressBar}
                                    progress={latenessProgress} width={300}
                                    height={10}
                                    color={'#edc988'}
                                    unfilledColor={'#f05454'}
                                    borderWidth={0}
                                />
                            </View>
                        </>
                    }
                </View>
                <ScrollView>
                    <View style={styles.AttendanceWrapper}>
                        {
                            data.Attendances.Absences.map(item => <RenderAttendance
                                key={item.id}
                                reason={item.reason}
                                time={item.time}
                                id={item.id}
                                title={item.title}
                                color={item.color}
                            />)
                        }
                    </View>
                </ScrollView>
                {
                    <FAB.Group
                        color={'white'}
                        fabStyle={{ backgroundColor: '#433d3c', marginBottom: 50 }}
                        open={open}
                        icon={open ? 'calendar-today' : 'plus'}
                        actions={[
                            {
                                icon: 'minus',
                                label: language.addAbsence,
                                onPress: () => {
                                    showAbsencesModal()
                                },
                            },
                            {
                                icon: 'bell',
                                label: language.addLateness,
                                onPress: () => {
                                    showLatenessModal()
                                }
                            },
                        ]}
                        onStateChange={onStateChange}
                        style={{
                            elevation: 5,
                        }}
                    />
                }
            </View>
            <Modal visible={visibleAbsencesModal} onDismiss={hideAbsencesModal} contentContainerStyle={styles.ModalStyle}>
                <Title style={styles.ModalTitleStyle}>{language.addAbsenceTitle}</Title>
                <View style={styles.ModalTextInputBlock}>
                    <Image style={{ width: 30, height: 30, marginTop: 25, marginRight: 10, }} source={require('../../assets/modalCalendarIcon.png')} />
                    <TextInput
                        theme={{ colors: { primary: '#92817a', underlineColor: 'transparent', } }}
                        label={language.chooseDate}
                        value={dateInput}
                        onChangeText={text => setDateInput(text)}
                        onFocus={() => {
                            Keyboard.dismiss()
                            showDatepicker('date')
                        }}
                        style={styles.ModalTextInputStyle}

                    />
                </View>
                <View style={styles.ModalTextInputBlock}>
                    <Image style={{ width: 30, height: 30, marginTop: 25, marginRight: 10, }} source={require('../../assets/ModalReasonIcon.png')} />
                    <TextInput
                        theme={{ colors: { primary: '#92817a', underlineColor: 'transparent', } }}
                        label={language.specificReason}
                        value={reasonInput}
                        onChangeText={text => setReasonInput(text)}
                        style={styles.ModalTextInputStyle}

                    />
                </View>
                <View style={styles.modalButtonsGroup}>
                    <Button
                        mode='contained'
                        style={styles.ModalButtosStyle}
                        onPress={() => { dispach(addAbsencesToState(dateInput, reasonInput)), addAbsences() }}>{language.addButton}</Button>
                    <Button onPress={() => hideAbsencesModal()} mode='contained' style={{ backgroundColor: '#839b97', width: 120, }}>{language.cancelButton}</Button>
                </View>
                {
                    show && (
                        <DateTimePicker
                            testID="dateTime"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )
                }
            </Modal>
            <Modal visible={visibleLatenessModal} onDismiss={hideLatenessModal} contentContainerStyle={styles.ModalStyle}>
                <Title style={styles.ModalTitleStyle}>{language.addLatenessTitle}</Title>
                <View style={styles.ModalTextInputBlock}>
                    <Image style={{ width: 30, height: 30, marginTop: 25, marginRight: 10, }} source={require('../../assets/modalCalendarIcon.png')} />
                    <TextInput
                        theme={{ colors: { primary: '#92817a', underlineColor: 'transparent', } }}
                        label={language.chooseSubject}
                        value={dateInput}
                        onChangeText={text => setDateInput(text)}
                        onFocus={() => {
                            Keyboard.dismiss()
                            showDatepicker('date')
                        }}
                        style={styles.ModalTextInputStyle}

                    />
                </View>

                <View style={styles.ModalTextInputBlock}>
                    <Image style={{ width: 30, height: 30, marginTop: 25, marginRight: 10, }} source={require('../../assets/ModalReasonIcon.png')} />
                    <TextInput
                        theme={{ colors: { primary: '#92817a', underlineColor: 'transparent', } }}
                        label={language.specificReason}
                        value={reasonInput}
                        onChangeText={text => setReasonInput(text)}
                        style={styles.ModalTextInputStyle}

                    />
                </View>
                <View style={styles.modalButtonsGroup}>
                    <Button
                        mode='contained'
                        style={styles.ModalButtosStyle}
                        onPress={() => { dispach(addLatenessToState(dateInput, reasonInput)), addLateness() }}>{language.addButton}</Button>
                    <Button onPress={() => hideLatenessModal()} mode='contained' style={{ backgroundColor: '#839b97', width: 120, }}>{language.cancelButton}</Button>
                </View>
                {
                    show && (
                        <DateTimePicker
                            testID="dateTime"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )
                }
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    mainScreenWrapper: {
        height: Dimensions.get('window').height,
        backgroundColor: '#f5f5f5',

    },
    AbsencesInfoBlock: {
        width: '90%',
        margin: 20,
        alignItems: 'center',
        fontSize: 18,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    AbsencesInfoBlockText: {
        width: '90%',
        marginTop: 10,
        marginBottom: 10,
        color: 'black',
        fontSize: 18,
    },
    AbsencesInfoBlockWrapper: {
        alignItems: 'center',
        paddingBottom: 30,
        backgroundColor: 'white'
    },
    ProgressBar: {
        marginTop: 10,
        backgroundColor: '#dddddd'
    },
    bold: {
        color: 'black',
        fontWeight: 'bold'
    },
    ModalStyle: {
        justifyContent: 'space-between',
        borderRadius: 10,
        marginLeft: 60,
        backgroundColor: 'white',
        padding: 20,
        width: 300,
        height: 400,
        alignItems: 'center'
    },
    ModalButtosStyle: {
        width: 120,
        backgroundColor: '#92817a',
        marginRight: 5,
    },
    ModalTitleStyle: {
        color: '#92817a',
    },
    ModalTextInputBlock: {
        flexDirection: 'row',
    },
    ModalTextInputStyle: {
        width: '85%',
        height: 60,
        backgroundColor: 'transparent',
        borderColor: '#92817a',
    },
    ModalAbsensesTextInputStyle: {
        width: '20%',
        backgroundColor: 'transparent',
        borderColor: '#92817a',
    },
    modalButtonsGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    AttendanceWrapper: {
        marginTop: 10,
        alignItems: 'center',
    },
    RenderAttendanceWrapper: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '90%',
        padding: 10,
    },
    hrAttendance: {
        marginTop: 5,
        borderBottomWidth: 1,
        borderColor: '#92817a',
        width: '80%',
    },
    RenderAttendanceText: {
        fontSize: 18
    },
    loader: {
        marginTop: '40%',
        marginBottom: '40%'
    }
})