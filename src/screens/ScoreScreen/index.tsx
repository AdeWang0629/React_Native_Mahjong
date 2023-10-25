import React, { useState, useEffect, useRef} from 'react'
import { View, ScrollView, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { useDispatch } from 'react-redux';
import COLORS from '../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import  Icon  from "react-native-vector-icons/Ionicons";
import { useCreateTotalScoreMutation } from '../../api/scoreEditApi';

const ScoreScreen: React.FC<any> = ({route}) => {
    const {item, refetchAction} = route.params;
    const navigation = useNavigation<{[x: string]: any}>();

    const [ createTotalScore ] = useCreateTotalScoreMutation();

    const [rowCount, setRowCount] = useState(20);
    const [rows, setRows] = useState<string[][]>(Array.from({ length: rowCount }, () => ['']));

    const [ score, setScore ] = useState<number[]>([]);
    const [ convertedAmount, setConvertedAmount ] =  useState<number[]>([]);
    const [ chipNumber, setChipNumber ] = useState<string[]>([]);
    const [ chipMoney, setChipMoney ] = useState<number[]>([0]);
    const [ editButtonState, setEditButtonState ] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        const calculate = () => {
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
                    newChipMoney.push(totalScore * 100 * item.score + Number(chipNumber[i]));
                }
            }
            setScore(newScore);
            setConvertedAmount(newConvertedAmount);
            setChipMoney(newChipMoney);
        };

        calculate();
        console.log(rows, "newRows")

    }, [rows]);

    const handleInputChange = (text: string, index: number, id:number) => {
        const newRows = [...rows];
        console.log(newRows, "newRows")
        const parsedValue = parseInt(text);
        newRows[index][id] = isNaN(parsedValue) ? '0' : parsedValue.toString();
        setRows(newRows);
        setEditButtonState(true);

        //

        const totalBody = {
            game_id: item.id,
            score: score,
            scoreMoney: convertedAmount,
            chipNumber: chipNumber,
            chipMoney: chipMoney,
            rows: rows
        };
        const result = createTotalScore(totalBody);
        console.log(totalBody);
        refetchAction();
    }

    const handleAddRow = async () => {
        // setRowCount(rowCount + 1);
        setRows([...rows, [""]])

        // setTimeout(() => {
        //     // scrollViewRef.current?.scrollToEnd({ animated: false });
        // },1)
    };

    const RenderHeader = () => {
        return (
            <View style={styles.rowContainer}>

                <View style={styles.smallBox}>
                    <Text style={styles.text}>No</Text>
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

    // const RenderContent = ({ nestedScrollEnabled }: { nestedScrollEnabled: boolean }) => {
    //     return (
    //        <>
    //             <ScrollView style={{flex:1, height: hp(60)}} nestedScrollEnabled={true} ref={scrollViewRef}>

    //                 {rows.map((row: string[], index: number) => (
    //                     <View style={styles.rowContainer} key={index}>

    //                         <View style={styles.smallBox}>
    //                             <Text style={styles.text}>{index + 1}</Text>
    //                         </View>

    //                         {item.players.map((data: any, id:number) => (
    //                             <View style={styles.bigBox} key={id}>
    //                                 <TextInput
    //                                     value={row[id] || ''}
    //                                     onChangeText={(text) => handleInputChange(text, index, id)}
    //                                     keyboardType = 'numeric'
    //                                     style={{textAlign: 'center'}}
    //                                 />
    //                             </View>
    //                         ))}
                            
    //                     </View>
    //                 ))}

    //             </ScrollView>

    //             <TouchableOpacity style={[styles.addButton, {width: wp(75)}]} onPress={handleAddRow}>
    //                 <Text style={[styles.text, {color: COLORS.WHITE}]}>追        加</Text>
    //             </TouchableOpacity>
    //        </>
    //     );
    // };

    const DesBox = () => {
        return (
        
            <View style={styles.rowContainer}>
                <View style={styles.smallBox}>
                    <Text style={styles.normalText}>{ ("スコア") }</Text>
                </View>

                {
                    item.players.length == 3 ?
                    (
                        <View style={[styles.desBox, {width: wp(22.5)}]}>
                            <Text>{item.score}</Text>
                        </View>
                    ) : (
                        <View style={[styles.desBox, {width: wp(32.5)}]}>
                            <Text>{item.score}</Text>
                        </View>
                    )
                }

                <View style={styles.smallBox}>
                    <Text style={styles.normalText}>{ ("チップ") }</Text>
                </View>
                
                {
                    item.players.length == 3 ?
                    (
                        <View style={[styles.desBox, {width: wp(22.5)}]}>
                            <Text>{item.chip}</Text>
                        </View>
                    ) : (
                        <View style={[styles.desBox, {width: wp(32.5)}]}>
                            <Text>{item.chip}</Text>
                        </View>
                    )
                }
            </View>

        );
    };

    const RenderFooter = ({title, type} : any) => {
        return (
            <View style={styles.rowContainer}>
                <View style={styles.smallBox}>
                    <Text style={styles.normalText}>{title}</Text>
                </View>

                {
                    item.players.map((data:any, index:any)=>(
                        <View style={styles.headerBox} key={data.id}>
                            <Text>          
                                {type == "score" ? score[index] : 
                                    type == "converted_amount" ? convertedAmount[index] : 
                                        type == "chip_money" ? chipMoney[index] : ''}
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
                    item.players.map((data:any, index:any)=>(
                        <View style={[styles.headerBox]} key={data.id}>
                            <TextInput value={chipNumber[index]} onChangeText={(text) => handleInputChipChange(text, index)} keyboardType = 'numeric' style={{textAlign: 'center'}} />
                        </View>
                    ))
                }
            </View>
        )
    }

    const handleInputChipChange = (text: string, index: number) => {

        const newChipNumber = [...chipNumber];
        const parsedValue = parseInt(text);
        newChipNumber[index] = isNaN(parsedValue) ? '0' : parsedValue.toString();
        
        const newChipMoney = [...chipMoney];
        // newChipMoney[index] = Number(newChipNumber[index]) * 100 * item.score * item.chip ;
        newChipMoney[index] = Number(newChipNumber[index]) + convertedAmount[index] ;

        setChipNumber(newChipNumber);
        setChipMoney(newChipMoney);
    };

    const handleSaveScore = async () => {
        const totalBody = {
            game_id: item.id,
            score: score,
            scoreMoney: convertedAmount,
            chipNumber: chipNumber,
            chipMoney: chipMoney,
            rows: rows
        };
        const result = await createTotalScore(totalBody);
        refetchAction();
        navigation.navigate('HomeScreen');
    }

    return (

        <ScrollView style={{backgroundColor: COLORS.GREY}}>

        
            <View style={{alignItems: 'center', backgroundColor: "#f2f2f2", paddingBottom: 20}}>

                <DesBox />

                <RenderHeader />

                {/* <ScrollView style={{backgroundColor: 'white'}}> 

                    <RenderContent nestedScrollEnabled={true}   />

                </ScrollView>  */}

                <ScrollView style={{flex:1, height: hp(60)}} nestedScrollEnabled={true} ref={scrollViewRef}>

                    {rows.map((row: string[], index: number) => (
                        <View style={styles.rowContainer} key={index}>

                            <View style={styles.smallBox}>
                                <Text style={styles.text}>{index + 1}</Text>
                            </View>

                            {item.players.map((data: any, id:number) => (
                                <View style={styles.bigBox} key={id}>
                                    <TextInput
                                        value={row[id] || ''}
                                        onChangeText={(text) => handleInputChange(text, index, id)}
                                        keyboardType = 'numeric'
                                        style={{textAlign: 'center'}}
                                    />
                                </View>
                            ))}
                            
                        </View>
                    ))}
                    
                </ScrollView>

                <TouchableOpacity style={[styles.addButton, {width: wp(75)}]} onPress={handleAddRow}>
                    <Text style={[styles.text, {color: COLORS.WHITE}]}>追        加</Text>
                </TouchableOpacity>


                <RenderFooter title={"素点"} type={"score"} />

                <RenderFooter title={"素点金額"} type={"converted_amount"} />

                <RenderChipNumber title={"チップ"} />

                <RenderFooter title={"合計"} type={"chip_money"} />

            </View>

        </ScrollView>
    )
};

export default ScoreScreen;