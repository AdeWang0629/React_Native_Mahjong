import React, { useState, useEffect, useRef} from 'react'
import { View, ScrollView, Text, FlatList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { useDispatch } from 'react-redux';
import COLORS from '../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import  Icon  from "react-native-vector-icons/Ionicons";
import { useCreateTotalScoreMutation } from '../../api/scoreEditApi';
import { useGetTotalScoreQuery } from '../../api/scoreEditApi';
import { useCreateGameScoreMutation } from '../../api/gameEditApi';
import { useCreateGameChipMutation } from '../../api/gameEditApi';
import Spinner from 'react-native-loading-spinner-overlay';

const ScoreScreen: React.FC<any> = ({route}) => {
    const {item, refetchAction} = route.params;
    const navigation = useNavigation<{[x: string]: any}>();

    const [ createTotalScore ] = useCreateTotalScoreMutation();
    const { data: scores, refetch, isLoading, isFetching } = useGetTotalScoreQuery(item.id);

    const [ createGameScore, results ] = useCreateGameScoreMutation();
    const [ createGameChip ] = useCreateGameChipMutation();

    const [rowCount, setRowCount] = useState(20);
    const [rows, setRows] = useState<string[][]>(Array.from({ length: rowCount }, () => ['']));

    const [ score, setScore ] = useState<number[]>([]);
    const [ convertedAmount, setConvertedAmount ] =  useState<number[]>([]);
    const [ chipNumber, setChipNumber ] = useState<string[]>([]);
    const [ chipMoney, setChipMoney ] = useState<number[]>([]);

    const scrollViewRef = useRef<ScrollView>(null);
    
    // useEffect(()=>{
    //     refetch();
    // },[]);

    useEffect(()=>{
        refetch();
    });

    useEffect(()=>{

        const newRows = [...rows];
        const newChipNumber = [...chipNumber];
        const newScore: number[] = [];
        const newConvertedAmount: number[] = [];
        const newChipMoney: number[] = [];
        
        scores && scores.map((row: any, index: number) => {

            row['normal_scores'].map((data: any, id:number) => {
            
                newRows[id][index] = data['score'].toString();
            })

        })
        
        scores && scores.map((data:any, index:any)=>{
            // 
            if (!data['total_scores']) {
                return null;
            }else{
                newChipNumber[index] = data['total_scores']['chip_number'].toString()
            }
        })

        for (let i = 0; i < item.players.length; i++) {
            let totalScore = 0;
            for (let j = 0; j < newRows.length; j++) {
                totalScore += parseInt(newRows[j][i]) || 0;
            }
            newScore.push(totalScore);
            newConvertedAmount.push(totalScore * 100 * item.score );
            if (newChipNumber[i]) {
                newChipMoney.push(totalScore * 100 * item.score + Number(newChipNumber[i]) * 100 * item.chip * item.score);
            }
        }

        setRows(newRows);
        setScore(newScore);
        setConvertedAmount(newConvertedAmount);
        setChipNumber(newChipNumber);
        setChipMoney(newChipMoney);

    },[scores]);
    
    const handleInputChange = (text: string, index: number, id:number) => {

        const newRows = [...rows];

        const parsedValue = parseInt(text);
        newRows[index][id] = isNaN(parsedValue) ? '' : parsedValue.toString();

        
        const newScore: number[] = [];
        const newConvertedAmount: number[] = [];
        const newChipMoney: number[] = [];

        for (let i = 0; i < item.players.length; i++) {
            let totalScore = 0;
            for (let j = 0; j < rows.length; j++) {
                totalScore += parseInt(rows[j][i]) || 0;
            }
            newScore.push(totalScore);
            newConvertedAmount.push(totalScore * 100 * item.score );
            if (Number(chipNumber[i])) {
                newChipMoney.push(totalScore * 100 * item.score + Number(chipNumber[i]) * 100 * item.chip * item.score);
            }
        }
        setRows(newRows);
        setScore(newScore);
        setConvertedAmount(newConvertedAmount);
        setChipMoney(newChipMoney);
        refetch();
    }

    const handleInputChangeSubmit = () => {

        const newRows = [...rows];

        if (item.players.length == 4) {
            newRows.map(data => {
                if (data.length == 3) {
                    data[data.length] = ((Number(data[0]) + Number(data[1]) + Number(data[2])) * (-1)).toString();
                }
            });
        }else if (item.players.length == 3) {

            newRows.map(data => {

                if (data.length == 2) {
                    data[data.length] = ((Number(data[0]) + Number(data[1])) * (-1)).toString();
                }
            });
        }

        const newScore: number[] = [];
        const newConvertedAmount: number[] = [];
        const newChipMoney: number[] = [];

        for (let i = 0; i < item.players.length; i++) {
            let totalScore = 0;
            for (let j = 0; j < rows.length; j++) {
                totalScore += parseInt(rows[j][i]) || 0;
            }
            newScore.push(totalScore);
            newConvertedAmount.push(totalScore * 100 * item.score );
            if (Number(chipNumber[i])) {
                newChipMoney.push(totalScore * 100 * item.score + Number(chipNumber[i]) * 100 * item.chip * item.score);
            }
        }
        setRows(newRows);
        setScore(newScore);
        setConvertedAmount(newConvertedAmount);
        setChipMoney(newChipMoney);
        refetch();
        
        const totalBody = {
            game_id: item.id,
            score: score,
            scoreMoney: convertedAmount,
            chipNumber: chipNumber,
            chipMoney: chipMoney,
            rows: rows
        };

        const result = createTotalScore(totalBody);
        
    }
    
    const handleInputChipChange = (text: string, index: number) => {

        const newChipNumber = [...chipNumber];
        const parsedValue = parseInt(text);
        newChipNumber[index] = isNaN(parsedValue) ? '' : parsedValue.toString();
        
        const newChipMoney = [...chipMoney];
        if(convertedAmount[index]){

            newChipMoney[index] = Number(newChipNumber[index]) * 100 * item.score * item.chip + convertedAmount[index];

        }else{

            newChipMoney[index] = Number(newChipNumber[index]) * 100 * item.score * item.chip;

        }
        
        setChipMoney(newChipMoney);
        setChipNumber(newChipNumber);
        
        
        // refetchAction();
    };

    const handleInputChipChangeSubmit = () => {

        const totalBody = {
            game_id: item.id,
            score: score,
            scoreMoney: convertedAmount,
            chipNumber: chipNumber,
            chipMoney: chipMoney,
            rows: rows
        };

        createTotalScore(totalBody);

    }

    const handleAddRow = async () => {
        setRows([...rows, [""]])
    };

    const RenderHeader = () => {
        return (
            <View style={styles.rowContainer}>

                <View style={[styles.smallBox, {borderLeftWidth: 3}]}>
                    <Text style={styles.text}>No.</Text>
                </View>
                
                {
                    item.players.map((data:any, index:any)=>{
 
                        const flag = index == item.players.length - 1 ? true : false;

                        return (
                            <View style={[styles.headerBox, flag && {borderRightWidth: 3}]} key={data.id}>
                                <Text>{data.name}</Text>
                            </View>    
                        )
                    })
                }

            </View>
        )
    }

    const RenderFooter = ({title, type} : any) => {
        return (
            <View style={styles.rowContainer}>

                <View style={[styles.smallBox, type == "chip_money" ? ({borderLeftWidth: 3, borderBottomWidth: 3}) : ({borderLeftWidth: 3})]}>
                    <Text style={styles.normalText}>{title}</Text>
                </View>

                {
                    item.players.map((data:any, index:any)=>{

                        const flag = index == item.players.length - 1? true : false;

                        return (

                            <View style={[styles.headerBox, flag && {borderRightWidth : 3}, type == "chip_money" && {borderBottomWidth: 3}]} key={data.id}>
                                <Text>          
                                    {type == "score" ? score[index] : 
                                        type == "converted_amount" ? convertedAmount[index] : 
                                            type == "chip_money" ? chipMoney[index] : ''}
                                </Text>
                            </View>

                        )
                    })
                }
            </View>
        )
    }

    // const handleInputScoreChange = (text: string) => {

    //     const newConvertedAmount: number[] = [];
    //     convertedAmount.map((item)=>{
    //         const total = item / Number(gameScore) *  Number(text);
    //         newConvertedAmount.push(total);
    //     })
        
    //     setGameScore(text);
    //     setConvertedAmount(newConvertedAmount);

    // }

    // const handleInputScoreChangeSubmit = () => {

    //     const totalBody = {
    //         game_id: item.id,
    //         game_score: gameScore
    //     };

    //     createGameScore(totalBody);

    // }

    // const handleInputGameChipChange = (text: string) => {

    //     setGameChip(text);
        
    //     const totalBody = {
    //         game_id: item.id,
    //         game_chip: text
    //     };

    //     createGameChip(totalBody);
    //     // console.log("result", result);
    // }

    return (

        <ScrollView>

        
            <View style={{alignItems: 'center', backgroundColor: COLORS.WHITE, paddingTop: 10, paddingBottom: 20, height: hp(92)}}>

                {/* ==================================================================================================================================== */}
                {/* Begin Score and Chip Information Part */}
                
                <View style={styles.rowContainer}>
                    <View style={[styles.smallBox, {borderTopWidth: 3, borderLeftWidth: 3}]}>
                        <Text style={styles.normalText}>{ ("レート") }</Text>
                    </View>

                    {
                        item.players.length == 3 ?
                        (
                            <View style={[styles.desBox, {width: wp(22.5), borderTopWidth: 3}]}>
                                <Text>{item.score < 1 ? item.score : item.score.toFixed(1)}</Text>
                                {/* <TextInput value={gameScore} onChangeText={(text) => handleInputScoreChange(text)} onBlur={handleInputScoreChangeSubmit} keyboardType = 'numeric' style={{textAlign: 'center'}} /> */}
                            </View>
                        ) : (
                            <View style={[styles.desBox, {width: wp(32.5), borderTopWidth: 3}]}>
                                <Text>{item.score < 1 ? item.score : item.score.toFixed(1)}</Text>
                                {/* <TextInput value={gameScore} onChangeText={(text) => handleInputScoreChange(text)} onBlur={handleInputScoreChangeSubmit} keyboardType = 'numeric' style={{textAlign: 'center'}} /> */}
                            </View>
                        )
                    }

                    <View style={[styles.smallBox, {borderTopWidth: 3}]}>
                        <Text style={styles.normalText}>{ ("チップ") }</Text>
                    </View>
                    
                    {
                        item.players.length == 3 ?
                        (
                            <View style={[styles.desBox, {width: wp(22.5), borderTopWidth: 3, borderRightWidth: 3, borderRightColor: 'black'}]}>
                                <Text>{item.chip.toFixed(1)}</Text>
                                {/* <TextInput value={gameChip} onChangeText={(text) => handleInputGameChipChange(text)} keyboardType = 'numeric' style={{textAlign: 'center'}} /> */}
                            </View>
                        ) : (
                            <View style={[styles.desBox, {width: wp(32.5), borderTopWidth: 3, borderRightWidth: 3, borderRightColor: 'black'}]}>
                                <Text>{item.chip.toFixed(1)}</Text>
                                {/* <TextInput value={gameChip} onChangeText={(text) => handleInputGameChipChange(text)} keyboardType = 'numeric' style={{textAlign: 'center'}} /> */}
                            </View>
                        )
                    }
                </View>

                <RenderHeader />

                {/* End Score and Chip Information Part */}
                {/* ==================================================================================================================================== */}

                {/* ==================================================================================================================================== */}
                {/* Begin Score Table Part */}

                <ScrollView style={{flex:1, height: hp(60)}} nestedScrollEnabled={true} ref={scrollViewRef}>

                    {rows.map((row: string[], index: number) => {

                        return (

                            <View style={styles.rowContainer} key={index}>

                                <View style={[styles.smallBox, {borderLeftWidth: 3}]}>
                                    <Text style={styles.text}>{index + 1}</Text>
                                </View>

                                {
                                    item.players.map((data: any, id:number) => {

                                        let flag = id == item.players.length - 1 ? true : false;

                                        return (
                                            <View style={[styles.bigBox, flag && {borderRightWidth: 3}]} key={id}>
                                                <TextInput
                                                    value={row[id] ? row[id].toString() : ''}
                                                    onChangeText={(text) => handleInputChange(text, index, id)}
                                                    onBlur={handleInputChangeSubmit}
                                                    keyboardType = 'decimal-pad'
                                                    style={styles.customTextInput}
                                                />
                                            </View>
                                        )
                                    })
                                }
                                
                            </View>

                        )
                        
                    })}
                    
                </ScrollView>
                
                {/* END Score Table Part */}
                {/* ==================================================================================================================================== */}

                {/* ==================================================================================================================================== */}
                {/* Begin Additional Button Part */}
                
                {
                    item.players.length == 3 ?
                    (
                        <TouchableOpacity style={[styles.addButton, {width: wp(75), borderRadius: 0}]} onPress={handleAddRow}>
                            <Text style={[styles.text, {color: COLORS.WHITE}]}>追                            加</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={[styles.addButton, {width: wp(95), borderRadius: 0}]} onPress={handleAddRow}>
                            <Text style={[styles.text, {color: COLORS.WHITE}]}>追                                     加</Text>
                        </TouchableOpacity>
                    )
                }

                {/* End Additional Button Part */}
                {/* ==================================================================================================================================== */}

                <RenderFooter title={"素点"} type={"score"} />

                <RenderFooter title={"素点金額"} type={"converted_amount"} />
                
                {/* ==================================================================================================================================== */}
                {/* Begin Input ChipNumber Part */}

                <View style={styles.rowContainer}>

                    <View style={[styles.smallBox, {borderLeftWidth: 3}]}>
                        <Text style={styles.normalText}>{"チップ"}</Text>
                    </View>

                    {
                        item.players.map((data:any, index:any)=>{
                        
                        const flag = index == item.players.length - 1? true : false; 

                        return (
                            <View style={[styles.headerBox, flag && {borderRightWidth: 3}]} key={data.id}>
                                <TextInput value={chipNumber[index]} onChangeText={(text) => handleInputChipChange(text, index)} onBlur={handleInputChipChangeSubmit} keyboardType = 'numeric' style={styles.customTextInput} />
                            </View>
                            )
                        })
                    }

                </View>
                
                {/* End Input ChipNumber Part */}
                {/* ==================================================================================================================================== */}

                <RenderFooter title={"合計"} type={"chip_money"} />

            </View>

        </ScrollView>
    )
};

export default ScoreScreen;