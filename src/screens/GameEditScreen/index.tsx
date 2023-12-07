import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import CList from '../../components/CList';
import Accordion from '../../components/Accordion';
import RateAccordion from './RateAccordion';
import ChipAccordion from './ChipAccordion';
// import NumberPicker from '../../components/NumberPicker';
import NumberPicker from '../../components/NumberPicker(IOS)';
import {CDatePicker} from '../../components/CDatePicker';

import moment from 'moment';
import AlertModal from '../../components/AlertModal';

const firstSource = require('../../../assets/people_plus.png');
const secondSource = require('../../../assets/calculator.png');
const thirdSource = require('../../../assets/database.png');

import { setScore, setChip, setEventDate } from '../../store/global';
import Button from '../../components/Button';
import { useCreateGameMutation } from '../../api/gameEditApi';
import { setAlertModalState } from '../../store/global';

const GameEditScreen : React.FC = () => {

    const { playerlist, scoreRate, chipRate, event_date, alertModalState } = useSelector((state:RootState)=>state.global);
    const dispatch = useDispatch();
    const navigation = useNavigation<{[x: string]: any}>();

    useEffect(()=>{
        dispatch(setScore(20));
        dispatch(setChip(5));
    },[]);

    const onScorePickerChange = (value: any) => {
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

        if (playerlist.length > 2) {

            const body = {
                'playerlist' : playerlist,
                'score' : scoreRate,
                'chip' : chipRate,
                'event_date' : event_date
            };

            const result = await createGame(body);

            navigation.navigate('HomeScreen');

        }else{

            dispatch(setAlertModalState(!alertModalState));

        }
    }

    const [ expandedRate, setExpandedRate ] = useState(false);
    const [ expandedChip, setExpandedChip ] = useState(false);

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

                        <RateAccordion title={'レート'} source={secondSource} right_item={`${scoreRate}`} expandedRate={expandedRate} setExpandedRate={setExpandedRate} setExpandedChip={setExpandedChip}>

                            <NumberPicker onPickerChange={onScorePickerChange} initialValue={scoreRate} score={13} />

                        </RateAccordion>

                        <ChipAccordion title={'チップ'} source={thirdSource} right_item={`${chipRate}`} expandedChip={expandedChip} setExpandedRate={setExpandedRate} setExpandedChip={setExpandedChip}>

                            <NumberPicker onPickerChange={onChipPickerChange} initialValue={chipRate} score={11}/>

                        </ChipAccordion>
                    </View>

                </View>

                {/* 付加情報 セクション */}

                <View style={styles.SectionContainer}>

                    <View style={styles.SectionContainerContent}>

                        <Accordion title={'開催日'} source={'date'} right_item={`${event_date}`}>
                            
                            <CDatePicker onChangeDate={onChangeDate} />

                        </Accordion>

                    </View>
                </View>
                
                <View style={styles.center}>

                    <Button label='保                 存' onPress={createGameList} bgColor={''}/>
                    
                </View>
            </View>

            <AlertModal modalState={alertModalState} label={'３人か４人を選択ください。'} />
        </ScrollView>
    )
};

export default GameEditScreen;