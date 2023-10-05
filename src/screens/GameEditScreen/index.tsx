import React, { ReactElement, useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

import { StackNavigationProp } from "@react-navigation/stack";
import Picker from 'rmc-picker';

import Accordion from '../../components/Accordion';
import Button from '../../components/Button';
type RootStackParamList = {
    Details: undefined;
}

type GameEditScreenNavigationProp = StackNavigationProp<RootStackParamList,'Details'>;


const GameEditScreen = () => {
    const [ selecteValue, setSelectedValue ] = useState<string>('');
      
    // const navigation = useNavigation<{[x: string]: any}>();
    const navigation = useNavigation<GameEditScreenNavigationProp>();

    const handlePress = () => {
        console.log('asdf');
        navigation.navigate('Details');
    }
    
    const [value, setValue] = useState(["1", "11"]);

    const onChange = (value : any) => {
        console.log("onChange", value);
        setValue(value);
    };

    const onScrollChange = (value : any) => {
        console.log("onScrollChange", value);
    };

    const firstSource = require('../../../assets/people_plus.png');
    const secondSource = require('../../../assets/calculator.png');
    const thirdSource = require('../../../assets/database.png');
    const fourthSource = require('../../../assets/championship.png');
    const fifthSource = require('../../../assets/global.png');
    const sixthSource = require('../../../assets/calendar.png');
    const seventhSource = require('../../../assets/image.png');

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
                    <Accordion title={'スコア'} source={secondSource} right_item='0.5'>
                        <Text style={styles.textSmall}>
                            React Native lets you create truly native apps and
                            doesn't compromise your users' experiences. It provides a core set of platform
                            agnostic native components 
                        </Text>
                    </Accordion>

                    <Accordion title={'チップ'} source={thirdSource} right_item='2'>
                        <Text style={styles.textSmall}>
                            React Native lets you create truly native apps and
                            doesn't compromise your users' experiences. It provides a core set of platform
                            agnostic native components 
                        </Text>
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

            {/* <View>
                <Picker>
                    <Picker.Item value="1">
                        1
                    </Picker.Item>
                    <Picker.Item value="2">
                        2
                    </Picker.Item>
                    <Picker.Item value="3">
                        3
                    </Picker.Item>
                    <Picker.Item value="4">
                        4
                    </Picker.Item>
                    <Picker.Item value="5">
                        5
                    </Picker.Item>
                    <Picker.Item value="6">
                        6
                    </Picker.Item>
                    <Picker.Item value="7">
                        7
                    </Picker.Item>
                    <Picker.Item value="8">
                        8
                    </Picker.Item>
                    <Picker.Item value="9">
                        9
                    </Picker.Item>
                    <Picker.Item value="10">
                        10
                    </Picker.Item>
                </Picker>
            </View> */}
        </View>
    )
};

export default GameEditScreen;