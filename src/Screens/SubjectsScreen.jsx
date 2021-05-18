import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import { Appbar, List, Portal, Modal, Provider, TextInput, RadioButton, Button } from 'react-native-paper';
import {add_study_subject, remove_study_subject} from '../store/actions/subjects'
import { languages } from '../../languages'
export const SubjectsScreen = ({navigation}) => {

    const interfaceLanguage = useSelector(state => state.gradeSystem)
    const selecteLanguage = interfaceLanguage.selectedLanguage
    const language = languages[selecteLanguage].translation

    const subjects = useSelector(state => state.subjects)
    const [visible, setVisible] = useState(false);
    const [value, setValue] = React.useState('humanitarian');
    
    const [nameOfSubject, setNameOfSubjectText] = useState('');
    const [subjectTeacher, setSubjectTeacher] = useState('')

    const [subjectAbrevation, setSubjectAbrevation] = useState('')

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = {backgroundColor: 'white', padding: 20, margin: 30};

    const dispach = useDispatch()

    const Subject = ({name, abbreviation, type, id, removeButton}) => {
        return(
            <View style = {{
                    flexDirection: 'row', 
                    backgroundColor: '#eeeeee', 
                    padding: 10, 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    margin: 10,
                    borderRadius: 5,}}>
                <View>
                    <Text style = {{fontSize: 22}}>{name}</Text>
                    {
                        type === 'exact'? <Text style = {{color: 'gray'}}>{language.exactSubjec}</Text>
                        : <Text style = {{color: 'gray'}}>{language.humanitarianSubject}</Text>
                    }
                    <View style = {{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <Text style = {{fontSize: 16}}>{language.shortName}:</Text>
                        <Text style = {{color: 'gray', marginLeft: 10}}>{abbreviation}</Text>
                    </View>
                </View>
                
                {
                    removeButton === true ? 
                    null
                    :
                    <TouchableOpacity style = {{
                        justifyContent: 'center',
                        alignItems: 'center', 
                        width: 40, 
                        height: 40
                    }} onPress = {()=> dispach(remove_study_subject(id))}>
                        <Image style = {{width: 30, height: 30}} source = {require('../../assets/remove.png')}/>
                    </TouchableOpacity>
                }
                
            </View>
        )
    }
    return (
    <Provider>
        <Portal>
            <ScrollView style = {{backgroundColor: 'white'}}>
                <Appbar.Header style = {{backgroundColor: 'white', elevation: 0}}>
                    <Appbar.Action icon = 'menu' onPress={() => {
                        navigation.toggleDrawer
                        navigation.openDrawer()
                    }} />
                    <Appbar.Content title={language.subjectTitle}/>
                    <Appbar.Action icon="plus" onPress={showModal}/>
                </Appbar.Header>

                <View>

                    <List.Accordion
                        theme={{ colors: { primary: 'gray' }}}
                        title= {language.subjectsByDefault}>
                            {
                                subjects.map((item, index) => {
                                    if(item.custom === false){
                                        return (
                                        <Subject 
                                            id = {item.id}
                                            name = {selecteLanguage === 0 ? item.item : item.itemEng} 
                                            type = {item.type} 
                                            key = {index}
                                            abbreviation = {selecteLanguage === 0 ? item.Abbreviation : item.AbbreviationEng}
                                            removeButton = {true}/>
                                        )
                                        
                                    }
                                })
                            }       
                    </List.Accordion>
                    <List.Accordion
                        theme={{ colors: { primary: 'gray' }}}
                        title={language.userSubjects}>
                            {
                                subjects.map((item, index) => {
                                    if(item.custom === true){
                                        return (
                                            <Subject
                                                id = {item.id} 
                                                name = {item.item} 
                                                type = {item.type} 
                                                teacher = {item.teacher} 
                                                key = {index}
                                                abbreviation = {item.Abbreviation}
                                                removeButton = {false}/>
                                        )
                                    }
                                })
                            }
                    </List.Accordion>

                </View>
            </ScrollView>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style = {{fontSize: 20, marginBottom: 20, textAlign: 'center'}}>{language.addSubjectTitle}</Text>
                <TextInput
                    theme={{ colors: { primary: '#393e46', underlineColor: 'transparent', } }}
                    multiline = {true}
                    label={language.subjectName}
                    value={nameOfSubject}
                    onChangeText={text => setNameOfSubjectText(text)}
                    style = {{backgroundColor: 'white'}}
                />
                <TextInput
                    theme={{ colors: { primary: '#393e46', underlineColor: 'transparent', } }}
                    multiline = {true}
                    label={language.shortName}
                    maxLength = {6}
                    value={subjectAbrevation}
                    onChangeText={text => setSubjectAbrevation(text)}
                    style = {{backgroundColor: 'white', marginTop: 20}}
                />
                <Text style = {{
                    fontSize: 18, 
                    fontWeight: 'bold', 
                    textAlign: 'center', 
                    marginTop: 20
                }}>{language.typeOfSubject}</Text>
                <RadioButton.Group  onValueChange={newValue => setValue(newValue)} value={value}>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                        <View style = {{alignItems: 'center'}}>
                            <Text>{language.humanitarian}</Text>
                            <RadioButton color = '#28527a' value="humanitarian" />
                        </View>
                        <View style = {{alignItems: 'center'}}>
                            <Text>{language.exactSubjec}</Text>
                            <RadioButton color = '#2b2e4a' value="exact" />
                        </View>
                    </View>
                </RadioButton.Group>
                <View style = {{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
                    <Button color = 'black' onPress={() => {
                        dispach(add_study_subject(nameOfSubject, subjectTeacher, value, subjectAbrevation))
                        hideModal()
                    }}>
                        {language.addButton}
                    </Button>
                    <Button color = 'black' onPress={hideModal}>
                        {language.cancelButton}
                    </Button>
                </View>
            </Modal>
        </ Portal>
    </Provider>
    );
}