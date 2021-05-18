import React, { Component, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, Image, Keyboard, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { addSubject } from '../store/actions/sheduleActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Menu, Button, Provider, Snackbar } from 'react-native-paper';
import { languages } from '../../languages'

export const AddSubjectScreen = ({ route, navigation }) => {
    const interfaceLanguage = useSelector(state => state.gradeSystem)
    const selecteLanguage = interfaceLanguage.selectedLanguage
    const language = languages[selecteLanguage].translation
    const Subjects = useSelector(state => state.subjects)
    const [visible, setVisible] = React.useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const subjects = Subjects.map(item => item.item)
    const [selectedSubject, setSelectedSubject] = useState(language.chooseSubject)
    const openMenuSubject = () => setVisibleMenuSubject(true);
    const closeMenuSubject = () => setVisibleMenuSubject(false);
    const [visibleMenuSubject, setVisibleMenuSubject] = useState(false);
    const [teacher, SetTeacher] = useState('');
    const [subjectRoom, SetChamber] = useState('');
    const [startLessonTime, SetStartLessonTime] = useState('');
    const [endLessonTime, SetEndLessonTime] = useState('');
    const dispach = useDispatch();
    const { dayIndex } = route.params
    const [date, setDate] = useState(1);
    // const [mode, setMode] = useState('date');
    const [showStartLessonTime, setShowStartLessonTime] = useState(false);
    const [showEndLessonTime, setShowEndLessonTime] = useState(false);
    const onChangeStartLessonTime = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowStartLessonTime(false);
        setDate(currentDate);
        SetStartLessonTime(currentDate.toLocaleTimeString())

    };
    const onChangeEndLessonTime = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowEndLessonTime(false);
        setDate(currentDate);
        SetEndLessonTime(currentDate.toLocaleTimeString())
    };

    const showStartMode = (currentMode) => {
        setShowStartLessonTime(true);
        // setMode('time');
    };
    const showEndMode = (currentMode) => {
        setShowEndLessonTime(true);
        // setMode('time');
    };
    return (
        <Provider>
            <KeyboardAwareScrollView
                enableAutomaticScroll={true}
                style={{ backgroundColor: 'white' }}>
                <View style={styles.AddSubjectContainerElement}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Image style={{ width: 30, height: 30, marginRight: 10, marginTop: 15 }} source={require('../../assets/subject_name_icon.png')} />
                        <Menu
                            visible={visibleMenuSubject}
                            onDismiss={closeMenuSubject}
                            anchor={<Button onPress={openMenuSubject}><Text style={{ color: 'gray', fontSize: 16 }}>{selectedSubject}</Text></Button>}>
                            {
                                subjects.map((item, index) => <Menu.Item onPress={() => { setSelectedSubject(item), closeMenuSubject() }} key={index} title={item} />)
                            }
                        </Menu>
                    </View>
                </View>
                <View style={styles.AddSubjectContainerElement}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Image style={{ width: 30, height: 45, marginRight: 10, marginTop: 15, }} source={require('../../assets/teacher_icon.png')} />
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={language.teacher}
                            style={styles.InputStyle}
                            onChangeText={text => { SetTeacher(text) }}
                            onBlur={() => {
                                Keyboard.dismiss()
                            }}
                        />
                    </View>
                </View>
                <View style={styles.AddSubjectContainerElement}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Image style={{ width: 30, height: 30, marginRight: 10 }} source={require('../../assets/room_number.png')} />
                        <TextInput
                            keyboardType='numeric'
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={language.room}
                            style={styles.InputStyle}
                            onChangeText={text => { SetChamber(text) }}
                            onBlur={() => {
                                Keyboard.dismiss()
                            }}
                        />
                    </View>
                </View>
                <View style={{ borderWidth: 1, borderColor: '#666666', margin: 10, borderRadius: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: '#666666', marginTop: 10, }}>{language.titleTime}</Text>
                    <View style={styles.AddSubjectContainerElement}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require('../../assets/clock.png')} />
                            <TextInput
                                theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                label={language.startTime}
                                style={styles.InputStyle}
                                onChangeText={text => { SetChamber(text) }}
                                onFocus={() => {
                                    showStartMode()
                                    Keyboard.dismiss()
                                }}
                                value={startLessonTime.substring(0, 5)}
                                onBlur={() => {
                                    Keyboard.dismiss()
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.AddSubjectContainerElement}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require('../../assets/clock.png')} />
                            <TextInput
                                theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                label={language.endTime}
                                style={styles.InputStyle}
                                onChangeText={text => { SetChamber(text) }}
                                onFocus={() => {
                                    showEndMode()
                                    Keyboard.dismiss()
                                }}
                                value={endLessonTime.substring(0, 5)}
                            />
                        </View>
                        {/* <View style={{ flexDirection: 'row' }}>
                            <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require('../../assets/clock.png')} />
                            <Text style={styles.AddSubjectFonstStyle}>Время конца</Text>
                        </View>
                        <TextInput value={endLessonTime} style={styles.InputStyle} onFocus={() => showEndMode()} /> */}
                    </View>
                </View>
                <View style={styles.ButtonWrapper}>
                    <TouchableOpacity onPress={() => {
                            dispach(addSubject(dayIndex, selectedSubject, teacher, subjectRoom, startLessonTime, endLessonTime))
                            navigation.goBack()
                    }}>

                        <View style={styles.AddSubjectButton}>
                            <Text style={styles.ButtonText}>{language.addButton}</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <View style={styles.AddSubjectButton}>
                            <Text style={styles.ButtonText}>{language.cancelButton}</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.AddSubjectButton} onPress={showStartMode}><Text style={styles.ButtonText}>Начало</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.AddSubjectButton} onPress={showEndMode}><Text style={styles.ButtonText}>Конец</Text></TouchableOpacity> */}
                    {
                        showStartLessonTime && (
                            <DateTimePicker
                                testID='StartLessonTime'
                                value={date}
                                mode={'time'}
                                is24Hour={true}
                                display="clock"
                                onChange={onChangeStartLessonTime}
                            />
                        )
                    }
                    {
                        showEndLessonTime && (
                            <DateTimePicker
                                testID='EndLessonTime'
                                value={date}
                                mode={'time'}
                                is24Hour={true}
                                display="clock"
                                onChange={onChangeEndLessonTime}
                            />
                        )
                    }
                </View>
            </KeyboardAwareScrollView>
            <Snackbar
                style={{ backgroundColor: 'red', color: 'white' }}
                visible={visible}
                onDismiss={onDismissSnackBar}>
                Убедитесь, что все данные введены правильно
            </Snackbar>
        </Provider>
    )
}

const styles = StyleSheet.create({
    AddSubjectWrapper: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 78,

    },
    InputContainer: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 30,
        borderRadius: 10,
        backgroundColor: '#888888',
        paddingTop: 40,
        paddingBottom: 40,
    },
    AddSubjectContainerElement: {
        marginLeft: 10,
        width: '90%',
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    InputStyle: {
        width: "80%",
        height: 50,
        backgroundColor: 'transparent',
        color: 'white',

    },
    AddSubjectFonstStyle: {
        color: 'white',
        fontSize: 20
    },
    AddSubjectButton: {
        width: 90,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#666666'
    },
    ButtonText: {
        color: '#666666',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 40
    },
    ButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
        marginBottom: 20,
    }
})