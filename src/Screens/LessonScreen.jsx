import React, { Component, useState } from 'react';
import {Text, View, StyleSheet, ImageBackground, Dimensions, Image, Keyboard, KeyboardAvoidingView, ProgressViewIOS } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { removeSubject, updateSubject } from '../store/actions/sheduleActions';
import { TextInput, Provider, Menu, Button, Snackbar } from 'react-native-paper';
import {languages} from '../../languages';
export const LessonScreen = ({ navigation, route }) => {
    const interfaceLanguage = useSelector(state => state.gradeSystem)
    const selecteLanguage = interfaceLanguage.selectedLanguage
    const language = languages[selecteLanguage].translation
    const Subjects = useSelector(state => state.subjects)
    const subjects = Subjects.map(item => item.item)
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const [visible, setVisible] = React.useState(false);
    const [selectedSubject, setSelectedSubject] = useState(language.chooseSubject)
    const [visibleMenuSubject, setVisibleMenuSubject] = useState(false);
    const openMenuSubject = () => setVisibleMenuSubject(true);
    const closeMenuSubject = () => setVisibleMenuSubject(false);
    const { name, room, teacher, start, end } = route.params.data
    const dayIndex = route.params.dIndex
    const id = route.params.id
    const [updateName, setUpdateName] = useState(name)
    const [updateRoom, setUpdateRoom] = useState(room)
    const [updateTeacher, setUpdateTeacher] = useState(teacher)
    const [date, setDate] = useState(1);
    const [mode, setMode] = useState('date');
    const [startLessonTime, SetStartLessonTime] = useState(start);
    const [endLessonTime, SetEndLessonTime] = useState(end);
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
        setMode('time');
    };
    const showEndMode = (currentMode) => {
        setShowEndLessonTime(true);
        setMode('time');
    };

    const dispach = useDispatch()
    return (
        <Provider>
            <KeyboardAwareScrollView
                enableAutomaticScroll={true}
                extraHeight={200}
                style={{ backgroundColor: 'white' }}>
                {/* <ImageBackground style={styles.backgroundStyle} source={(require('../../assets/SubjectBackground.png'))}> */}
                    {/* <TouchableOpacity style={styles.AddSubjectButton} onPress={showStartMode}><Text style={styles.ButtonText}>Начало</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.AddSubjectButton} onPress={showEndMode}><Text style={styles.ButtonText}>Конец</Text></TouchableOpacity> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40, marginTop: 40, marginLeft: 20, }}>
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Image style={{ width: 30, height: 30, marginRight: 20, marginTop: 10 }}
                                source={require('../../assets/subject_name_icon.png')} />
                            {/* <TextInput
                                label='Название предмета'
                                onChangeText={(Text) => setUpdateName(Text)}
                                value={updateName}
                                style={styles.inputStyle}
                                theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                onBlur={() => {
                                    Keyboard.dismiss()
                                }}
                            /> */}
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

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40, marginLeft: 20, }}>
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Image style={{ width: 40, height: 50, marginRight: 10, marginTop: 10 }} source={require('../../assets/teacher_icon.png')} />
                            <TextInput
                                label={language.teacher}
                                onChangeText={(Text) => setUpdateTeacher(Text)}
                                value={updateTeacher}
                                style={styles.inputStyle}
                                theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                onBlur={() => {
                                    Keyboard.dismiss()
                                }}
                            />
                            {/* <TextInput onChangeText={(Text) => setUpdateTeacher(Text)} 
                                style={{ fontSize: 18, fontWeight: 'bold', color: '#f4f4f2', paddingBottom: 10, marginLeft: 10, marginBottom:10 }} value={updateTeacher} /> */}
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40, marginLeft: 20, }}>
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Image style={{ width: 30, height: 30, marginRight: 20, marginTop: 10 }} source={require('../../assets/room_number.png')} />
                            <TextInput
                                label={language.room}
                                onChangeText={(Text) => setUpdateRoom(Text)}
                                value={updateRoom}
                                style={styles.inputStyle}
                                theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                keyboardType = {'numeric'}
                                onBlur={() => {
                                    Keyboard.dismiss()
                                }}
                            />
                            {/* <TextInput 
                                onChangeText={(Text) => setUpdateRoom(Text)} 
                                value={updateRoom} /> */}
                        </View>
                    </View>


                    <View style={{ borderWidth: 1, borderColor: '#666666', margin: 10, borderRadius: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: '#666666', marginTop: 10, }}>{language.titleTime}</Text>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20, paddingBottom: 10 }}>
                            <Image style={{ width: 30, height: 30, marginRight: 20, marginTop: 10 }} source={require('../../assets/clock.png')} />
                            {/* <Text style={styles.subjectinfoFontStyle}>Время начала</Text> */}
                            <TextInput
                                label={language.startTime}
                                value={startLessonTime.substring(0,5)}
                                style={styles.inputStyle}
                                theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                onFocus={() => {
                                    showStartMode()
                                    Keyboard.dismiss()
                                }}
                            />
                            {/* <Text value={startLessonTime}  
                                style={{ fontSize: 18, fontWeight: 'bold', color: '#f4f4f2', paddingBottom: 10, marginLeft: 10,  }}>{start}</Text> */}
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20 }}>
                            <Image style={{ width: 30, height: 30, marginRight: 20, }} source={require('../../assets/clock.png')} />

                            {/* <Text style={styles.subjectinfoFontStyle}>Время конца</Text> */}
                            <TextInput
                                label={language.endTime}
                                value={endLessonTime.substring(0,5)}
                                style={styles.inputStyle}
                                theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                onFocus={() => {
                                    showEndMode()
                                    Keyboard.dismiss()
                                }}
                            />
                            {/* <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#f4f4f2', paddingBottom: 10, marginLeft: 10 }}>{end}</Text> */}
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 40, }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('SheduleScreen')
                                dispach(updateSubject(dayIndex, id, selectedSubject, updateRoom, updateTeacher, startLessonTime, endLessonTime))
                            }}
                            style={{ alignItems: 'center' }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/edit_subject.png')} />
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#666666', paddingBottom: 10 }}>{language.rewriteButton}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('SheduleScreen')
                                dispach(removeSubject(dayIndex, id))
                            }}
                            style={{ alignItems: 'center' }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/delete_subject.png')} />
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#E74C3C', paddingBottom: 10 }}>{language.deleteButton}</Text>
                        </TouchableOpacity>

                    </View>
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
                    <Snackbar
                        style = {{backgroundColor: 'red', color: 'white'}}
                        visible={visible}
                        onDismiss={onDismissSnackBar}>
                        Убедитесь, что все данные введены правильно
                    </Snackbar> 
            </KeyboardAwareScrollView>
        </Provider>
    )
}
const styles = StyleSheet.create({
    backgroundStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 80
    },
    subjectInfoStyle: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        marginLeft: 25,
        paddingTop: 60,
        width: Dimensions.get('window').width - 50,
        borderRadius: 10,
        backgroundColor: '#bbbfca'
    },
    subjectinfoFontStyle: {
        marginBottom: 10,
        fontSize: 20,
        color: 'white',
    },
    ButtonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 50
    },
    AddSubjectButton: {
        width: 100,
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff'
    },
    inputStyle: {
        width: 200,
        height: 50,
        backgroundColor: 'transparent',
    }
})