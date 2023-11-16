import React from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native';
import styles from './style';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useGetTotalScoreQuery } from '../../api/scoreEditApi';
import Spinner from 'react-native-loading-spinner-overlay';

const ScoreViewScreen: React.FC<any> = ({route}) => {
    const {item} = route.params;
    
    const { data: score, isLoading, isFetching } = useGetTotalScoreQuery(item.id);

    if (isLoading || isFetching) {
        return <Spinner visible={true} />;
    }

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

    const RenderContent = () => {
        return (
            <ScrollView>

                <View style={{flexDirection: 'row'}}>

                    <View style={{flexDirection: 'column'}}>

                        {score[0]['normal_scores'].map((column: any, index: number) => (
                            <View key={index}>

                                <View style={styles.smallBox}>

                                    <Text style={styles.text}>{index + 1}</Text>

                                </View>

                            </View>
                        ))}

                    </View>

                    {score.map((row: any, index: number) => (
                        <View key={index}>

                            {row['normal_scores'].map((data: any, id:number) => (
                                <View style={styles.bigBox} key={id}>
                                    <Text
                                        style={{textAlign: 'center'}} >
                                        {data['score']}
                                    </Text>
                                </View>
                            ))}

                        </View>
                    ))}

                </View>
                
            </ScrollView>
        );
    };

    const RenderFooter = ({title, type} : any) => {
        return (
            <View style={styles.rowContainer}>
                <View style={styles.smallBox}>
                    <Text style={styles.normalText}>{title}</Text>
                </View>

                {
                    score?.map((data:any, index:any)=>(
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
                    score?.map((data:any, index:any)=>(
                        <View style={[styles.headerBox]} key={data.id}>
                            <Text style={styles.normalText}>{data['total_scores']['chip_number']}</Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    return (
        <View style={{ paddingVertical: 50, alignItems: 'center', width: wp(100), height: hp(100), backgroundColor: 'white' }}>

            <RenderHeader />

            <ScrollView style={{backgroundColor: 'white', paddingBottom: 20}}>
                
                <RenderContent />

                <RenderFooter title={"合計"} type={"score"} />

                <RenderFooter title={"素点金額"} type={"converted_amount"} />

                <RenderChipNumber title={"チップ"} />

                <RenderFooter title={"合計"} type={"chip_money"} />

            </ScrollView>
        </View>
    )
};

export default ScoreViewScreen;