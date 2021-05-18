import React,{useState} from 'react';
import { Text, View, StyleSheet, Keyboard, ScrollView } from 'react-native'
import { TextInput, Button, RadioButton } from 'react-native-paper';
export const PhysicCalculatorsScreen = (props) => {
    const [radioValue, setRadioValue] = useState('density');
    const [currentRadioValue, setCurrentRadioValue] = useState('Плотность')
 
    const [densityText, setDensityText] = useState('')
    const [weightText, setWeightText] = useState('')
    const [volumeText, setVolumeText] = useState('')
    const [disabledDensity, setDisabledDensity] = useState(true)
    const [disabledWeight, setDisabledWeight] = useState(false)
    const [disabledVolume, setDisabledVolume] = useState(false)
    const [result, setResult] = useState(0)

    const [fictionCoefRadioValue, setFictionCoefRadioValue] = useState('fictionForce')
    const [fictionForceText, setFictionForceText] = useState('')
    const [fictionWeightText, setFictionWeightText] = useState('')
    const [fictionAngleText, setFictionAngleText] = useState('')
    const [fictionForceDisable, setFictionForceDisable] = useState(false)
    const [fictionWeightDisable, setFictionWeightDisable] = useState(false)
    const [fictionAngleDisable, setFictionAngleDisable] = useState(true)
    const [fictionCoef, setFictionCoef] = useState(0)


    const [timeAfterFlash, setTimeAfterFlash] = useState('')
    const [distanceToLightning, setDistanceToLighting] = useState(0)

    const [weightFirstObject, setWeightFirstObject] = useState('')
    const [weightSecondObject, setWeightSecondObject] = useState('')
    const [distanceBetweenObjects, setDistanceBetweenObjects] = useState('')
    const [forceOfGravity, setForceOfGravity] = useState(0)

    const toFixed = (num, fixed) => {
        const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
        return num.toString().match(re)[0];
    }
    const calcDensity = (density, weight, volume) =>{
        switch (radioValue){
            case 'density':
                setResult(parseInt(weight)/parseInt(volume))
                break
            case 'weight':
                setResult(parseInt(density) * parseInt(volume))
                break
            case 'volume':
                setResult(parseInt(density)/parseInt(weight))
                break
        }
    }
    const calcFictionCoef = (fictionForce, m, angle) => {
        if(fictionCoefRadioValue === 'fictionForce'){
            setFictionCoef(parseFloat(fictionForce/((parseFloat(m)* 1.00))))
        }
        else if(fictionCoefRadioValue === 'angle'){
            setFictionCoef(parseFloat(Math.tan(angle)))
        }
    }
    return (
        <ScrollView>
            <View style={styles.Section}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.SectionTitle}>Маса, об'єм і щільність речовини</Text>
                    <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#59886b' }}></View>
                </View>
                <View>
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Введіть щільність речовини'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            disabled = {disabledDensity}
                            value = {densityText}
                            onChangeText={(text) => {
                                setDensityText(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                         <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Введіть масу, кг'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            disabled = {disabledWeight}
                            value = {weightText}
                            onChangeText={(text) => {
                                setWeightText(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />

                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={"Введіть об'єм"}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            disabled = {disabledVolume}
                            value = {volumeText}
                            onChangeText={(text) => {
                                setVolumeText(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <RadioButton.Group 
                        onValueChange={newValue => {
                            setResult(0)
                            if(newValue === 'density'){
                                setCurrentRadioValue('Плотность')
                                setDisabledDensity(true)
                                setDisabledWeight(false)
                                setDisabledVolume(false)
                            }
                            else if(newValue === 'weight')
                            {
                                setCurrentRadioValue('Масса')
                                setDisabledDensity(false)
                                setDisabledWeight(true)
                                setDisabledVolume(false)
                            }
                            else if(newValue === 'volume'){
                                setCurrentRadioValue('Объем')
                                setDisabledDensity(false)
                                setDisabledWeight(false)
                                setDisabledVolume(true)
                            }
                            setRadioValue(newValue)
                        }} 
                        value={radioValue}>
                            <View style = {styles.RadioButtonGroup}>
                                <View style = {styles.RadioButton}>
                                    <Text>Плотность</Text>
                                    <RadioButton value="density" color="#59886b" uncheckedColor = {'gray'} />
                                </View>
                                <View style = {styles.RadioButton}>
                                    <Text>Масса</Text>
                                    <RadioButton   value="weight" color="#59886b" uncheckedColor = {'gray'} />
                                </View>
                                <View style = {styles.RadioButton}>
                                    <Text>Объем</Text>
                                    <RadioButton value="volume" color="#59886b" uncheckedColor = {'gray'} />
                                </View>
                            </View>
                            
                        </RadioButton.Group>
                        
                        <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 20, }}> 
                        {currentRadioValue}: {result} 
                        </Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}
                            onPress = {() => calcDensity(densityText, weightText, volumeText)}
                            >
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
            </View>

            <View style={styles.Section}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.SectionTitle}>Коефіцієнт тертя</Text>
                    <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#59886b' }}></View>
                </View>
                <View>
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Сила трения F'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            disabled = {fictionForceDisable}
                            value = {fictionForceText}
                            onChangeText={(text) => {
                                setFictionForceText(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                         <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Масса(m)'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            disabled = {fictionWeightDisable}
                            value = {fictionWeightText}
                            onChangeText={(text) => {
                                setFictionWeightText(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />

                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Кут'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            disabled = {fictionAngleDisable}
                            value = {fictionAngleText}
                            onChangeText={(text) => {
                                setFictionAngleText(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <RadioButton.Group 
                        onValueChange={newValue => {
                            if(newValue === 'fictionForce'){
                                setFictionForceDisable(false)
                                setFictionWeightDisable(false)
                                setFictionAngleDisable(true)
                            }
                            else if(newValue === 'angle')
                            {
                                setFictionForceDisable(true)
                                setFictionWeightDisable(true)
                                setFictionAngleDisable(false)
                            }
                            setFictionCoefRadioValue(newValue)
                        }} 
                        value={fictionCoefRadioValue}>
                            <View style = {styles.RadioButtonGroup}>
                                <View style = {styles.RadioButton}>
                                    <Text>Через силу тертя</Text>
                                    <RadioButton value="fictionForce" color="#59886b" uncheckedColor = {'gray'} />
                                </View>
                                <View style = {styles.RadioButton}>
                                    <Text>Через кут</Text>
                                    <RadioButton value="angle" color="#59886b" uncheckedColor = {'gray'} />
                                </View>
                            </View>
                            
                        </RadioButton.Group>
                        
                        <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 20, }}> 
                        Коефіцієнт тертя: {fictionCoef} 
                        </Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}
                            onPress = {() => calcFictionCoef(fictionForceText, fictionWeightText, fictionAngleText)}
                            >
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
            </View>
            <View style={styles.Section}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.SectionTitle}>Відстань до блискавки</Text>
                    <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#59886b' }}></View>
                </View>
                <View>
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={'Час між спалахом і громом'}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            value = {timeAfterFlash}
                            onChangeText={(text) => {
                                setTimeAfterFlash(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 20, }}> 
                        Відстань: ~ {distanceToLightning} кілометри
                        </Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}
                            onPress = {() => setDistanceToLighting((340*parseFloat(timeAfterFlash))/1000)}
                            >
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
            </View>
            <View style={styles.Section}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.SectionTitle}>Сила гравітації</Text>
                    <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#59886b' }}></View>
                </View>
                <View>
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={"Маса об'єкта m1(кг)"}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            value = {weightFirstObject}
                            onChangeText={(text) => {
                                setWeightFirstObject(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={"Маса об'єкта m2 (кг)"}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            value = {weightSecondObject}
                            onChangeText={(text) => {
                                setWeightSecondObject(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <TextInput
                            theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                            label={"Відстань між об'єктами (м)"}
                            style={styles.InputStyle}
                            keyboardType={'numeric'}
                            value = {distanceBetweenObjects}
                            onChangeText={(text) => {
                                setDistanceBetweenObjects(text)
                            }}
                            onBlur={() => { Keyboard.dismiss() }}
                        />
                        <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 20, }}> 
                        Сила гравітаційного тяжіння: {forceOfGravity}
                        </Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}
                            onPress = {() => {
                                const firstObj = parseFloat(weightFirstObject)
                                const secondObj = parseFloat(weightSecondObject)
                                const distance = parseFloat(distanceBetweenObjects)
                                const result = (6.7385*Math.pow(10,-11)) * (firstObj*secondObj) / Math.pow(distance,2)
                                setForceOfGravity(toFixed(result,4))
                            }}
                            >
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    InputStyle: {
        width: "77%",
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
        backgroundColor: '#59886b'
    },
    Section: {
        borderWidth: 1,
        width: '95%',
        borderRadius: 10,
        marginLeft: 10,
        padding: 20,
        borderColor: '#59886b',
        marginBottom: 20,
    },
    SectionTitle: {
        fontSize: 18,
        marginBottom: 10,
        color: '#556052'
    },
    RadioButtonGroup:{
        flexDirection: 'row',
    },
    RadioButton:{
        marginRight: 20,
        alignItems: 'center'
    }
})