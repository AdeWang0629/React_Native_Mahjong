import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../GameEditScreen/style';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import CList from '../../components/CList';
import Accordion from '../../components/Accordion';
import RateAccordion from '../GameEditScreen/RateAccordion';
import ChipAccordion from '../GameEditScreen/ChipAccordion';
// import NumberPicker from '../../components/NumberPicker';
import NumberPicker from '../../components/NumberPicker(IOS)';
import {CDatePicker} from '../../components/CDatePicker';

import moment from 'moment';
import AlertModal from '../../components/AlertModal';

const firstSource = require('../../../assets/people_plus.png');
const secondSource = require('../../../assets/calculator.png');
const thirdSource = require('../../../assets/database.png');

import { setScore, setChip, setEventDate, setPlayers, setPlayerList } from '../../store/global';
import Button from '../../components/Button';
import { useUpdateGameMutation } from '../../api/gameEditApi';
import { setAlertModalState } from '../../store/global';

const ScoreEditScreen : React.FC = () => {

    const { playerlist, players, scoreRate, chipRate, event_date, alertModalState, currentScore } = useSelector((state:RootState)=>state.global);
    const dispatch = useDispatch();
    const navigation = useNavigation<{[x: string]: any}>();

    useEffect(()=>{

        dispatch(setPlayerList([]));
        dispatch(setScore(currentScore.score * 10));
        dispatch(setChip(currentScore.chip));
        dispatch(setEventDate(currentScore.event_date));
        dispatch(setPlayers(currentScore.players));

    }, [currentScore]);

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

    const [ updateGame ] = useUpdateGameMutation();

    const updateGameList = async () => {

        let playerBody;
        let playerBodyArray = [];

        if (playerlist) {
            if (playerlist.length) {
                playerBody = playerlist.filter((item:any) => item.checked == true);
                playerBodyArray = playerlist.filter((item:any) => item.checked == true);
            } else {
                playerBody = players;
                playerBodyArray = players;
            }
        }


        if(playerBodyArray.length != players.length){

            dispatch(setAlertModalState(!alertModalState));

        }else{
            
            const newPlayerList = playerlist.map((item:any) => item.checked == false);
            // dispatch(setPlayerList(newPlayerList));

            const body = {
                'playerlist' : playerBody,
                'score' : scoreRate,
                'chip' : chipRate,
                'event_date' : event_date
            };

            const param = {
                'id' : currentScore.id,
                'body' : body
            };

            updateGame(param);

            const newCurrentScore = {
                'id' : currentScore.id,
                'players' : playerBody,
                'score' : scoreRate / 10,
                'chip' : chipRate / 1,
                'event_date' : event_date
            };

            navigation.navigate("ScoreScreen", {item: newCurrentScore});

        }
    }

    const [ expandedRate, setExpandedRate ] = useState(false);
    const [ expandedChip, setExpandedChip ] = useState(false);

    return (
        <ScrollView>
            <View style={styles.ContentViewContainer}>

                {/* プレイヤー セクション */}

                <View style={styles.SectionContainer}>

                    <View style={styles.SectionContainerContent}>
                        
                        <CList title={`${(playerlist && playerlist.length) ? playerlist.filter((item)=> item.checked == true).length : (players && players.length)}人選択中`} source={firstSource} action="PlayerChooseScreen" />

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

                    <Button label='保                 存' onPress={updateGameList} bgColor={''}/>
                    
                </View>
            </View>

            <AlertModal modalState={alertModalState} label={`${players.length}人を選択してください。`} />
        
        </ScrollView>
    )
};

export default ScoreEditScreen;