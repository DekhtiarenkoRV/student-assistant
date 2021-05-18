import React, { useState, } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { Appbar, BottomNavigation, List } from 'react-native-paper';
import { useSelector } from 'react-redux'
import moment from 'moment';
import { VictoryPie, VictoryPolarAxis, VictoryChart, VictoryArea, } from 'victory-native'
import SelectBox from 'react-native-multi-selectbox'
import { assign, isNull, xorBy } from 'lodash'
import { languages } from '../../languages'
import {theme, colors} from '../../diagramTheme'
export const Overview = ({ navigation }) => {

  const interfaceLanguage = useSelector(state => state.gradeSystem)
  const selecteLanguage = interfaceLanguage.selectedLanguage
  const language = languages[selecteLanguage].translation
  const selectedSystem = useSelector(state => state.gradeSystem.selectedGradeSystem)

  const Subjects = useSelector(state => state.subjects)
  const [selectedSubjects, setSelectedSubject] = useState([])
  const selectedSubjectForChart = selectedSubjects.map(item => (
    {
      x: item.Abbreviation,
      y: item.gradesSum,
      fill: item.color
    }
  ))
  const onMultiChange = () => {
    return (item) => setSelectedSubject(xorBy(selectedSubjects, [item], 'id'))
  }
  const goodSubjects = Subjects.sort((a, b) => b.gradesSum - a.gradesSum).slice(0, 3)
  const badSubjects = Subjects
    .filter(item => item.gradesSum)
    .sort((a, b) => a.gradesSum - b.gradesSum)
    .slice(0, 3)
  const relatedSubjects = []
  const appropriateSubject = goodSubjects.forEach((item, index) => item.relatedProffesions.forEach(item => {
    relatedSubjects.push(item)
  }))

  function generateGoodSubject(item, index) {
    if (item.gradesSum > 0) {
      return (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#cdd0cb'
        }} key={index}>
          <Text style={{ fontSize: 18, color: 'gray' }}>{item.item}</Text>
          <View style={{
            width: 30,
            height: 30,
            backgroundColor: '#2ECC71',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>{item.gradesSum}</Text>
          </View>
        </View>
      )
    }
    else {
      return null
    }

  }
  function generateBadSubject(item, index) {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cdd0cb'
      }} key={index}>
        <Text style={{ fontSize: 18, color: 'gray' }}>{item.item}</Text>
        <View style={{
          width: 30,
          height: 30,
          backgroundColor: '#E74C3C',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100
        }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>{item.gradesSum}</Text>
        </View>
      </View>
    )
  }
  const state = useSelector(state => state.grade.grades)
  const data = Object.entries(state).map(item => item).map(grade => grade[1])
  const grades = []
  data.forEach(item => {
    item.forEach(item => {
      grades.push(item)
    })
  })
  const gradesValues = grades.map(item => item.grade.value).reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
  const chartData = Object.entries(gradesValues).map((item, index) => ({
    y: item[1],
    label: `Оцінка ${item[0]}`,
  }))

  const sumOfExactGrades = Subjects.reduce((acc, current) => {
    if (current.type == 'exact') {
      acc += current.gradesSum
    }
    return acc
  }, 0)
  const sumOfHumanitarian = Subjects.reduce((acc, current) => {
    if (current.type == 'humanitarian') {
      acc += current.gradesSum
    }
    return acc
  }, 0)
  const getAverageOfTypeSubjects = () => {
    return {
      exactsAverage: +(sumOfExactGrades / Subjects.filter(item => item.type == "exact").length).toFixed(1),
      humanitarianAverage: +(sumOfHumanitarian / Subjects.filter(item => item.type == "humanitarian").length).toFixed(1)
    }
  }
  

  function returnMustIncreaseGrades() {
    if (selectedSystem === 0) {
      return [...grades.filter(item => item.grade.value > 5 && item.grade.value < 12)]
    }
    else if (selectedSystem === 1) {
      return [...grades.filter(item => item.grade.value > 3 && item.grade.value < 5)]
    }
    else if (selectedSystem === 2) {
      return [...grades.filter(item => item.grade.value > 59 && item.grade.value < 90)]
    }
  }
  function returnUrgentIncreaseGrades() {
    if (selectedSystem === 0) {
      return [...grades.filter(item => item.grade.value < 6)]
    }
    else if (selectedSystem === 1) {
      return [...grades.filter(item => item.grade.value < 3)]
    }
    else if (selectedSystem === 2) {
      return [...grades.filter(item => item.grade.value < 60)]
    }
  }
  function renderMustIncreaseGradesBlock(item, index) {
    return (
      <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10, alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', width: 250 }}>{item.description}</Text>
          <Text style={{ fontSize: 16 }}>{moment(item.date).format('DD MMMM YYYY').toString()}</Text>
          <Text style={{ fontSize: 14, marginTop: 10 }}>{item.subject}</Text>
        </View>
        <View style={{
          width: 30,
          height: 30,
          backgroundColor: '#F1C40F',
          borderRadius: 30,
          marginRight: 30,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>{item.grade.value}</Text>
        </View>
      </View>
    )
  }
  function renderUrgentIncreaseGradesBlock(item, index) {
    return (
      <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10, alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', width: 250 }}>{item.description}</Text>
          <Text style={{ fontSize: 16 }}>{moment(item.date).format('DD MMMM YYYY').toString()}</Text>
          <Text style={{ fontSize: 14, marginTop: 10 }}>{item.subject}</Text>
        </View>
        <View style={{
          width: 30,
          height: 30,
          backgroundColor: '#E74C3C',
          borderRadius: 30,
          marginRight: 30,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>{item.grade.value}</Text>
        </View>
      </View>
    )
  }
  function renderColorsGradesChartsLabel(item, index) {
    return (
      <View key={index}
        style={{ backgroundColor: colors[index], width: 20, height: 20, marginRight: 20, borderRadius: 20 }}></View>
    )
  }
  function renderTextGradesChartsLabel(item, index) {
    return (
      <Text key={index}
        style={{ fontSize: 14, marginRight: 20, color: 'gray', marginTop: 10 }}>Кіл-сть
        <Text style={{ fontWeight: 'bold' }}> {item.y}</Text>
      </Text>
    )
  }
  function GenerateProfession(item, index) {
    return (
      <View key={index} style={{
        width: '85%',
        margin: 30,
      }}>
        <View style={{ width: '100%', height: 200 }}>
          <Image style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }} source={item.image} />
        </View>
        <View>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', margin: 20 }}>{selecteLanguage === 0? item.name : item.nameEng}</Text>
          <Text style={{ textAlign: 'center', lineHeight: 20 }}>{selecteLanguage === 0? item.description : item.descriptionEng}</Text>
        </View>
      </View>
    )
  }
  const Grades = () => {
    if (grades.length === 0) {
      return (
        <View style={{ justifyContent: 'center', height: '100%' }}>
          <Text style={{ textAlign: 'center', color: 'gray' }}>{language.chooseSubjectForReflection}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Grades')}>
            <Image style={{ alignSelf: 'center', marginTop: 20 }} source={require('../../assets/plus.png')} />
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <ScrollView>
        {
          selectedSystem === 2 ?
            <View style={{ padding: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{language.canImprovedGrades}</Text>
              {
                returnMustIncreaseGrades().length === 0 ?
                  <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 40 }}>{language.empyGradeList}</Text>
                  :
                  returnMustIncreaseGrades().map(renderMustIncreaseGradesBlock)
              }
              <Text style={{ fontSize: 18, marginTop: 20, fontWeight: 'bold' }}>{language.mustImprovedGrades}</Text>
              {
                returnUrgentIncreaseGrades().length === 0 ?
                  <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 40 }}>{language.empyGradeList}</Text>
                  :
                  returnUrgentIncreaseGrades().map(renderUrgentIncreaseGradesBlock)
              }
            </View>

            :
            <View>
              <List.Accordion
                title={language.canImprovedGrades}
                titleStyle={{ fontSize: 19, color: 'white' }}
                left={props => <Image style={{ width: 35, height: 35, marginRight: 10 }} source={require('../../assets/attention.png')} />}
                style={{ backgroundColor: '#F1C40F', margin: 5, borderRadius: 10, }}>
                {
                  <View style={{ height: 185, borderWidth: 1, borderColor: '#F1C40F', margin: 10, borderRadius: 10 }}>
                    <ScrollView nestedScrollEnabled={true}>
                      {
                        returnMustIncreaseGrades().map(renderMustIncreaseGradesBlock)
                      }
                    </ScrollView>
                  </View>
                }
              </List.Accordion>

              <List.Accordion
                title={language.mustImprovedGrades}
                titleStyle={{ fontSize: 19, color: 'white' }}
                left={props => <Image style={{ width: 35, height: 35, marginRight: 10 }} source={require('../../assets/attention.png')} />}
                style={{ backgroundColor: '#E74C3C', margin: 5, borderRadius: 10, }}>
                {<View style={{ height: 185, borderWidth: 1, borderColor: '#E74C3C', margin: 10, borderRadius: 10 }}>
                  <ScrollView nestedScrollEnabled={true}>
                    {
                      returnUrgentIncreaseGrades().map(renderUrgentIncreaseGradesBlock)
                    }
                  </ScrollView>
                </View>
                }
              </List.Accordion>
              <View style={{ marginLeft: 10 }}>
                <VictoryPie
                  colorScale={colors}
                  data={chartData}
                  radius={100}
                  labels={({ datum }) => datum.y}
                  style={{ labels: { fill: "gray", fontSize: 18 } }}
                  innerRadius={70}
                />
                {
                  selectedSystem === 1 ?
                    <View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        {
                          chartData.map(renderColorsGradesChartsLabel)
                        }
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: 5, flexWrap: 'wrap' }}>
                        {
                          chartData.map(renderTextGradesChartsLabel)
                        }
                      </View>
                    </View>
                    :
                    null
                }
              </View>
            </View>
        }
      </ScrollView>
    )
  }
  const SubjectsInfo = () => {
    return (
      <View style={{ height: 600 }}>
        <SelectBox
          label={language.chooseSubjectForReflection}
          options={Subjects}
          inputPlaceholder='Вибрати предмет'
          selectedValues={selectedSubjects}
          onMultiSelect={onMultiChange()}
          onTapClose={onMultiChange()}
          multiOptionContainerStyle={{ backgroundColor: '#5b8a72' }}
          arrowIconColor='#5b8a72'
          hideInputFilter={true}
          containerStyle={{
            padding: 20,
            marginTop: 20,

          }}
          labelStyle={{
            fontSize: 18,
            marginLeft: 20,
            marginTop: 20

          }}
          optionContainerStyle={{
            marginTop: 20,
            color: 'white',
            padding: 30,
          }}
          toggleIconColor='#5b8a72'
          isMulti
        />
        <ScrollView style={{ flexDirection: 'column' }}>
          <View style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: 35, height: 35, alignSelf: 'center' }} source={require('../../assets/question.png')} />
            <Text style={{ padding: 20, marginLeft: 10, fontSize: 16, color: 'gray' }}>
             {language.chartDesctiption}
            </Text>
          </View>
          {
            selectedSubjects.length < 3 ?
              <View style={{
                height: 250,
                backgroundColor: '#5b8a72',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
                borderRadius: 10
              }}>
                <View style={{ justifyContent: 'center', height: '100%' }}>
                  <Text style={{ textAlign: 'center', color: 'white' }}>{language.addSubjectsForReflection}</Text>
                </View>
              </View>
              :
              <ScrollView
                horizontal={true}
                style={{ backgroundColor: '#5b8a72', borderWidth: 1, borderRadius: 10, margin: 10 }}>
                <ScrollView horizontal={true} style={{ width: 600 }}>
                  <VictoryChart polar
                    height={400}
                    theme={theme}>
                    <VictoryPolarAxis dependentAxis
                      axisAngle={90}
                      style={{
                        axis: { stroke: "none", },
                        grid: { stroke: 'white', strokeDasharray: '1' },
                        tickLabels: { fill: 'white' },
                      }}
                      tickFormat={(t) => `${Math.round(t)}`}
                    />
                    <VictoryPolarAxis />
                    <VictoryArea
                      interpolation="cardinal"
                      data={selectedSubjectForChart}
                      style={{
                        data: {
                          fillOpacity: 0.7, strokeWidth: 1, lineTension: 0.4, fill: '#bfcba8',
                        },
                      }}
                    />
                  </VictoryChart>
                </ScrollView>

              </ScrollView>
          }
          <View style={{ margin: 10 }}>
            <Text style={{ fontSize: 18, color: 'gray', marginTop: 10, marginBottom: 20, textAlign: 'center' }}>{language.arithmeticMean}</Text>
            <View style={{ backgroundColor: '#2ECC71', padding: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 10 }}>
              <Image style={{ width: 35, height: 35, marginRight: 10 }} source={require('../../assets/like.png')} />
              <Text style={{ fontSize: 18, color: 'white' }}>{language.topThreeLargest}</Text>
            </View>

            <ScrollView>
              {
                goodSubjects.map(generateGoodSubject)
              }
            </ScrollView>
          </View>
          <View style={{ margin: 10 }}>
            <View style={{ backgroundColor: '#E74C3C', padding: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 10 }}>
              <Image style={{ width: 35, height: 35, marginRight: 10 }} source={require('../../assets/dislike.png')} />
              <Text style={{ fontSize: 18, color: 'white' }}>{language.topThreeSmallest}</Text>
            </View>
            <ScrollView>
              {
                badSubjects.map(generateBadSubject)
              }
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
  const Mentality = () => {
    if (grades.length === 0) {
      return (
        <View>
          <View style={{ justifyContent: 'center', height: '100%' }}>
            <Text style={{ textAlign: 'center', color: 'gray' }}>{language.addSubjectsForReflection}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Grades')}>
              <Image style={{ alignSelf: 'center', marginTop: 20 }} source={require('../../assets/plus.png')} />
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return (
      <ScrollView>
        <View>
          <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 20 }}>{language.compositionOfMind}</Text>
          <VictoryPie
            innerRadius={35}
            labels={({ datum }) => `${datum.x} \n \n ${datum.y}% \t`}
            labelRadius={({ innerRadius }) => innerRadius + 20}
            style={{
              data: {
                fill: ({ datum }) => datum.fill,
                stroke: "white", strokeWidth: 3
              },
              labels: { fill: "white", fontSize: 14, fontWeight: "bold", margin: 10 }
            }}
            data={[
              { x: language.humanitarian, y: getAverageOfTypeSubjects().humanitarianAverage, fill: '#00587a' },
              { x: language.analytical, y: getAverageOfTypeSubjects().exactsAverage, fill: '#312c51' },
            ]}
          />
        </View>

        <View>
          {

            getAverageOfTypeSubjects().exactsAverage > getAverageOfTypeSubjects().humanitarianAverage ?
              <ImageBackground
                style={{ width: null, height: 300, margin: 20, padding: 10, resizeMode: 'cover' }}
                imageStyle={{ borderRadius: 10 }}
                source={require('../../assets/brain.jpeg')} >
                <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>{language.haveAnaliticalMind}</Text>
                <ScrollView nestedScrollEnabled={true} >
                  <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', lineHeight: 25, marginTop: 40 }}>
                    {
                      language.analyticalMind
                    }
                      </Text>
                </ScrollView>

              </ImageBackground>
              : getAverageOfTypeSubjects().exactsAverage < getAverageOfTypeSubjects().humanitarianAverage ?
                <ImageBackground
                  style={{ width: null, height: 300, margin: 20, padding: 10, resizeMode: 'cover' }}
                  imageStyle={{ borderRadius: 10 }}
                  source={require('../../assets/brain.jpeg')} >
                  <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>{language.haveHumanitarianMind}</Text>
                  <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', lineHeight: 25, marginTop: 40 }}>
                 {
                   language.humanitarianMind
                 }
                    </Text>
                </ImageBackground>
                : <ImageBackground
                  style={{ width: null, height: 300, margin: 20, padding: 10, resizeMode: 'cover' }}
                  imageStyle={{ borderRadius: 10 }}
                  source={require('../../assets/brain.jpeg')} >
                  <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>{language.haveMiddleMind}</Text>
                  <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', lineHeight: 25, marginTop: 40 }}>
                  {
                    language.middleMind
                  }
                    </Text>
                </ImageBackground>
          }
          <Text style={{ fontSize: 18, textAlign: "center", marginTop: 20 }}>{language.proffesions}</Text>
          <View>
            {
              relatedSubjects.map(GenerateProfession)
            }
          </View>
        </View>

      </ScrollView>
    )
  }
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'grades', title: language.gradesTitle, icon: 'axis', color: '#c15050' },
    { key: 'subjects', title: language.subjectTitle, icon: 'book', color: '#5b8a72' },
    { key: 'mentality', title: language.compositionOfMind, icon: 'brain', color: '#27496d' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    grades: Grades,
    subjects: SubjectsInfo,
    mentality: Mentality,
  })
  return (
    <>
      <Appbar.Header style={styles.headerStyle} >
        <Appbar.Action icon='menu' onPress={() => {
          navigation.toggleDrawer
          navigation.openDrawer()
        }} />
        <Appbar.Content title={language.progressTitle} />
      </Appbar.Header>
      <BottomNavigation
        shifting={true}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        sceneAnimationEnabled={true}
      />
    </>
  );
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'transparent',
    elevation: 0
  },
  chart: {
    flex: 1
  }
})
