import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { removeSubject } from '../../store/actions/sheduleActions';
import { useDispatch, useSelector } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Appbar } from 'react-native-paper'
import { FAB } from 'react-native-paper';
import { languages } from '../../../languages'
import AsyncStorage from '@react-native-async-storage/async-storage'
export const Day = ({ nav, Daydata }) => {
    const dispach = useDispatch()
    const [state, setState] = React.useState({ open: false })
    const { open } = state
    const interfaceLanguage = useSelector(state => state.gradeSystem)
    const selecteLanguage = interfaceLanguage.selectedLanguage
    const language = languages[selecteLanguage].translation
    const onStateChange = ({ open }) => setState({ open })

    const callRemoveAlert = (dayIndex, id) => {
        Alert.alert(
            'Удаление предмета',
            'Вы действительно хотите удалить предмет',
            [
                {
                    text: language.yes,
                    onPress: () => {
                        dispach(removeSubject(dayIndex, id))
                    },
                    style: 'cancel'
                },
                {
                    text: language.no,
                    onPress: () => null,

                }
            ],
            { cancelable: true }
        );
    }
    return (
        <View style={{
            width: Dimensions.get('window').width,
            backgroundColor: 'white'
        }}>
            <Appbar.Header style={{ backgroundColor: 'white', elevation: 0, color: '#393e46' }} >
                <Appbar.Action onPress={() => {
                    nav.toggleDrawer
                    nav.openDrawer()
                }} icon='menu' />
                <Appbar.Content title={language.sheduleTitle} />
            </Appbar.Header>
            <ScrollView>
                <View style={{
                    flex: 1,
                    paddingTop: 35,
                    paddingBottom: 50,

                }}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Text style={styles.daysFontStyle}>{selecteLanguage === 0 ? Daydata.title : Daydata.titleEng}</Text>
                        <View style={{ marginTop: 20, width: '50%', borderBottomWidth: 1, borderColor: '#92817a' }}></View>
                    </View>
                    {
                        Daydata.subjects.length == 0 ?

                            <Text style={{
                                color: '#393e46',
                                fontSize: 22,
                                marginTop: 250,
                                marginLeft: 100,
                            }}>{language.emptyClassList}</Text>
                            :

                            Daydata.subjects.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity
                                            onLongPress={() => callRemoveAlert(Daydata.dayIndex, item.id)}
                                            onPress={(e) => { nav.navigate('SubjectScreen', { data: Daydata.subjects[index], dIndex: Daydata.dayIndex, id: item.id }) }} >
                                            <View>
                                                <View style={styles.subjectsContainer}>
                                                    <Image style={{ width: 30, height: 30, marginTop: 10 }} source={require('../../../assets/subject_name_icon.png')} />
                                                    <View style={{ alignItems: 'flex-start', marginLeft: 20, }}>
                                                        <Text style={styles.subjectsTitleFont}>{index + 1}. {item.name}</Text>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/room_number.png')} />
                                                            <Text style={styles.subjectsFontInfo}> {language.room} №: <Text style={styles.subjectsInfoValueFontBold}>{item.room}</Text></Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                                            <Image style={{ width: 25, height: 25, marginTop: 10 }} source={require('../../../assets/teacher_icon.png')} />
                                                            <Text style={styles.subjectsFontInfo}>{language.teacher}: <Text style={styles.subjectsInfoValueFontBold}>{item.teacher}</Text></Text>
                                                        </View>
                                                        <View
                                                            style={{
                                                                borderWidth: 1,
                                                                borderColor: '#666666',
                                                                marginTop: 10,
                                                                borderRadius: 5,
                                                                alignItems: 'center',
                                                                padding: 5,
                                                                flexDirection: 'row'
                                                            }}>
                                                            <Image style={{ width: 20, height: 20, marginRight: 5, }} source={require('../../../assets/clock.png')} />
                                                            <View>
                                                                <Text style={styles.subjectsFontInfo}> {language.startTime}: <Text style={styles.subjectsInfoValueFontBold}>{item.start.substring(0, 5)}</Text></Text>
                                                                <Text style={styles.subjectsFontInfo}> {language.endTime}: <Text style={styles.subjectsInfoValueFontBold}>{item.end.substring(0, 5)}</Text></Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ marginLeft: '25%', marginTop: 20, width: '50%', borderBottomWidth: 1, borderColor: '#666666' }}></View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                    }
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        top: 50,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}>

                    </View>
                </View>

            </ScrollView>

            <FAB.Group
                color={'white'}
                fabStyle={{ backgroundColor: '#666666', marginBottom: 100 }}
                open={open}
                icon={open ? 'calendar-today' : 'plus'}
                actions={[
                    {
                        icon: 'plus',
                        label: language.addSubject,
                        onPress: () => nav.navigate('AddSubjectScreen', {
                            dayIndex: Daydata.dayIndex
                        }),
                    },
                ]}
                onStateChange={onStateChange}
                style={{
                    elevation: 5,
                }}
            />
            <View style={{
                width: 60,
                height: 60,
                position: 'absolute',
                left: 330,
                top: Dimensions.get('window').height - 200,
            }}>
                {/* <TouchableOpacity title='Add subject' onPress={() => nav.navigate('AddSubjectScreen', {
                    dayIndex: Daydata.dayIndex
                })}>
                    <Image style={{ width: 60, height: 60 }}/>
                </TouchableOpacity> */}

                {/* <DateTimePicker /> */}
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    daysFontStyle: {
        color: '#393e46',
        fontSize: 26
    },
    subjectsContainer: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 10,
        paddingLeft: 20,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
    },
    subjectsTitleFont: {
        color: '#393e46',
        fontSize: 20,
        zIndex: 1,
        marginBottom: 15,



    },
    subjectsFontInfo: {
        color: '#393e46',
        fontSize: 16,
        paddingLeft: 10
    },
    subjectsInfo: {
        flexGrow: 1,
        paddingRight: 20,
    },
    subjectsInfoValueFontBold: {
        flexWrap: 'wrap',
    }
})