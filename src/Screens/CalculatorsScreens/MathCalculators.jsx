import React, { useState } from 'react'
import { Text, View, StyleSheet, Keyboard } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton, TextInput, Button, Snackbar, Colors } from 'react-native-paper';
export const MathemacticsCalculators = () => {
    console.log('render')
    const [trigonometryFunction, setTrigonometryFunction] = useState('sin');
    const [trigonometryValue, setTrigonometryValue] = useState()
    const [trigonometryResult, setTrigonometryResult] = useState(0)
    const [lcmAndGcfValue, setLcmAndGcfValue] = useState('LCM')
    const [firstNumber, setFirstNumber] = useState(0)
    const [secondNumber, setSecondNumber] = useState(0)
    const [lcmAndGcfResult, setLcmAndGcfResult] = useState(0)
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    const [c, setC] = useState(0)
    const [d, setD] = useState(0)
    const [discriminant, setDiscriminant] = useState(0)
    const [rootOne, setRootOne] = useState(0)
    const [rootTwo, setRootTwo] = useState(0)
    const [fibTextValue, setFibTextValue] = useState('')
    const [fibSequence, setFibSequence] = useState([])
    const [combinatoricCalcResult, setCombinatoricCalcResult] = useState({})
    const [combinatoricArgA, setCombinatoricArgA] = useState('')
    const [combinatoricArgB, setCombinatoricArgB] = useState('')
    const [visible, setVisible] = useState(false)
    const onToggleSnackBar = () => setVisible(!visible)
    const onDismissSnackBar = () => setVisible(false);

    const calcTrigonometricValue = trigFunc => {
        switch (trigFunc) {
            case 'sin':
                setTrigonometryResult((Math.sin(trigonometryValue)).toFixed(4))
                console.log('sin')
                break
            case 'cos':
                setTrigonometryResult((Math.cos(trigonometryValue)).toFixed(4))
                console.log('cos')
                break
            case 'tan':
                setTrigonometryResult((Math.tan(trigonometryValue)).toFixed(4))
                console.log('tan')
                break
            case 'arcsin':
                setTrigonometryResult((Math.asin(trigonometryValue)).toFixed(4))
                console.log('arcsin')
                break
            case 'arccos':
                setTrigonometryResult((Math.acos(trigonometryValue)).toFixed(4))
                console.log('arccos')
                break
            case 'arctan':
                setTrigonometryResult((Math.atan(trigonometryValue)).toFixed(4))
                console.log('arctan')
                break
        }
    }
    const nok = (x, y) => {
        return (x / nod(x, y) | 0) * y;
    }

    const nod = (n, m) => {
        if (m > 0) {
            let k = n % m;
            return nod(m, k);
        }
        else {
            return Math.abs(n);
        }
    }
    const quadraticEquation = (a, b, c) => {
        if (a == 0)
            return false;
        let res = {};
        let D = b * b - 4 * a * c;
        setDiscriminant(D)
        setD(D)
        if (D < 0) {
            setRootOne('Дискримінант меньше нуля, корнів немає')
            setRootTwo('Дискримінант меньше нуля, корнів немає')
            return false;
            res['discriminant'] = D;
        }

        if (D == 0) {
            res["quadratic roots"] = (-b + Math.sqrt(D)) / (2 * a);

        }
        else if (D > 0) {
            let tmp = [];
            tmp.push((-b - Math.sqrt(D)) / (2 * a));
            tmp.push((-b + Math.sqrt(D)) / (2 * a));
            res["quadratic roots"] = tmp;

        }
        setRootOne(res["quadratic roots"][0])
        setRootTwo(res["quadratic roots"][1])
        // console.log(res);
    }
    const calcLCMorGCF = value => {
        switch (value) {
            case 'LCM':
                setLcmAndGcfResult(nok(firstNumber, secondNumber))
                break
            case 'GCF':
                setLcmAndGcfResult(nod(firstNumber, secondNumber))
                break
        }
    }
    const CalcfibSequence = value => {
        const sequence = [0];
        for (let i = 1; i < value + 1; i++) {
            if (i > 1) {
                sequence[i] = sequence[i - 1] + sequence[i - 2];
            } else {
                sequence[i] = 1;
            }
        }
        setFibSequence(sequence)
    }
    const factorial = n => (n != 1) ? n * factorial(n - 1) : 1

    const CalcCombinatoric = (n, k) => {
        if (k > n) {
            onToggleSnackBar()
            return false
        }
        // const permutations = factorial(n)
        // const placements = factorial(n) / factorial(n - k)
        // const combinations = factorial(n) / (factorial(k) *factorial(n-k))
        const result = {
            permutations: factorial(n),
            placements: factorial(n) / factorial(n - k),
            combinations: factorial(n) / (factorial(k) * factorial(n - k))
        }
        setCombinatoricCalcResult(result)
    }
    return (
        <>
            <ScrollView>
                <View>
                    <View style={styles.Section}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.SectionTitle}>Калькулятор тригонометричних функцій</Text>
                            <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#fca311' }}></View>
                        </View>
                        <View style={styles.Trigonometric}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                    label='Введіть число в радіанах'
                                    style={styles.InputStyle}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => {
                                        setTrigonometryValue(text)
                                        console.log(text)
                                    }}
                                    onBlur={() => { Keyboard.dismiss() }}
                                />
                                <Text style={{ marginLeft: 20, fontSize: 24 }}> =  {trigonometryResult} </Text>
                            </View>
                            <RadioButton.Group onValueChange={newValue => { setTrigonometryFunction(newValue), calcTrigonometricValue(newValue) }} value={trigonometryFunction}>
                                <View style={{ flexDirection: 'row', width: '55%', marginTop: 10 }}>
                                    <View style={styles.TrigonometricRadio}>
                                        <Text>Синус</Text>
                                        <RadioButton value="sin" />
                                    </View>
                                    <View style={styles.TrigonometricRadio}>
                                        <Text>Косинус</Text>
                                        <RadioButton value="cos" />
                                    </View>
                                    <View style={styles.TrigonometricRadio}>
                                        <Text>Тангенс</Text>
                                        <RadioButton value="tan" />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', width: '55%', marginTop: 10 }}>
                                    <View style={styles.TrigonometricRadio}>
                                        <Text>Арксинус</Text>
                                        <RadioButton value="arcsin" />
                                    </View>
                                    <View style={styles.TrigonometricRadio}>
                                        <Text>Арккосинус</Text>
                                        <RadioButton value="arccos" />
                                    </View>
                                    <View style={styles.TrigonometricRadio}>
                                        <Text>Арктангенс</Text>
                                        <RadioButton value="arctan" />
                                    </View>
                                </View>
                            </RadioButton.Group>
                        </View>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}
                            onPress={() => calcTrigonometricValue(trigonometryFunction)}>
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
                    <View style={styles.Section}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.SectionTitle}>Спільне кратне НОК і НСД</Text>
                            <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#fca311' }}></View>

                        </View>
                        <View>
                            <View>
                                <TextInput
                                    theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                    label='Введіть перше число'
                                    style={styles.InputStyle}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => {
                                        setFirstNumber(text)
                                    }}
                                    onBlur={() => { Keyboard.dismiss() }}
                                />
                                <TextInput
                                    theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                    label='Введіть друге число'
                                    style={styles.InputStyle}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => {
                                        setSecondNumber(text)
                                    }}
                                    onBlur={() => { Keyboard.dismiss() }}
                                />
                                <Text style={{ fontSize: 18, marginBottom: 10, marginTop: 10, }}>Результат: {lcmAndGcfResult}</Text>
                            </View>

                            <RadioButton.Group onValueChange={newValue => { setLcmAndGcfValue(newValue), calcLCMorGCF(newValue) }} value={lcmAndGcfValue}>
                                <View style={{ flexDirection: 'row', width: '55%', marginTop: 10 }}>
                                    <View style={styles.TrigonometricRadio}>
                                        <Text>НОК</Text>
                                        <RadioButton value="LCM" />
                                    </View>
                                    <View style={styles.TrigonometricRadio}>
                                        <Text>НСД</Text>
                                        <RadioButton value="GCF" />
                                    </View>
                                </View>
                            </RadioButton.Group>
                            <Button
                                mode="contained"
                                style={styles.ButtonStyle}
                                onPress={() => calcLCMorGCF(lcmAndGcfValue)}>
                                <Text style={{ color: 'white' }}>обчислити</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.Section}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.SectionTitle}>Квадратне рівнянняя</Text>
                            <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#fca311' }}></View>

                        </View>
                        <View>
                            <Text style={{ fontSize: 18, marginTop: 20 }}>ax<Text style={{ fontSize: 10 }}>2</Text> + bx + c = 0</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                    label='a'
                                    style={styles.ShortInputStyle}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => {
                                        setA(text)
                                    }}
                                    onBlur={() => { Keyboard.dismiss() }}
                                />
                                <TextInput
                                    theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                    label='b'
                                    style={styles.ShortInputStyle}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => {
                                        setB(text)
                                    }}
                                    onBlur={() => { Keyboard.dismiss() }}
                                />
                                <TextInput
                                    theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                    label='c'
                                    style={styles.ShortInputStyle}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => {
                                        setC(text)
                                    }}
                                    onBlur={() => { Keyboard.dismiss() }}
                                />
                            </View>
                            <Text>Дискримінант: {discriminant}</Text>
                            <Text>x1: {rootOne}</Text>
                            <Text>x2: {rootTwo}</Text>
                            <Button
                                mode="contained"
                                style={styles.ButtonStyle}
                                onPress={() => quadraticEquation(a, b, c)}>
                                <Text style={{ color: 'white' }}>обчислити</Text>
                            </Button>
                        </View>
                    </View>
                </View>

                <View style={styles.Section}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.SectionTitle}>Послідовність Фібоначчі</Text>
                        <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#fca311' }}></View>

                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                label='Введіть n'
                                style={styles.InputStyle}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    setFibTextValue(text)
                                }}
                                onBlur={() => { Keyboard.dismiss() }}
                            />
                        </View>
                        <Text>Послідовність Фібоначчі: {
                            fibSequence.map((item, index) => <Text key={index} style={{ fontWeight: 'bold' }}>{item}  </Text>)}
                        </Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}

                            onPress={() => CalcfibSequence(parseInt(fibTextValue))}>
                            <Text style={{ color: 'white' }}>вычислить</Text>
                        </Button>
                        <Text style={{ marginTop: 10, color: 'red', }}>
                            Для більш стабільної роботи програми не вводите велике n
                    </Text>
                    </View>
                </View>

                <View style={styles.Section}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.SectionTitle}>Комбинаторика</Text>
                        <View style={{ width: '90%', borderBottomWidth: 1, borderColor: '#fca311' }}></View>
                        <Text style={{ marginTop: 10, color: '#fca311', }}>
                            Знаходження числа перестановок, числа розміщень, числа сполучень
                    </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'column' }}>
                            <TextInput
                                theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                label='Введіть n'
                                style={styles.InputStyle}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    setCombinatoricArgA(text)
                                }}
                                onBlur={() => { Keyboard.dismiss() }}
                            />
                            <TextInput
                                theme={{ colors: { primary: '#666666', text: '#666666', placeholder: '#666666' } }}
                                label='Введіть k'
                                style={styles.InputStyle}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    setCombinatoricArgB(text)
                                }}
                                onBlur={() => { Keyboard.dismiss() }}
                            />
                        </View>
                        <Text>Число перестановок з n елементів:{combinatoricCalcResult.permutations}</Text>
                        <Text>Число розміщень з n по k:{combinatoricCalcResult.placements}</Text>
                        <Text>Число сполучень з n по k:{combinatoricCalcResult.combinations}</Text>
                        <Button
                            mode="contained"
                            style={styles.ButtonStyle}

                            onPress={() => CalcCombinatoric(parseInt(combinatoricArgA), parseInt(combinatoricArgB))}>
                            <Text style={{ color: 'white' }}>обчислити</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
            <Snackbar
                visible={visible}
                style={{ backgroundColor: '#f05454', color: 'white', fontSize: 20 }}
                onDismiss={onDismissSnackBar}
                theme={{}}
                duration={3000}>
                k має бути менше n
            </Snackbar>
        </>

    )
}
const styles = StyleSheet.create({
    TrigonometricRadio: {
        width: '40%'
    },
    InputStyle: {
        width: "60%",
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
        backgroundColor: '#fca311'
    },
    Section: {
        borderWidth: 1,
        width: '95%',
        borderRadius: 10,
        marginLeft: 10,
        padding: 20,
        borderColor: '#fca311',
        marginBottom: 20,
    },
    SectionTitle: {
        fontSize: 18,
        marginBottom: 10,
        color: '#556052'
    }
})