import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
    Appbar,
    Divider,
    Modal,
    Portal,
    Provider,
    Button,
    TextInput,
    Menu,
    IconButton,
    Colors,
    Dialog,
    Paragraph,
    RadioButton
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { addHomeWork, doCompletedHomeWork, removeHomeWork } from '../store/actions/homeWorkActions';
import { languages } from '../../languages'

export const HomeWorkScreen = ({ navigation }) => {

    const interfaceLanguage = useSelector(state => state.gradeSystem)
    const selecteLanguage = interfaceLanguage.selectedLanguage
    const language = languages[selecteLanguage].translation

    const state = useSelector(state => state)
    const dispach = useDispatch()

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [visibleDialog, setVisibleDialog] = useState(false)
    const showDialog = () => setVisibleDialog(true);
    const hideDialog = () => setVisibleDialog(false);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const [visibleMenu, setVisibleMenu] = useState(false);
    const openMenu = () => setVisibleMenu(true);
    const closeMenu = () => setVisibleMenu(false);
    const subjects = useSelector(state => state.subjects.map(item => item.item))
    const [selectedSubject, setSelectedSubject] = useState('Виберіть предмет')
    const [selectedComplixity, setSelectedComplixity] = useState('Виберіть складність')
    const [selectedComplixityColor, setSelectedComplixityColor] = useState('gray')
    const [visibleMoreMenu, setVisibleMoreMenu] = useState(false)
    const [visibleMenuComplexity, setMenuVisibleComplexity] = useState(false)
    const [homeWorkTitle, setHomeWorkTitle] = useState('')
    const [homeWorkDescription, setHomeWorkDescription] = useState('')
    const [homeWorkTerm, setHomeWorkTerm] = useState('')
    const [homeWorkSubject, setHomeWorkSubject] = useState('')
    const [isCompletedHomeWork, setIsCompletedHomeWork] = useState(false)
    const [checked, setChecked] = React.useState('first');
    const [sortBy, setSortBy] = useState('default')

    const HomeWorkItem = ({ id, title, description, term, subject, complexity, isCompleted }) => {

        const [visibleDescription, setVisibleDescription] = useState(false)
        const [isCompletedStyle, setIsCompletedStyle] = useState('')
        useEffect(() => {
            isCompleted === true ? setIsCompletedStyle('line-through') : setIsCompletedStyle('none')
        }, [])

        return (
            <View style={{ padding: 15,}}>
                <View style={styles.homeWorksItemTitle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            isCompleted === true ?
                                <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require('../../assets/complete.png')} />
                                : <View></View>
                        }
                        <View style={{ width: '50%' }}>
                            <Text style={{ marginTop: 5, fontSize: 18, color: 'gray', textDecorationLine: isCompletedStyle }}>{title}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setVisibleDescription(!visibleDescription)}>
                            {
                                visibleDescription == false ?
                                    <Image style={{ width: 30, height: 30, marginRight: 10, }} source={require('../../assets/dropDownIcon.png')} />
                                    :
                                    <Image style={{ width: 30, height: 30, marginRight: 10, transform: [{ rotate: '180deg' }] }} source={require('../../assets/dropDownIcon.png')} />
                            }
                        </TouchableOpacity>
                        <IconButton
                            icon={'delete'}
                            color={Colors.grey600}
                            size={30}
                            onPress={showDialog}
                        />

                    </View>
                    <Portal>
                        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
                            <Dialog.Title style={{ color: '#393e46' }}>{language.RemovingSubjectAgreeModalTitle}</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>{language.RemovingHomeWorkAgreeModalDescritpion}</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button color={'#393e46'} onPress={() => dispach(removeHomeWork(id), hideDialog())}>{language.deleteButton}</Button>
                                <Button color={'#393e46'} onPress={hideDialog}>{language.cancelButton}</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>

                {
                    visibleDescription &&
                    <View style={styles.homeWorkItemDescription}>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <Image style={{ width: 20, height: 20, marginTop: 5 }} source={require('../../assets/descriptionItem.png')} />
                            <Text style={{ fontSize: 16, color: 'gray', marginLeft: 10 }}>
                                {
                                    description === '' ? language.notSpecified : description
                                }
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../assets/TheoryIcon.png')} />
                            <Text style={{ fontSize: 16, color: 'gray', marginLeft: 10 }}>
                                {
                                    subject === '' ? language.notSpecified : subject
                                }
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../assets/complexityIcon.png')} />
                            <Text style={{ fontSize: 16, color: complexity.color, marginLeft: 10 }}>
                                {
                                    complexity.complex === '' ? language.notSpecified : complexity.complex
                                }
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                            borderTopWidth: 1,
                            borderColor: '#cdc9c3',
                            marginTop: 20
                        }}>
                            <TouchableOpacity onPress={() => {
                                setIsCompletedHomeWork(!isCompletedHomeWork)
                                dispach(doCompletedHomeWork(id, isCompletedHomeWork))
                            }} style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 16, color: '#61b15a' }}>{language.completeHomeWork}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        )
    }
    return (
        <Provider>
            <View style={styles.wrapper}>

                <Appbar.Header style={{ backgroundColor: 'white', elevation: 0, }}>
                    <Appbar.Action icon='menu' onPress={() => {
                        navigation.toggleDrawer
                        navigation.openDrawer()
                    }} />
                    <Appbar.Content color="#555555" title={language.homeWorkTitle} />
                    <Appbar.Action icon="plus" onPress={showModal} />
                    <View style={{ alignSelf: 'flex-end', marginBottom: 3 }}>
                        <Menu
                            visible={visibleMoreMenu}
                            onDismiss={() => setVisibleMoreMenu(false)}
                            anchor={<Appbar.Action color="black" icon="filter" onPress={() => setVisibleMoreMenu(true)} />}>

                            <TouchableOpacity onPress={() => {
                                setSortBy('default')
                                setChecked('By default')
                            }} style={{ flexDirection: 'row' }}>
                                <RadioButton
                                    value="By default"
                                    status={checked === 'By default' ? 'checked' : 'unchecked'}
                                    color={'gray'}

                                />
                                <Text style={{ alignSelf: 'center', fontSize: 16, color: 'gray', paddingRight: 10 }}>{language.sortingByDefault}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setSortBy('completed')
                                setChecked('Comleted')
                            }} style={{ flexDirection: 'row' }}>
                                <RadioButton
                                    value="Comleted"
                                    status={checked === 'Comleted' ? 'checked' : 'unchecked'}
                                    color={'#61b15a'}
                                />
                                <Text style={{ alignSelf: 'center', fontSize: 16, color: 'gray' }}>{language.sortingByCompleted}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setSortBy('onlyEasy')
                                setChecked('Only easy')
                            }} style={{ flexDirection: 'row' }}>
                                <RadioButton
                                    value="Only ease"
                                    status={checked === 'Only easy' ? 'checked' : 'unchecked'}
                                    color={'#adce74'}

                                />
                                <Text style={{ alignSelf: 'center', fontSize: 16, color: 'gray' }}>{language.firstEasy}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setSortBy('onlyDifFicult')
                                setChecked('Only hard')
                            }} style={{ flexDirection: 'row' }}>
                                <RadioButton
                                    value="Only hard"
                                    status={checked === 'Only hard' ? 'checked' : 'unchecked'}
                                    color={'#e40017'}
                                />
                                <Text style={{ alignSelf: 'center', fontSize: 16, color: 'gray', marginRight: 10 }}>{language.firstComplex}</Text>
                            </TouchableOpacity>
                        </Menu>
                    </View>
                </Appbar.Header>


                <Divider style={{ backgroundColor: 'gray' }} />

                <View style={styles.listOfHomeWorks}>
                    {
                        state.homeWork.homeWorks.length === 0 ?
                            <View style={{ alignItems: 'center', marginTop: '50%' }}>
                                <Text style={{ fontSize: 24, color: 'gray', marginBottom: 20 }}>{language.homeWorkEmtpyList}</Text>
                                <Image source={require('../../assets/empty.png')} />
                            </View>
                            : <View>
                                {
                                    sortBy === 'completed' ? state.homeWork.homeWorks.filter(item => item.isCompleted == true).map((item, index) => <HomeWorkItem key={index} {...item} />)
                                    : sortBy === 'onlyEasy' ? state.homeWork.homeWorks.filter(item => item.complexity.complex === 'Дуже низька' || item.complexity.complex === 'Низька').map((item, index) => <HomeWorkItem key={index} {...item} />)
                                    : sortBy === 'onlyDifFicult' ? state.homeWork.homeWorks.filter(item => item.complexity.complex === 'Висока' || item.complexity.complex === 'Дуже висока').map((item, index) => <HomeWorkItem key={index} {...item} />)
                                    : sortBy === 'default' ? state.homeWork.homeWorks.map((item, index) => <HomeWorkItem key={index} {...item} />)
                                    : state.homeWork.homeWorks.map((item, index) => <HomeWorkItem key={index} {...item} />)
                                }
                            </View>
                    }
                </View>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
                        <ScrollView>
                            <Text style={{ fontSize: 20, color: 'gray', alignSelf: 'center', marginTop: 20 }}>{language.addHomeWorkModalTitle}</Text>
                            <View style={{ marginLeft: 15, marginTop: 20 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: 20, height: 20 }} source={require('../../assets/descriptionItem.png')} />
                                    <TextInput theme={{ colors: { primary: '#393e46', underlineColor: 'transparent', } }} label={language.homeWorkName} style={{
                                        backgroundColor: 'transparent',
                                        width: '80%',
                                        height: 50,
                                        fontSize: 18,
                                        marginLeft: 10
                                    }}
                                        value={homeWorkTitle}
                                        onChangeText={(text) => setHomeWorkTitle(text)} />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: 20, height: 20 }} source={require('../../assets/descriptionItem.png')} />
                                    <TextInput theme={{ colors: { primary: '#393e46', underlineColor: 'transparent', } }} label={language.addDesription} multiline={true} style={styles.inputStyle}
                                        value={homeWorkDescription}
                                        onChangeText={(text) => setHomeWorkDescription(text)} />
                                </View>
                            </View>
                            <Divider style={{ marginTop: 50, backgroundColor: 'gray' }} />
                            <View style={{ marginTop: 20, paddingLeft: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: 20, height: 20 }} source={require('../../assets/TheoryIcon.png')} />
                                    <Menu
                                        visible={visibleMenu}
                                        onDismiss={closeMenu}
                                        anchor={<Button color='gray' onPress={openMenu}>{selectedSubject}</Button>}>

                                        {
                                            subjects.map((item, index) => <Menu.Item key={index} onPress={() => {
                                                setVisibleMenu(false)
                                                setSelectedSubject(item)
                                                setHomeWorkSubject(item)
                                            }} title={item} />)
                                        }
                                    </Menu>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: 20, height: 20 }} source={require('../../assets/complexityIcon.png')} />
                                    <Menu
                                        visible={visibleMenuComplexity}
                                        onDismiss={() => setMenuVisibleComplexity(false)}
                                        anchor={<Button color={selectedComplixityColor} onPress={() => setMenuVisibleComplexity(!visibleMenuComplexity)}>{selectedComplixity}</Button>}>

                                        <Menu.Item onPress={() => { setSelectedComplixity('Дуже низька'), setSelectedComplixityColor('#61b15a'), setMenuVisibleComplexity(false) }} titleStyle={{ color: '#61b15a' }} title='Дуже низька' />
                                        <Menu.Item onPress={() => { setSelectedComplixity('Низька'), setSelectedComplixityColor('#adce74'), setMenuVisibleComplexity(false) }} titleStyle={{ color: '#adce74' }} title='Низька' />
                                        <Menu.Item onPress={() => { setSelectedComplixity('Середня'), setSelectedComplixityColor('#ffd66b'), setMenuVisibleComplexity(false) }} titleStyle={{ color: '#ffd66b' }} title='Середня' />
                                        <Menu.Item onPress={() => { setSelectedComplixity('Висока'), setSelectedComplixityColor('#ff884b'), setMenuVisibleComplexity(false) }} titleStyle={{ color: '#ff884b' }} title='Висока' />
                                        <Menu.Item onPress={() => { setSelectedComplixity('Дуже висока'), setSelectedComplixityColor('#ec4646'), setMenuVisibleComplexity(false) }} titleStyle={{ color: '#ec4646' }} title='Дуже висока' />
                                    </Menu>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 70, marginBottom: 10 }}>
                                <Button color='gray' onPress={() => dispach(addHomeWork(homeWorkTitle, homeWorkDescription, homeWorkTerm, homeWorkSubject, { complex: selectedComplixity, color: selectedComplixityColor }), hideModal())}>{language.addButton}</Button>
                                <Button color='gray'>{language.cancelButton}</Button>
                            </View>
                        </ScrollView>
                    </Modal>
                </Portal>
            </View>
        </Provider>
    );
};
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        height: '100%'
    },
    homeWorksItem: {
        padding: 15,
    },
    homeWorksItemTitle: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    homeWorkItemDescription: {
        width: '100%',
        minHeight: 100,
        backgroundColor: '#eeeeee',
        marginTop: 10,
        padding: 20,

    },
    modalStyle: {
        width: '80%',
        backgroundColor: 'white',
        marginLeft: '10%',
        borderRadius: 10,
    },
    inputStyle: {
        backgroundColor: 'transparent',
        width: '80%',
        marginLeft: 10,
        fontSize: 18,
    }
})