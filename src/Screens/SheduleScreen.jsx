import React, {useEffect} from 'react';
import { View,Button, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import {Shedule} from '../components/Shedule/Shedule';
import {useDispatch} from 'react-redux'
import { addSubject, loadDays } from '../store/actions/sheduleActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SheduleScreen = ({navigation})=> {
    const _goBack = () => console.log('Went back');
    const _handleSearch = () => console.log('Searching');
    const _handleMore = () => console.log('Shown more');
    const dispach = useDispatch();
    useEffect(()=>{
        dispach(loadDays())
    },[dispach])

   const Add = (dayIndex, titleSubject, teacher, subjectRoom)=> {
     dispach(addSubject(dayIndex, titleSubject, teacher, subjectRoom))
   }
    return ( 
        <View>
          
          <Shedule 
            nav = {{navigation}}
            addSubject = {Add}
          /> 
        </View>
    )
}
const styles = StyleSheet.create({
  backgroundStyle:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})
    