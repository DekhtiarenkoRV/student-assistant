import React, { useState } from 'react'
import { Text, View, StyleSheet, Keyboard, ScrollView } from 'react-native'
import { TextInput, Button, RadioButton } from 'react-native-paper';
export const GeometricCalculators = () => {

    /////////// Triagle square calculator variables

    const [triagleArea, setTriagleArea] = useState(0)
    const [triagleAInput, setTtriagleAInput] = useState('')
    const [triagleHInput, setTtriagleHInput] = useState('')
    const [triagleTypeValue, setTriagleTypeValue] = useState('default');
    const [inputLabelAValue, setInputLabelAValue] = useState('Катет a')
    const [inputLabelBValue, setInputLabelBValue] = useState('Катет b')
    const [disabledInputB, setDisabledInputB] = useState(false)

    const [rombArgA, setRombArgA] = useState('')
    const [rombArgB, setRombArgB] = useState('')
    const [rombArea, setRombArea] = useState(0)

    const [trapezoidArgA, setTraperzoidArgA] = useState('')
    const [trapezoidArgB, setTraperzoidArgB] = useState('')
    const [trapezoidHeight, setTraperzoidHeight] = useState('')
    const [trapezoidSquare, setTrapezoidSquare] = useState(0)

    const [quadrangleArgA, setQuadrangleArgA] = useState('')
    const [quadrangleArgB, setQuadrangleArgB] = useState('')
    const [quadrangleAngle, setQuadrangleAngle] = useState('')
    const [quadrangleSquare, setQuadrangleSquare] = useState(0)

    const changeInputLabel = triagleType => {
        switch (triagleType) {
            case 'rectangular':
                setInputLabelAValue('Катет  a')
                setInputLabelBValue('Катет  b')
                setDisabledInputB(false)
                break
            case 'isosceles':
                setInputLabelAValue('Сторона a')
                setInputLabelBValue('Основа b')
                setDisabledInputB(false)
                break
            case 'equilateral':
                setInputLabelAValue('Сторона  a')
                setInputLabelBValue('Основа b')
                setDisabledInputB(true)
                break
            default:
                console.log('uncorrect triagle type ')
        }
    }
    const calcTriagleSquare = (a, b, triagleType) => {
        switch (triagleType) {
            case 'rectangular':
                setTriagleArea((1 / 2) * a * b)
                break
            case 'isosceles':
                try{
                    setTriagleArea(+(b * Math.sqrt(Math.pow(a, 2) - (Math.pow(b, 2) / 4)) / 2).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0])
                }
                catch{
                    setTriagleArea('Не вірні дані')
                }
                break
            case 'equilateral':
                setTriagleArea(+(((Math.sqrt(3) / 4) * Math.pow(a, 2)).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]))
                break
            default:
                console.log('uncorrect triagle type ')
        }
    }
    const calcTrapezoidSquare = (a,b,h) =>{
        setTrapezoidSquare(1/2 * (a+b) * h)
    }
    const calcQuadrangeSquare = (a,b, angle) => {
        setQuadrangleSquare(1/2 * (a * b * Math.sin(angle)))
    }

    return (
        <ScrollView>
            <View>
                <View style={styles.Section}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.SectionTitle}>Площа трикутників</Text>
                        <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#E74C3C' }}></View>
                    </View>
                    <View>
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={inputLabelAValue}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setTtriagleAInput(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={inputLabelBValue}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setTtriagleHInput(text)
                            }}
                            disabled={disabledInputB}
                            onBlur={() => { Keyboard.dismiss() }}
                        />

                        <RadioButton.Group
                            onValueChange={newValue => {
                                changeInputLabel(newValue)
                                setTriagleTypeValue(newValue)
                            }}
                            value={triagleTypeValue}>
                            <View style={styles.triagleTypeValueRadio}>
                                <View style={styles.triagleTypeValueRadioItem}>
                                    <Text>Прямокутний</Text>
                                    <RadioButton color="red" value="rectangular" />
                                </View>
                                <View style={styles.triagleTypeValueRadioItem}>
                                    <Text>Рівнобедрений</Text>
                                    <RadioButton color="red" value="isosceles" />
                                </View>
                                <View style={styles.triagleTypeValueRadioItem}>
                                    <Text>Рівностороній</Text>
                                    <RadioButton color="red" value="equilateral" />
                                </View>
                            </View>
                        </RadioButton.Group>

                        <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 20, }}> Площа трикутника рівна: {triagleArea} </Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}
                            onPress={() => calcTriagleSquare(triagleAInput, triagleHInput, triagleTypeValue)}>
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
                </View>

                <View style={styles.Section}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.SectionTitle}>Площа ромба</Text>
                        <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#E74C3C' }}></View>
                    </View>
                    <View>
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Висота ромба'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setRombArgA(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Сторона ромба'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setRombArgB(text)
                            }}
                            disabled={disabledInputB}
                            onBlur={() => { Keyboard.dismiss() }}
                        />

                        <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 20, }}> Площа ромбу рівна: {rombArea} </Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}
                            onPress={() => setRombArea(parseInt(rombArgB)*parseInt(rombArgA))}>
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
                </View>

                <View style={styles.Section}>
                    
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.SectionTitle}>Площа трапеції </Text>
                        <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#E74C3C' }}></View>
                    </View>
                    <View>
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Основа трапеції а'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setTraperzoidArgA(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Основа трапеції b'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setTraperzoidArgB(text)
                            }}
                            disabled={disabledInputB}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Висота трапеції '}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setTraperzoidHeight(text)
                            }}
                            disabled={disabledInputB}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 20, }}> Площа трапеції рівна: {trapezoidSquare} </Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}
                            onPress={() => calcTrapezoidSquare(parseInt(trapezoidArgA),parseInt(trapezoidArgB),parseInt(trapezoidHeight))}>
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
                </View>

                <View style={styles.Section}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.SectionTitle}>Площа чотирикутника </Text>
                        <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#E74C3C' }}></View>
                    </View>
                    <View>
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Діагональ d1'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setQuadrangleArgA(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Діагональ d2'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setQuadrangleArgB(text)
                            }}
                            disabled={disabledInputB}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Кут між діагоналями α'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setQuadrangleAngle(text)
                            }}
                            disabled={disabledInputB}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 20, }}> Площа трапеції рівна: {quadrangleSquare} </Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}
                            onPress={() => calcQuadrangeSquare(parseInt(quadrangleArgA),parseInt(quadrangleArgB),parseInt(quadrangleAngle))}>
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
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