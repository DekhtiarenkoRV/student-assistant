import React from 'react';
import { SheduleScreen } from './src/Screens/SheduleScreen';
import { LessonScreen } from './src/Screens/LessonScreen';
import { LessonTimeScreen } from './src/Screens/LessonTimeScreen';
import { AddSubjectScreen } from './src/Screens/AddSubjectScreen';
import { SettingsScreen } from './src/Screens/SettingsScreen'
import { MathemacticsCalculators } from './src/Screens/CalculatorsScreens/MathCalculators'
import { GeometricCalculators } from './src/Screens/CalculatorsScreens/GeometricCalculatorsScreen'
import { CalculatorsMainScreen } from './src/Screens/CalculatorsScreens/CalculatorsMainScreen'
import { HomeWorkScreen } from './src/Screens/HomeWorkScreen'
import AttendanceMainScreen from './src/Screens/AttendanceMainScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { Image, ImageBackground, View } from 'react-native'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import { GeometricCalcVolumes } from './src/Screens/CalculatorsScreens/GeometricCalcVolumes'
import { PhysicCalculatorsScreen } from './src/Screens/CalculatorsScreens/PhysicCalculatorsScreen'
import { Overview } from './src/Screens/SuccessScreen';
import PeopleScreen from './src/Screens/PeopleScreen'
import { GradesScreen } from './src/Screens/GradesScreen';
import { SubjectsScreen } from './src/Screens/SubjectsScreen'
import { useSelector } from 'react-redux'
import { languages } from './languages'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()
export const Menu = () => {
    const interfaceLanguage = useSelector(state => state.gradeSystem)
    const selecteLanguage = interfaceLanguage.selectedLanguage
    const language = languages[selecteLanguage].translation
    const MainStackNavigator = () => {
        return (
            <Stack.Navigator initialRouteName='SheduleScreen'>
                <Stack.Screen name="SheduleScreen" component={SheduleScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="SubjectScreen" component={LessonScreen} options={{
                    title: language.subject,
                    headerStyle: {
                        backgroundColor: 'white',
                        elevation: 0,
                        shadowOpacity: 0
                    },
                    headerTintColor: '#666666',
                    headerTitleStyle: {
                        fontSize: 24,
                    },
                }} />
                <Stack.Screen name="AddSubjectScreen" component={AddSubjectScreen} options={{
                    title: language.addSubjectScreenTitle,
                    headerStyle: {
                        backgroundColor: 'white',
                        elevation: 0,
                        shadowOpacity: 0
                    },
                    headerTintColor: '#666666',
                    headerTitleStyle: {
                        fontSize: 24,
                    },
                }} />
            </Stack.Navigator>
        )
    }
    const CalculatorsMainScreenNavigator = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="CalculatorMainScreen" component={CalculatorsMainScreen} options={{
                    title: language.Calculators,
                    headerStyle: {
                        backgroundColor: '#eeeded',
                        elevation: 0,
                        shadowOpacity: 0
                    },
                    headerTintColor: '#556052',
                    headerTitleStyle: {
                        fontSize: 24,
                    }
                }} />
                <Stack.Screen name="MathemacticsCalculators" component={MathemacticsCalculators} options={{
                    title: language.mathCalc,
                    headerStyle: {
                        backgroundColor: '#eeeded',
                        elevation: 0,
                        shadowOpacity: 0
                    },
                    headerTintColor: '#556052',
                    headerTitleStyle: {
                        fontSize: 18,
                    }
                }} />
                <Stack.Screen name="GeometricCalculators" component={GeometricCalculators} options={{
                    title: language.geoCalculators,
                    headerStyle: {
                        backgroundColor: '#eeeded',
                        elevation: 0,
                        shadowOpacity: 0
                    },
                    headerTintColor: '#556052',
                    headerTitleStyle: {
                        fontSize: 18,
                    }
                }} />
                <Stack.Screen name="GeometricVolumes" component={GeometricCalcVolumes} options={{
                    title: language.geoCalculators,
                    headerStyle: {
                        backgroundColor: '#eeeded',
                        elevation: 0,
                        shadowOpacity: 0
                    },
                    headerTintColor: '#556052',
                    headerTitleStyle: {
                        fontSize: 18,
                    }
                }} />
                <Stack.Screen name="PhysicCalculatorScreen" component={PhysicCalculatorsScreen} options={{
                    title: language.physCals,
                    headerStyle: {
                        backgroundColor: '#eeeded',
                        elevation: 0,
                        shadowOpacity: 0
                    },
                    headerTintColor: '#556052',
                    headerTitleStyle: {
                        fontSize: 18,
                    }
                }} />
            </Stack.Navigator>
        )
    }
    const CustomDrawer = (props) => {
        return (
            <View>
                <ImageBackground style={{
                    width: '100%',
                    height: 180,
                    marginBottom: 20
                }} source={require('./assets/DrawerBackgroundHeader.jpg')} >

                </ImageBackground>
                <DrawerItemList {...props} />
            </View>
        )
    }
    const MainDrawerNavigator = () => {
        return (
            <Drawer.Navigator
                drawerStyle={{
                    backgroundColor: 'white',
                    borderBottomRightRadius: 20,
                }}
                drawerContent={props => CustomDrawer(props)}
                drawerContentOptions={{
                    activeTintColor: 'white',
                    activeBackgroundColor: '#adb5bd',
                    inactiveTintColor: '#6c757d',
                    labelStyle: {
                        fontSize: 16
                    }
                }}>
                <Drawer.Screen name='Shedule' component={MainStackNavigator} options={{
                    title: language.Shedule,
                    drawerIcon: ({ focused, size }) => (
                        <Image style={{ width: 20, height: 20 }} source={require('./assets/DrawerSheduleIcon.png')} />
                    )
                }} />
                <Drawer.Screen name='Grades' component={GradesScreen} options={{
                    title: language.Grades,
                    drawerIcon: ({ focused, size }) => (
                        <Image style={{ width: 20, height: 20 }} source={require('./assets/grade.png')} />
                    )
                }} />
                <Drawer.Screen name='HomeWork' component={HomeWorkScreen} options={{
                    title: language.HomeWork,
                    drawerIcon: ({ focused, size }) => (
                        <Image style={{ width: 20, height: 20 }} source={require('./assets/TheoryIcon.png')} />
                    )
                }} />
                <Drawer.Screen name='LessonTime' component={LessonTimeScreen} options={{
                    title: language.Timer,
                    drawerIcon: ({ focused, size }) => (
                        <Image style={{ width: 20, height: 20 }} source={require('./assets/TimerIcon.png')} />
                    )
                }} />
                <Drawer.Screen name='AttendanceScreen' component={AttendanceMainScreen} options={{
                    title: language.Attendance,
                    drawerIcon: ({ focused, size }) => (
                        <Image style={{ width: 20, height: 20 }} source={require('./assets/visitIcon.png')} />
                    )
                }} />
                <Drawer.Screen name='Overview' component={Overview} options={{
                    title: language.Progress,
                    drawerIcon: ({ focused, size }) => (
                        <Image style={{ width: 20, height: 20 }} source={require('./assets/progress.png')} />
                    )
                }} />
                <Drawer.Screen name='Subjects' component={SubjectsScreen} options={{
                    title: language.Subjects,
                    drawerIcon: ({ focused, size }) => (
                        <Image style={{ width: 20, height: 20 }} source={require('./assets/books.png')} />
                    )
                }} />
                <Drawer.Screen name='People' component={PeopleScreen} options={{
                    title: language.People,
                    drawerIcon: ({ focused, size }) => (
                        <Image style={{ width: 20, height: 20 }} source={require('./assets/people.png')} />
                    )
                }} />
                <Drawer.Screen name='СalculatorsScreen' component={CalculatorsMainScreenNavigator} options={{
                    title: language.Calculators,
                    drawerIcon: ({ focused, size }) => (
                        <Image style={{ width: 20, height: 20 }} source={require('./assets/calculatorsDrawerIcon.png')} />
                    )
                }} />
                <Drawer.Screen name='SettingsScreen' component={SettingsScreen} options={{
                    title: language.Settings,
                    drawerIcon: ({ focused, size }) => (
                        <Image style={{ width: 20, height: 20 }} source={require('./assets/settings.png')} />
                    )
                }} />
            </Drawer.Navigator>
        )
    }
    return <MainDrawerNavigator />
}