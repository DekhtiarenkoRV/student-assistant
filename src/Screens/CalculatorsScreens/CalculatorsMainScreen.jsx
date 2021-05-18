import React from 'react'
import { Text, Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Divider } from 'react-native-paper';
export const CalculatorsMainScreen = ({ navigation }) => {
    return (
        <View style={{ paddingTop: 20 }} >
            <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 20, }} onPress={() => navigation.navigate('MathemacticsCalculators')}>
                <Image style={{ width: 30, height: 30 }} source={require('../../../assets/mathematicCalcIcon.png')} />
                <Text style={{ fontSize: 20, color: '#fca311', marginLeft: 20, }}>Алгебра</Text>
            </TouchableOpacity>
            <Divider style={{ backgroundColor: '#555555', marginTop: 10 }} />
            <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }} onPress={() => navigation.navigate('GeometricCalculators')}>
                <Image style={{ width: 30, height: 30 }} source={require('../../../assets/geometricCalcIcon.png')} />
                <Text style={{ fontSize: 20, color: '#E74C3C', marginLeft: 20, }}>Геометрія (площа)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}
                onPress={() => navigation.navigate('GeometricVolumes')}>
                <Image style={{ width: 30, height: 30 }} source={require('../../../assets/geometricCalcIcon.png')} />
                <Text style={{ fontSize: 20, color: '#E74C3C', marginLeft: 20, }}>Геометрія (Об`єм)</Text>
            </TouchableOpacity>

            <Divider style={{ backgroundColor: '#555555', marginTop: 10 }} />
            <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}
                onPress={() => navigation.navigate('PhysicCalculatorScreen')}>
                <Image style={{ width: 35, height: 35 }} source={require('../../../assets/physicIcon.png')} />
                <Text style={{ fontSize: 20, color: '#59886b', marginLeft: 20, }}>Фізика</Text>
            </TouchableOpacity>
        </View>


    )
}