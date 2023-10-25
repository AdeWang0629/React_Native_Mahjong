import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import CList from '../../components/CList';
import Accordion from '../../components/Accordion';
import NumberPicker from '../../components/NumberPicker';
// import CTextInput from '../../components/CTextInput';
import {CDatePicker} from '../../components/CDatePicker';

import moment from 'moment';

const firstSource = require('../../../assets/people_plus.png');
const secondSource = require('../../../assets/calculator.png');
const thirdSource = require('../../../assets/database.png');
// const fourthSource = require('../../../assets/championship.png');
// const fifthSource = require('../../../assets/global.png');
const sixthSource = require('../../../assets/calendar.png');
// const seventhSource = require('../../../assets/image.png');

import { setScore, setChip, setEventDate } from '../../store/global';
import Button from '../../components/Button';
import { useCreateGameMutation } from '../../api/gameEditApi';

const GameEditScreen : React.FC = () => {
    const { playerlist, score, chip, event_date } = useSelector((state:RootState)=>state.global);
    const dispatch = useDispatch();
    console.log("132", typeof(secondSource));
    const navigation = useNavigation<{[x: string]: any}>();

    const onScorePickerChange = (value: any) => {
        console.log(value);
        dispatch(setScore(value));
    }

    const onChipPickerChange = (value: any) => {
        dispatch(setChip(value));
    }

    const onChangeDate = (selectedDate: Date) => {
        const formattedDate = moment(selectedDate).format('YYYY/MM/DD');
        dispatch(setEventDate(formattedDate));
    };

    const [ createGame ] = useCreateGameMutation();

    const createGameList = async () => {
        const body = {
            'playerlist' : playerlist,
            'score' : score,
            'chip' : chip,
            'event_date' : event_date
        };
        
        const result = await createGame(body);

        navigation.navigate('HomeScreen');
    }

    return (
        <ScrollView>
            <View style={styles.ContentViewContainer}>

                {/* プレイヤー セクション */}

                <View style={styles.SectionContainer}>

                    {/* <View style={styles.SectionContainerHeader}>

                        <Text>
                            プレイヤー
                        </Text>

                    </View> */}

                    <View style={styles.SectionContainerContent}>
                        
                        <CList title={`${playerlist ? playerlist.filter((item)=> item.checked == true).length : 0}人選択中`} source={firstSource} action="PlayerChooseScreen" />

                    </View>

                </View>

                {/* レート セクション */}

                <View style={styles.SectionContainer}>

                    {/* <Text style={styles.SectionContainerHeader}>

                        レート

                    </Text> */}

                    <View style={styles.SectionContainerContent}>

                        <Accordion title={'レート'} source={secondSource} right_item={`${score}`} decimal={true}>

                            <NumberPicker onPickerChange={onScorePickerChange} initialValue={score} score={13} />

                        </Accordion>

                        <Accordion title={'チップ'} source={thirdSource} right_item={`${chip}`}>

                            <NumberPicker onPickerChange={onChipPickerChange} initialValue={chip} score={11}/>

                        </Accordion>
                    </View>

                </View>

                {/* 付加情報 セクション */}

                <View style={styles.SectionContainer}>
{/* 
                    <Text style={styles.SectionContainerHeader}>
                        付加情報
                    </Text> */}

                    <View style={styles.SectionContainerContent}>

                        {/* <CTextInput title={'タイトル'} source={fourthSource} />

                        <CTextInput title={'場所'} source={fifthSource} /> */}

                        <Accordion title={'開催日'} source={'date'} right_item={`${event_date}`}>
                            
                            <CDatePicker onChangeDate={onChangeDate} />

                        </Accordion>

                        {/* <Accordion title={'サムネイル'} source={seventhSource}>
                        </Accordion> */}
                    </View>
                </View>
                
                <View style={styles.center}>

                    <Button label='保                 存' onPress={createGameList}/>
                    
                </View>
            </View>

            
        </ScrollView>
    )
};

export default GameEditScreen;