import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Appbar, Modal, Portal, Provider, Menu, Button, Switch, ActivityIndicator } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addGrade, removeGrade } from '../store/actions/gradesActions'
import { add_grade_to_subject, remove_grade_from_subject } from '../store/actions/subjects'
import { gradesSystem } from '../../graduatesSystem'
import { languages } from '../../languages'
import AnimatedSplash from "react-native-animated-splash-screen";
export const GradesScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        navigation.addListener('focus', () => {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        })
    }, [navigation])

    const interfaceLanguage = useSelector(state => state.gradeSystem)
    const selecteLanguage = interfaceLanguage.selectedLanguage
    const language = languages[selecteLanguage].translation
    const grades = useSelector(state => state.grade.grades)


    const markedDates = Object.keys(grades).map(item => {
        return {
            [item]: { marked: true }
        }
    })
    const newObj = Object.assign({}, ...markedDates);
    const systemGrades = useSelector(state => state.gradeSystem.selectedGradeSystem)
    const subjects = useSelector(state => state.subjects.map(item => item.item))
    const [selectedDate, setSelectedDate] = useState(language.indicateDate)
    // const grads = [
    //     {
    //         value: 1,
    //         color: '#900d0d',
    //     },
    //     {
    //         value: 2,
    //         color: '#ec4646',
    //     },
    //     {
    //         value: 3,
    //         color: '#f37121',
    //     },
    //     {
    //         value: 4,
    //         color: '#adce74',
    //     },
    //     {
    //         value: 5,
    //         color: '#61b15a',
    //     },
    // ]
    // const onDismissSnackBar = () => setVisibleSnack(false);
    const [selectedGrade, setSelectedGrade] = useState('')
    const [selectedSubject, setSelectedSubject] = useState(language.chooseSubject)
    const [visible, setVisible] = useState(false);
    const [visibleMenuSubject, setVisibleMenuSubject] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    function openMenuSubject() {
        setVisibleMenuSubject(true)
    }
    const closeMenuSubject = () => setVisibleMenuSubject(false);
    const [randomIdForSubject, setRandomIdForSubject] = useState(0)
    const showModal = () => {
        setVisible(true)
        setRandomIdForSubject(new Date().getTime())
    };
    const hideModal = () => setVisible(false);
    const [gradeDescription, setGradeDescription] = useState('')
    const dispatch = useDispatch()

    const modalStyle = {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10
    }
    const [date, setDate] = useState(new Date(moment().format('YYYY-MM-DD')));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setSelectedDate(moment(selectedDate).format('YYYY-MM-DD'))
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    function MenuSubjectsItems(item, index) {
        return <Menu.Item onPress={() => { setSelectedSubject(item), closeMenuSubject() }} key={index} title={item} />
    }
    LocaleConfig.locales['ru'] = {
        monthNames: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
        monthNamesShort: ['Січ.', 'Лют.', 'Бер', 'Кві', 'Трав', 'Чер', 'Лип.', 'Сер', 'Вер.', 'Жов.', 'Лис.', 'Гру.'],
        dayNames: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пятниця', 'Субота'],
        dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    };
    LocaleConfig.defaultLocale = 'ru';
    return (
        <Provider>
            <View>
                <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                    <Appbar.Action icon='menu' onPress={() => {
                        navigation.toggleDrawer
                        navigation.openDrawer()
                    }} />
                    <Appbar.Content title={language.gradesTitle} color='#898b8a' />
                    <Appbar.Action icon="plus" color='#898b8a' onPress={() => showModal()} />
                </Appbar.Header>
                <View style={styles.mainBlockStyle}>
                    {
                        isLoading === true ?
                            <ActivityIndicator style = {{marginTop: '70%'}} animating={true} color='gray' />
                            :
                            <Agenda
                                pastScrollRange={3}
                                futureScrollRange={0}
                                items={grades}
                                markedDates={newObj}
                                renderEmptyData={() =>
                                    <View style={{ alignItems: 'center', paddingTop: '40%' }}>
                                        <Image style={styles.bigImages} source={require('../../assets/Write.png')} />
                                        <Text style={styles.thereArentGradesLabel}>{language.empyGradeList}</Text>
                                    </View>}
                                selected={moment().format('YYYY-MM-DD')}
                                renderItem={(item) =>
                                    <TouchableOpacity style={styles.gradeBlock}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={styles.gradeDescription}>{item.description}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', width: 200 }}>
                                                    <Text style={styles.gradeSubject}>{item.subject}</Text>
                                                </View>
                                                <View style={{ marginTop: 10 }}>
                                                    <Text style={{ fontSize: 16, color: '#686d76' }}>
                                                        {language.agreeWithGrade}
                                                        <Text style={styles.isLikeGrade} >
                                                            {
                                                                item.isFinalGrade == true ? language.yes : language.no
                                                            }
                                                        </Text>
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.gradeValue}>
                                                <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>{item.grade.value}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', }}>

                                        </View>
                                        <Button onPress={() => {
                                            dispatch(removeGrade(item.date, item.id))
                                            dispatch(remove_grade_from_subject(item.subject, item.randomIdForSubject))
                                        }}
                                            color='gray' style={styles.removeGradeButton}>{language.deleteButton}</Button>
                                    </TouchableOpacity>
                                }
                                hideKnob={false}
                            />
                    }
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={modalStyle}>
                            <View style={{ alignSelf: 'center' }}><Text style={styles.addGradeLabel}>{language.gradesModalAddTitle}</Text></View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                <Image style={{ width: 20, height: 20, marginTop: 5, }} source={require('../../assets/descriptionItem.png')} />
                                <TextInput style={styles.inputStyle}
                                    maxLength={200}
                                    multiline={true}
                                    placeholder={language.addDesription}
                                    value={gradeDescription}
                                    onChangeText={(text) => setGradeDescription(text)} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ width: 20, height: 20 }} source={require('../../assets/TheoryIcon.png')} />
                                <TextInput style={styles.inputStyle} maxLength={20}
                                    placeholder={language.enterGrade}
                                    value={selectedGrade}
                                    keyboardType='numeric'
                                    onChangeText={(text) => setSelectedGrade(text)} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                <Image style={{ width: 20, height: 20 }} source={require('../../assets/TheoryIcon.png')} />
                                <Menu
                                    visible={visibleMenuSubject}
                                    onDismiss={closeMenuSubject}
                                    anchor={
                                        <Button color='gray' onPress={openMenuSubject}>
                                            <Text style={{ color: 'gray', fontSize: 16 }}>
                                                {selectedSubject}
                                            </Text>
                                        </Button>
                                    }>
                                    {
                                        subjects.map(MenuSubjectsItems)
                                    }
                                </Menu>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
                                <Image style={{ width: 20, height: 20, marginTop: 5, }} source={require('../../assets/DrawerSheduleIcon.png')} />
                                <Button onPress={showDatepicker}><Text style={{ fontSize: 16, color: 'gray' }}>{selectedDate}</Text></Button>
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: 'gray', fontSize: 16, marginRight: 20 }}>{language.agreeWithGrade}</Text>
                                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 50 }}>
                                <Button onPress={() => {
                                        dispatch(addGrade(moment(date).format('YYYY-MM-DD'), gradeDescription, selectedSubject, isSwitchOn, '', selectedGrade, randomIdForSubject))
                                        dispatch(add_grade_to_subject(selectedGrade, moment(date).format('YYYY-MM-DD'), selectedSubject, randomIdForSubject))
                                        hideModal()
                                }}>
                                    <Text style={{ fontSize: 16, color: 'gray' }}>{language.addButton}</Text></Button>
                                <Button onPress={() => hideModal()}><Text style={{ fontSize: 16, color: 'gray' }}>{language.cancelButton}</Text></Button>
                            </View>
                        </Modal>
                    </Portal>
                </View>
            </View>
        </Provider>
    );
}
const styles = StyleSheet.create({
    gradeBlock: {
        width: '90%',
        backgroundColor: 'white',
        marginTop: 30,
        padding: 10,
        borderRadius: 5
    },
    mainBlockStyle: {
        width: '100%',
        height: '90%'
    },
    thereArentGradesLabel: {
        fontSize: 18, color: '#898b8a'
    },
    bigImages: {
        height: 60,
        width: 60
    },
    defaultStyleImage: {
        width: 20, height: 20
    },
    gradeValue: {
        width: 50,
        height: 50,
        backgroundColor: '#ffc93c',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 35
    },
    gradeDescription: {
        fontSize: 18,
        width: 200,
        fontWeight: 'bold',
        color: '#364547'
    },
    gradeSubject: {
        color: 'gray',
        fontSize: 14,
    },
    isLikeGrade: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#686d76'
    },
    removeGradeButton: {
        marginTop: 30
    },
    inputStyle: {
        marginLeft: 15,
        fontSize: 18,
        color: 'gray',
        width: '80%',
    },
    addGradeLabel: {
        fontSize: 20,
        color: 'gray',
        marginBottom: 40
    }
})