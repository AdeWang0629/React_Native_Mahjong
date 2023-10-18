import React, { useState, useEffect} from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native';
import styles from './style';
import { useDispatch } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useGetTotalScoreQuery } from '../../api/scoreEditApi';

const ScoreViewScreen: React.FC<any> = ({route}) => {
    const {item} = route.params;
    
    const { data: total_score, refetch } = useGetTotalScoreQuery(item.id);
    total_score?.map((item : any) => console.log(item['total_scores']));
    const [ score, setScore ] = useState<number[]>([]);
    const [ convertedAmount, setConvertedAmount ] =  useState<number[]>([]);
    const [ chipNumber, setChipNumber ] = useState<string[]>([]);
    const [ chipMoney, setChipMoney ] = useState<number[]>([]);

    const RenderHeader = () => {
        return (
            <View style={styles.rowContainer}>
                <View style={styles.smallBox}>
                    <Text style={styles.text}></Text>
                </View>

                {
                    item.players.map((data:any)=>(
                        <View style={styles.headerBox} key={data.id}>
                            <Text>{data.name}</Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    const RenderFooter = ({title, type} : any) => {
        return (
            <View style={styles.rowContainer}>
                <View style={styles.smallBox}>
                    <Text style={styles.normalText}>{title}</Text>
                </View>

                {
                    total_score?.map((data:any, index:any)=>(
                        <View style={styles.headerBox} key={data.id}>
                            <Text>          
                                {type == "score" ? data['total_scores']['score'] : 
                                    type == "converted_amount" ? data['total_scores']['score_money'] : 
                                        type == "chip_money" ? data['total_scores']['chip_money'] : ''}
                            </Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    const RenderChipNumber = ({title} : any) => {
        return (
            <View style={styles.rowContainer}>
                <View style={styles.smallBox}>
                    <Text style={styles.normalText}>{title}</Text>
                </View>

                {
                    total_score?.map((data:any, index:any)=>(
                        <View style={[styles.headerBox]} key={data.id}>
                            <Text style={styles.normalText}>{data['total_scores']['chip_number']}</Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    return (
        <View style={{alignItems: 'center', backgroundColor: 'white', height: hp(100)}}>

            <RenderHeader />

            <ScrollView style={{backgroundColor: 'white'}}>
                
                <RenderFooter title={"合計"} type={"score"} />

                <RenderFooter title={"スコア金   額"} type={"converted_amount"} />

                <RenderChipNumber title={"チップ(±枚数)"} />

                <RenderFooter title={"チップ金   額"} type={"chip_money"} />

            </ScrollView>
        </View>
    )
};

export default ScoreViewScreen;