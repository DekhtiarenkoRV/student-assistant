import React, { Component } from 'react';
import {View, ScrollView, Dimensions, Button } from 'react-native';
import { Day } from './Day';
import { useSelector } from 'react-redux'
export const Shedule = ({ nav }) => {
    const navig = nav.navigation
    const days = useSelector(state => state.shedule.week)
    return (
        <View style={{
            height: Dimensions.get('window').height,
        }}>
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
            >
                {
                    days.map((item, index) => {
                        return (
                            <Day
                                key={index + 1}
                                Daydata={item}
                                nav={navig}
                            />
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

