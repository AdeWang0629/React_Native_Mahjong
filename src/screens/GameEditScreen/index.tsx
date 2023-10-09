import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from 'react-redux';
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

interface GameEditScreenProps {}

const GameEditScreen : React.FC<GameEditScreenProps> = () => {
    const [ scorePickerValue, setScorePickerValue ] = useState(5);
    const [ chipPickerValue, setChipPickerValue ] = useState(5);

    const navigation = useNavigation<{[x: string]: any}>();
    const {playerlist} = useSelector((state:RootState) => state.global);

    const onScorePickerChange = (value: any) => {
        setScorePickerValue(value);
    }

    const onChipPickerChange = (value: any) => {
        setChipPickerValue(value);
    }

    const [ date, setDate ] = useState<string>(moment(new Date()).format('YYYY/MM/DD'));

    const onChangeDate = (selectedDate: Date) => {
        const formattedDate = moment(selectedDate).format('YYYY/MM/DD');
        setDate(formattedDate);
    };

    return (
        <View style={styles.ContentViewContainer}>

            {/* プレイヤー セクション */}

            <View style={styles.SectionContainer}>

                <View style={styles.SectionContainerHeader}>

                    <Text>
                        プレイヤー
                    </Text>

                </View>

                <View style={styles.SectionContainerContent}>
                    
                    <CList title={`${playerlist.filter((item)=> item.checked == true).length}人選択中`} source={firstSource} action="PlayerChooseScreen" />

                </View>

            </View>
            
            {/* レート セクション */}

            <View style={styles.SectionContainer}>

                <Text style={styles.SectionContainerHeader}>
                    レート
                </Text>

                <View style={styles.SectionContainerContent}>

                    <Accordion title={'スコア'} source={secondSource} right_item={`${scorePickerValue}`} decimal={true}>

                        <NumberPicker onPickerChange={onScorePickerChange} initialValue={scorePickerValue} score={21} />

                    </Accordion>

                    <Accordion title={'チップ'} source={thirdSource} right_item={`${chipPickerValue}`}>

                        <NumberPicker onPickerChange={onChipPickerChange} initialValue={chipPickerValue} score={11}/>

                    </Accordion>
                </View>

            </View>

            {/* 付加情報 セクション */}
            
            <View style={styles.SectionContainer}>

                <Text style={styles.SectionContainerHeader}>
                    付加情報
                </Text>

                <View style={styles.SectionContainerContent}>

                    {/* <CTextInput title={'タイトル'} source={fourthSource} />

                    <CTextInput title={'場所'} source={fifthSource} /> */}

                    <Accordion title={'開催日'} source={sixthSource} right_item={`${date}`}>
                        
                        <CDatePicker onChangeDate={onChangeDate} />

                    </Accordion>

                    {/* <Accordion title={'サムネイル'} source={seventhSource}>
                    </Accordion> */}
                </View>
            </View>
        </View>
    )
};

export default GameEditScreen;