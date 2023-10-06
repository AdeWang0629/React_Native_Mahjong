import React, { ReactElement, useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

import { StackNavigationProp } from "@react-navigation/stack";

import Accordion from '../../components/Accordion';
import NumberPicker from '../../components/NumberPicker';

type RootStackParamList = {
    Details: undefined;
}

type GameEditScreenNavigationProp = StackNavigationProp<RootStackParamList,'Details'>;


const GameEditScreen = () => {
    const [ scorePickerValue, setScorePickerValue ] = useState(0);
    const [ chipPickerValue, setChipPickerValue ] = useState(0);

    // const navigation = useNavigation<{[x: string]: any}>();
    const navigation = useNavigation<GameEditScreenNavigationProp>();

    const handlePress = () => {
        console.log('asdf');
        navigation.navigate('Details');
    }

    const firstSource = require('../../../assets/people_plus.png');
    const secondSource = require('../../../assets/calculator.png');
    const thirdSource = require('../../../assets/database.png');
    const fourthSource = require('../../../assets/championship.png');
    const fifthSource = require('../../../assets/global.png');
    const sixthSource = require('../../../assets/calendar.png');
    const seventhSource = require('../../../assets/image.png');

    const onScorePickerChange = (value: any) => {
        setScorePickerValue(value);
    }

    const onChipPickerChange = (value: any) => {
        setChipPickerValue(value);
    }

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
                    <Accordion title={'0人選択中'} source={firstSource} right_item={'chevron-right'} action="PlayerChooseScreen">
                    </Accordion>
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
                    <Accordion title={'タイトル'} source={fourthSource}>
                        <Text style={styles.textSmall}>
                            React Native lets you create truly native apps and
                            doesn't compromise your users' experiences. It provides a core set of platform
                            agnostic native components 
                        </Text>
                    </Accordion>

                    <Accordion title={'場所'} source={fifthSource}>
                        <Text style={styles.textSmall}>
                            React Native lets you create truly native apps and
                            doesn't compromise your users' experiences. It provides a core set of platform
                            agnostic native components 
                        </Text>
                    </Accordion>

                    <Accordion title={'開催日'} source={sixthSource} right_item='2023/10/01'>
                        <Text style={styles.textSmall}>
                            React Native lets you create truly native apps and
                            doesn't compromise your users' experiences. It provides a core set of platform
                            agnostic native components 
                        </Text>
                    </Accordion>

                    <Accordion title={'サムネイル'} source={seventhSource}>
                        <Text style={styles.textSmall}>
                            React Native lets you create truly native apps and
                            doesn't compromise your users' experiences. It provides a core set of platform
                            agnostic native components 
                        </Text>
                    </Accordion>
                </View>
            </View>
        </View>
    )
};

export default GameEditScreen;