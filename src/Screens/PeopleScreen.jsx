import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Appbar, Menu, Divider, Provider, Searchbar, Modal, Portal, TextInput, Button, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { addPerson, loadPeople, removePerson } from '../store/actions/peopleActions'
import { languages } from '../../languages'
export default PeopleScreen = ({ navigation }) => {

    const interfaceLanguage = useSelector(state => state.gradeSystem)
    const selecteLanguage = interfaceLanguage.selectedLanguage
    const language = languages[selecteLanguage].translation

    const state = useSelector(state => state)
    const [searchBarVisible, setSearchBarVisisble] = useState(false)
    const [visibilityAddPersonModal, setVisibilityAddPersonModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const validInput = /^[0-9a-zA-ZА-Яа-яА-Яа-яёЁЇїІіЄєҐґ]+$/;
    const [modalTextFullName, setModalTextFullName] = useState('')
    const [modalTextPersonSubject, setModalTextPersonSubject] = useState('')
    const [modalTextPersonBirthday, setModalTextPersonBirthday] = useState('')
    const [modalTextPersonPhone, setModalTextPersonPhone] = useState('')
    const [modalTextPersonEmail, setModalTextPersonEmail] = useState('')

    const [modalRarioValue, setModalRadioValue] = useState('teacher');
    const [titleSelectedPerson, setTitleSelectedPerson] = useState('Вчитель')

    const filteredTeachersData = state.people.teachers.filter((person => person.name.indexOf(searchQuery) !== -1))
    const filteredClassMateData = state.people.students.filter((person => person.name.indexOf(searchQuery) !== -1))
    const filteredOthersData = state.people.other.filter((person => person.name.indexOf(searchQuery) !== -1))

    const [visible, setVisible] = useState(false);
    const hideDialog = () => setVisible(false);

    const [visibleMenu, setVisibleMenu] = React.useState(false);
    const openMenu = () => setVisibleMenu(true);
    const closeMenu = () => setVisibleMenu(false);

    const [visibleChangeClassTeacherModal, setVisibleVisibleChangeClassTeacherModal] = useState(false);
    const showChangeTeacherModal = () => setVisibleVisibleChangeClassTeacherModal(true);
    const hideChangeTeacherModal = () => setVisibleVisibleChangeClassTeacherModal(false);

    const dispach = useDispatch()

    useEffect(() => {
        dispach(loadPeople())
    }, [])
    const RenderCountTypePerson = ({ length, color }) => {
        return (
            <View style={{
                width: 30, height: 30, borderRadius: 50, backgroundColor: color,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{length}</Text>
            </View>
        )
    }
    const RenderPerson = ({ name, subject, birthday, phone, type, id, email }) => {
        return (
            <View style={{ backgroundColor: 'white', width: '85%', marginTop: 20, marginLeft: 35, borderRadius: 10 }}>
                <View style={{ marginBottom: 10, }}>
                    <View style={{ flexGrow: 1, marginBottom: 10 }}>
                        <View style={{ marginTop: 20 }}>
                            <View style={{ paddingLeft: 20, width: '80%', flexDirection: 'row', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 25, height: 25, marginRight: 10, marginTop: 5 }} source={require('../../assets/AboutUsIcon.png')} />
                                    <Text style={{ fontSize: 20, color: '#636363' }}>{name}</Text>
                                </View>
                            </View>
                            <View style={{ paddingLeft: 20, paddingBottom: 10, flexDirection: 'row', marginTop: 10 }}>
                                <Image style={{ width: 15, height: 15, marginRight: 20 }} source={require('../../assets/phone_num_icon.png')} />
                                <Text style={{ fontSize: 14, color: 'grey' }}>{phone}</Text>
                            </View>
                            <View style={{ paddingLeft: 20, paddingBottom: 20, flexDirection: 'row',}}>
                                <Image style={{ width: 15, height: 15, marginRight: 20 }} source={require('../../assets/email.png')} />
                                <Text style={{ fontSize: 14, color: 'grey' }}>{email}</Text>
                            </View>
                            {
                                type == 'classmate' ? <View></View>
                                    :
                                    <View style={{ flexDirection: 'row', }}>
                                        <Image style={{ width: 25, height: 25, marginLeft: 20 }} source={require('../../assets/TheoryIcon.png')} />
                                        <Text style={{ fontSize: 16, color: 'gray', marginLeft: 12 }} >{subject}</Text>
                                    </View>
                            }
                            <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
                                <Image style={{ width: 20, height: 20, marginRight: 10 }} source={require('../../assets/birthday_icon.png')} />
                                <Text style={{ fontSize: 16, color: 'gray' }}>{birthday}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Button color={'gray'} icon="delete" onPress={() => {
                        dispach(removePerson(id, type))
                        hideDialog()
                    }}> {language.deleteButton}
                    </Button>
                </View>
            </View>
        )
    }
    const RenderClassRoomTeacher = ({ fullName, subject, birthday, phone }) => {
        return (
            <View style={{ backgroundColor: '#f58b54', padding: 10 }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require('../../assets/classRoomTeacherIcons/personIcon.png')} />
                    <Text style={{ fontSize: 18, color: 'white' }}>{fullName}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require('../../assets/classRoomTeacherIcons/subjectIcon.png')} />
                    <Text style={{ fontSize: 18, color: 'white' }} >{subject}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require('../../assets/classRoomTeacherIcons/birthdayIcon.png')} />
                    <Text style={{ fontSize: 18, color: 'white' }}>{birthday}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require('../../assets/classRoomTeacherIcons/telephone.png')} />
                    <Text style={{ fontSize: 18, color: 'white' }}>{phone}</Text>
                </View>

                <View style={{ borderTopWidth: 1, borderColor: 'white', marginTop: 10, paddingTop: 10, alignItems: 'center' }}>
                    <TouchableOpacity onPress={showChangeTeacherModal}>
                        <Text style={{ fontSize: 18, color: 'white' }}>{language.changeClassLeader}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10, paddingTop: 10, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        dispach(addPerson(' ', modalTextPersonSubject, modalTextPersonBirthday, modalTextPersonPhone, 'classRoomTeacher'))
                    }}>
                        <Text style={{ fontSize: 18, color: 'white' }}>{language.removeClassLeader}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <Provider>
            <View>
                <Appbar.Header style={{ backgroundColor: '#f5f4f4', elevation: 0 }}>
                    <Appbar.Action icon='menu' onPress={() => {
                        navigation.toggleDrawer
                        navigation.openDrawer()
                    }} />
                    <Appbar.Content title={language.peopleTitle} />
                    {
                        searchBarVisible && <Searchbar
                            style={{ width: 230, height: 30, elevation: 0 }}
                            placeholder={language.search}
                            onChangeText={(text) => setSearchQuery(text)}
                            value={searchQuery}
                        />
                    }

                    <Appbar.Action icon="magnify" onPress={() => setSearchBarVisisble(!searchBarVisible)} />
                    <Appbar.Action icon="plus" onPress={() => setVisibilityAddPersonModal(!visibilityAddPersonModal)} />

                    <Portal>

                        <Modal visible={visibilityAddPersonModal} onDismiss={() => setVisibilityAddPersonModal(false)} contentContainerStyle={styles.addPersonModal}>
                            <View style={{ marginBottom: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: '#555555' }}>{language.addPersonTitle}</Text>
                            </View>
                            <Divider />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <Menu
                                    visible={visibleMenu}
                                    onDismiss={closeMenu}
                                    anchor={<Button icon='account' color={'#555555'} onPress={openMenu}>{titleSelectedPerson}</Button>}>
                                    <Menu.Item onPress={() => { setModalRadioValue('teacher'), setTitleSelectedPerson('Учитель'), closeMenu() }} title='Учитель' />
                                    <Menu.Item onPress={() => { setModalRadioValue('classmate'), setTitleSelectedPerson('Однокласник'), closeMenu() }} title="Однокласник" />
                                    <Menu.Item onPress={() => { setModalRadioValue('classRoomTeacher'), setTitleSelectedPerson('Класный руководитель'), closeMenu() }} title="Класний керівник" />
                                    <Menu.Item onPress={() => { setModalRadioValue('other'), setTitleSelectedPerson('Другие'), closeMenu() }} title="Інші" />
                                </Menu>
                            </View>
                            <View>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <Image style={{ width: 25, height: 25, marginTop: 10, marginRight: 10 }} source={require('../../assets/AboutUsIcon.png')} />
                                    <TextInput
                                        theme={{ colors: { primary: '#393e46', underlineColor: 'transparent', } }}
                                        style={styles.modalTextInput} label={language.nameTeacher}
                                        onChangeText={text => setModalTextFullName(text)} />
                                </View>
                                {
                                    modalRarioValue === 'classmate' ? <View></View>
                                        :
                                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                            <Image style={{ width: 25, height: 25, marginTop: 15, marginRight: 10 }} source={require('../../assets/TheoryIcon.png')} />
                                            <TextInput theme={{ colors: { primary: '#393e46', underlineColor: 'transparent', } }}
                                                style={styles.modalTextInput} label={language.subjectName}
                                                onChangeText={text => setModalTextPersonSubject(text)} />
                                        </View>
                                }
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <Image style={{ width: 25, height: 25, marginTop: 15, marginRight: 10 }} source={require('../../assets/phone_num_icon.png')} />
                                    <TextInput theme={{ colors: { primary: '#393e46', underlineColor: 'transparent', } }}
                                        style={styles.modalTextInput} label={language.numberOfPhone}
                                        onChangeText={text => setModalTextPersonPhone(text)} />
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <Image style={{ width: 25, height: 25, marginTop: 15, marginRight: 10 }} source={require('../../assets/email.png')} />
                                    <TextInput theme={{ colors: { primary: '#393e46', underlineColor: 'transparent', } }}
                                        style={styles.modalTextInput} label={language.writeEmail}
                                        onChangeText={text => setModalTextPersonEmail(text)} />
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <Image style={{ width: 25, height: 25, marginTop: 15, marginRight: 10 }} source={require('../../assets/birthday_icon.png')} />
                                    <TextInput theme={{ colors: { primary: '#393e46', underlineColor: 'transparent', } }}
                                        style={styles.modalTextInput} label={language.dayOfBirthday}
                                        onChangeText={text => setModalTextPersonBirthday(text)} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 25 }}>
                                    <Button color={'#393e46'} onPress={() => {
                                        dispach(addPerson(modalTextFullName, modalTextPersonSubject, modalTextPersonBirthday, modalTextPersonPhone, modalRarioValue, modalTextPersonEmail))
                                        setVisibilityAddPersonModal(false)
                                    }
                                    }>{language.addButton}</Button>
                                    <Button color={'#393e46'} onPress={() => setVisibilityAddPersonModal(false)}>{language.cancelButton}</Button>
                                </View>
                            </View>
                        </Modal>

                        <Modal contentContainerStyle={{
                            width: '80%',
                            height: 400,
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            padding: 10,
                        }} visible={visibleChangeClassTeacherModal} onDismiss={hideChangeTeacherModal}>
                            <Text style={{ fontSize: 18, color: 'gray', alignSelf: 'center', marginTop: 10, marginBottom: 20 }}>{language.changeClassLeader}</Text>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <Image style={{ width: 25, height: 25, marginTop: 10, marginRight: 10 }} source={require('../../assets/AboutUsIcon.png')} />
                                <TextInput
                                    theme={{ colors: { primary: '#393e46', underlineColor: 'transparent', } }}
                                    style={styles.modalTextInput} label={language.nameTeacher}
                                    onChangeText={text => setModalTextFullName(text)} />
                            </View>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <Image style={{ width: 25, height: 25, marginTop: 15, marginRight: 10 }} source={require('../../assets/TheoryIcon.png')} />
                                <TextInput theme={{ colors: { primary: '#393e46', underlineColor: 'transparent', } }}
                                    style={styles.modalTextInput} label={language.nameOfSubjec}
                                    onChangeText={text => setModalTextPersonSubject(text)} />
                            </View>

                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <Image style={{ width: 25, height: 25, marginTop: 15, marginRight: 10 }} source={require('../../assets/phone_num_icon.png')} />
                                <TextInput theme={{ colors: { primary: '#393e46', underlineColor: 'transparent', } }}
                                    style={styles.modalTextInput} label={language.numberOfPhone}
                                    onChangeText={text => setModalTextPersonPhone(text)} />
                            </View>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <Image style={{ width: 25, height: 25, marginTop: 15, marginRight: 10 }} source={require('../../assets/birthday_icon.png')} />
                                <TextInput theme={{ colors: { primary: '#393e46', underlineColor: 'transparent', } }}
                                    style={styles.modalTextInput} label={language.dayOfBirthday}
                                    onChangeText={text => setModalTextPersonBirthday(text)} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 30 }}>
                                <Button color={'#393e46'} onPress={() => {
                                    dispach(addPerson(modalTextFullName, modalTextPersonSubject, modalTextPersonBirthday, modalTextPersonPhone, 'classRoomTeacher'))
                                    hideChangeTeacherModal()
                                }}>{language.addButton}</Button>
                                <Button color={'#393e46'} onPress={() => hideChangeTeacherModal()}>{language.cancelButton}</Button>
                            </View>

                        </Modal>
                    </Portal>
                </Appbar.Header>
                <View>
                    <ScrollView>
                        {
                            validInput.test(...state.people.classRoomTeacher.fullName) !== true ? <View></View> :
                                <List.Accordion
                                    title={language.classLeader} id="1" style={{ backgroundColor: '#f58b54' }}
                                    titleStyle={{ color: 'white' }}>
                                    <RenderClassRoomTeacher {...state.people.classRoomTeacher} />
                                </ List.Accordion>
                        }
                        <List.Accordion
                            title={language.teacherPeople} id="1"
                            left={() => <RenderCountTypePerson length={filteredTeachersData.length} color={'#e84545'} />}
                            theme={{ colors: { primary: '#393e46', underlineColor: 'transparent' } }}>
                            {
                                filteredTeachersData.length == 0 ?
                                    <View style={{ alignItems: 'center', alignSelf: 'center', marginBottom: 10, marginRight: 50 }}>
                                        <Image style={{ width: 80, height: 80, marginTop: 10, marginRight: 10 }} source={require('../../assets/WriteDownIcon.png')} />
                                        <Text style={{ fontSize: 24, color: 'black' }}>{language.peopleEmptyList}</Text>
                                    </View>
                                    :
                                    filteredTeachersData.map((item, index) => <RenderPerson key={index}  {...item} />)
                            }
                        </ List.Accordion>
                        <List.Accordion title={language.classMattes} id="2"
                            theme={{ colors: { primary: '#393e46', underlineColor: 'transparent' } }}
                            left={() => <RenderCountTypePerson length={filteredClassMateData.length} color={'#beca5c'} />}
                        >
                            {
                                filteredClassMateData.length == 0 ?
                                    <View style={{ alignItems: 'center', alignSelf: 'center', marginBottom: 10, marginRight: 50 }}>
                                        <Image style={{ width: 80, height: 80, marginTop: 10, marginRight: 10 }} source={require('../../assets/WriteDownIcon.png')} />
                                        <Text style={{ fontSize: 24, color: 'black' }}>{language.peopleEmptyList}</Text>
                                    </View>
                                    :
                                    filteredClassMateData.map(item => <RenderPerson key={item.id + item.name} {...item} />)
                            }

                        </ List.Accordion>
                        <Divider style={{ backgroundColor: '#686d76' }} />
                        <List.Accordion title={language.others} id="3"
                            theme={{ colors: { primary: '#393e46', underlineColor: 'transparent' } }}
                            left={() => <RenderCountTypePerson length={filteredOthersData.length} color={'#ffd369'} />}
                        >
                            {
                                filteredOthersData.length == 0 ?
                                    <View style={{ alignItems: 'center', alignSelf: 'center', marginBottom: 10, marginRight: 50 }}>
                                        <Image style={{ width: 80, height: 80, marginTop: 10, marginRight: 10 }} source={require('../../assets/WriteDownIcon.png')} />
                                        <Text style={{ fontSize: 24, color: 'black' }}>{language.peopleEmptyList}</Text>
                                    </View>
                                    :
                                    filteredOthersData.map(item => <RenderPerson key={item.id + item.name} {...item} />)
                            }
                        </ List.Accordion>
                        <Divider style={{ backgroundColor: '#686d76' }} />
                    </ScrollView>
                </View>
            </View>
        </Provider>
    );
}
const styles = StyleSheet.create({
    addPersonModal: {
        width: '85%',
        height: 460,
        backgroundColor: 'white',
        padding: 20,
        marginLeft: '8%',
        borderRadius: 5
    },
    modalTextInput: {
        backgroundColor: 'transparent',
        width: '90%'
    },
    radioButtonGroup: {
        flexDirection: 'row',
        paddingBottom: 10,
    }
})