import React, {useState} from 'react';
import { Text, View, StyleSheet, Keyboard, ScrollView } from 'react-native'
import { TextInput, Button, RadioButton } from 'react-native-paper';
export const GeometricCalcVolumes = () =>{

    const [pyramidArgA, setPyramidArgA] = useState('')
    const [pyramidArgB, setPyramidArgB] = useState('')
    const [pyramidVolume, setPyramidVolume] = useState(0)

    const [cubeArgA, setCubeArgA] = useState('')
    const [cubeVolume, setCubeVolume] = useState(0)

    const [cylinderArgA, setCylinderArgAArgA] = useState('')
    const [cylinderArgB, setCylinderArgB] = useState('')
    const [cylinderArgAVolume, setCylinderVolume] = useState(0)

    const [truncatedСoneArgA, setTruncatedСoneArgA] = useState('')
    const [truncatedСoneArgB, setTruncatedСoneArgB] = useState('')
    const [truncatedСoneArgC, setTruncatedСoneArgC] = useState('')
    const [truncatedConeVolume, setTruncatedConeVolume] = useState(0)

    const calcTruncatedConeVolume = (oneArg,twoArg,threeArg) => {
        const a = parseInt(oneArg),
              b = parseInt(twoArg),
              c = parseInt(threeArg)
        setTruncatedConeVolume(1/3 * 3.14 * c *(Math.pow(a,2)+a * b + Math.pow(b,2)))
            console.log(truncatedConeVolume)

    }
    return (
        <ScrollView>
            <View style={styles.Section}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.SectionTitle}>Об'єм піраміди</Text>
                        <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#E74C3C' }}></View>
                    </View>
                    <View>
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Площа основи піраміди S'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setPyramidArgA(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Висота піраміди h'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setPyramidArgB(text)
                            }}

                            onBlur={() => { Keyboard.dismiss() }}
                        />      
                        <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 20, }}> Об'єм піраміди дорівнює: {pyramidVolume} </Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}
                            onPress={() => setPyramidVolume(1/3 * (parseInt(pyramidArgA) * parseInt(pyramidArgB)))}
                            >
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
                </View>
                <View style={styles.Section}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.SectionTitle}>Об'єм куба</Text>
                        <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#E74C3C' }}></View>
                    </View>
                    <View>
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Довжина ребра'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setCubeArgA(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />

                        
                        <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 20, }}> Об'єм куба : {cubeVolume} </Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}
                            onPress={() => setCubeVolume(Math.pow(parseInt(cubeArgA),3))}
                            >
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
                </View>

                <View style={styles.Section}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.SectionTitle}>Об'єм циліндра</Text>
                        <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#E74C3C' }}></View>
                    </View>
                    <View>
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Площа основи S'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setCylinderArgAArgA(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                         <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Висота циліндра h'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setCylinderArgB(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 20, }}> Об'єм циліндра : {cylinderArgAVolume} </Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}
                            onPress={() => setCylinderVolume(parseInt(cylinderArgA)*parseInt(cylinderArgB))}
                            >
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
                </View>
                <View style={styles.Section}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.SectionTitle}>Об'єм усіченого конуса</Text>
                        <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#E74C3C' }}></View>
                    </View>
                    <View>
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Радіус нижньої основи r1'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setTruncatedСoneArgA(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                         <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Радіус верхньої основи r2'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setTruncatedСoneArgB(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />

                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Висота h'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setTruncatedСoneArgC(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 20, }}> Об'єм усіченого конуса : {truncatedConeVolume} </Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}
                            onPress={() => 
                                calcTruncatedConeVolume(truncatedСoneArgA,truncatedСoneArgB,truncatedСoneArgC)}
                            >
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
                </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    InputStyle: {
        width: "70%",
        height: 50,
        backgroundColor: 'transparent',
        color: 'white',
        marginTop: 20,
        marginBottom: 20,
    },
    ShortInputStyle: {
        width: "10%",
        height: 50,
        backgroundColor: 'transparent',
        color: 'white',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
    },
    ButtonStyle: {
        width: 130,
        marginTop: 20,
        backgroundColor: '#E74C3C'
    },
    Section: {
        borderWidth: 1,
        width: '95%',
        borderRadius: 10,
        marginLeft: 10,
        padding: 20,
        borderColor: '#E74C3C',
        marginBottom: 20,
    },
    SectionTitle: {
        fontSize: 18,
        marginBottom: 10,
        color: '#556052'
    },
    triagleTypeValueRadio: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    triagleTypeValueRadioItem: {
        alignItems: 'center',
    }
})