import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView} from 'react-native'
import { Appbar, RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import {change_grade_system, change_language, change_amount_truances, change_amount_lateness} from '../store/actions/settings'
import {languages} from '../../languages'
import { TextInput, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

export let SettingsScreen = ({navigation}) => {
    const [value, setValue] = useState(1);
    const [amountTruancesValue, setAmountTruancesValue] = useState('');
    const [amountLatenessValue, setAmountLatenessValue] = useState('');
    // const [languageValue, setLanguageValue] = useState(1)
    const dispach = useDispatch()
    const state = useSelector(state => state.gradeSystem)
    const selecteLanguage = state.selectedLanguage
    const language = languages[selecteLanguage].translation

    function applyAttendanceSettings () {
        dispach(change_amount_truances(parseInt(amountTruancesValue)))
        dispach(change_amount_lateness(parseInt(amountLatenessValue)))
    }
    return (
        <ScrollView>
            <Appbar.Header style = {{backgroundColor: 'white', elevation: 0}}>
                    <Appbar.Action icon = 'menu' onPress={() => {
                        navigation.toggleDrawer
                        navigation.openDrawer()
                    }} />
                    <Appbar.Content title={language.settingsTitle}/>
                </Appbar.Header>
            
            {/* <View style = {{marginTop: 30, backgroundColor: 'white', margin: 10, borderRadius: 10, paddingTop: 10, paddingBottom: 10}}>
                <Text style = {{fontSize: 18, textAlign: 'center'}}>{language.systemGradesSettingsTitle}</Text>
                <Text style = {{fontSize: 14, textAlign: 'center', color: 'gray'}}>{language.systemGradesSettingsSubtitle}</Text>
                <View style = {{alignSelf: 'center', marginTop: 20, width: '80%'}}>
                    <RadioButton.Group onValueChange={newValue => {
                        setValue(newValue)
                        dispach(change_grade_system(newValue-1))
                    }} value={value}>
                        <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style = {{alignItems: 'center'}}>
                                <Text style = {{fontSize: 16}}>{language.gradesRadioOne}</Text>
                                <RadioButton value={1} />
                            </View>
                            <View style = {{alignItems: 'center'}}>
                                <Text style = {{fontSize: 16}}>{language.gradesRadioTwo}</Text>
                                <RadioButton value={2} />
                            </View>
                            <View style = {{alignItems: 'center'}}>
                                <Text style = {{fontSize: 16}}>{language.gradesRadioThree}</Text>
                                <RadioButton value={3} />
                            </View>
                        </View>
                    </RadioButton.Group>
                </View>
            </View> */}

            <View style = {{marginTop: 30, backgroundColor: 'white', margin: 10, borderRadius: 10, paddingTop: 10, paddingBottom: 10}}>
                <Text style = {{fontSize: 18, textAlign: 'center'}}>{language.languagesTitle}</Text>
                <Text style = {{fontSize: 14, textAlign: 'center', color: 'gray'}}>{language.languagesSubtitle}</Text>
                <View style = {{alignSelf: 'center', marginTop: 20, width: '80%', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress = {()=>{
                        dispach(change_language(0))
                    }}>
                        <Image style={{ width: 50, height: 50, marginTop: 5 }} source={require('../../assets/ukraine.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>{
                        dispach(change_language(1))
                    }}>
                        <Image style={{ width: 50, height: 50, marginTop: 5 }} source={require('../../assets/english.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style = {{marginTop: 30, backgroundColor: 'white', margin: 10, borderRadius: 10, paddingTop: 10, paddingBottom: 10}}>
                <Text style = {{fontSize: 18, textAlign: 'center'}}>{language.attendanceSettingsTitle}</Text>
                <Text style = {{fontSize: 14, textAlign: 'center', color: 'gray'}}>{language.attendanceSettingsSubtitle}</Text>
                <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',}}>
                    <Text style = {{fontSize: 16, marginTop: 20}}>{language.truancesLabel}</Text>
                    <TextInput
                        style = {styles.input}
                        maxLength = {4}
                        keyboardType = 'numeric'
                        label={language.attendanceSettingsInputLabel}
                        value={amountTruancesValue}
                        onChangeText={text => setAmountTruancesValue(text)}
                    />
                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',}}>
                    <Text style = {{fontSize: 16, marginTop: 20}}>{language.latenessLabel}</Text>
                    <TextInput
                        style = {styles.input}
                        maxLength = {4}
                        keyboardType = 'numeric'
                        label={language.attendanceSettingsInputLabel}
                        value={amountLatenessValue}
                        onChangeText={text => setAmountLatenessValue(text)}
                    />
                </View>
                <Button icon = 'settings' style = {
                    {width: '80%', alignSelf: 'center', marginTop: 20, marginBottom: 10}} 
                    mode="contained" onPress={applyAttendanceSettings}>
                    {language.attendanceSettingsButtonLabel}
                </Button>
            </View>
        </ScrollView>
    )
}
SettingsScreen = React.memo(SettingsScreen, [])
const styles = StyleSheet.create({

    input: {
        width: 150,
        height: 50,
        marginTop: 10,
        backgroundColor: 'transparent'
    }
})