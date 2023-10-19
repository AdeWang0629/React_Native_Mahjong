import React, { useState, useEffect} from 'react'
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
    const [ chipMoney, setChipMoney ] = useState<number[]>([]);
    const [ editButtonState, setEditButtonState ] = useState(false);

    useEffect(() => {
        const calculate = () => {
            const newScore: number[] = [];
            const newConvertedAmount: number[] = [];

            for (let i = 0; i < item.players.length; i++) {
                let totalScore = 0;
                for (let j = 0; j < rows.length; j++) {
                    totalScore += parseInt(rows[j][i]) || 0;
                }
                newScore.push(totalScore);
                newConvertedAmount.push(totalScore * 100 * item.score )
            }
            setScore(newScore);
            setConvertedAmount(newConvertedAmount);
        };

        calculate();
    }, [rows]);

    const handleInputChange = (text: string, index: number, id:number) => {
        const newRows = [...rows];
        const parsedValue = parseInt(text);
        newRows[index][id] = isNaN(parsedValue) ? '0' : parsedValue.toString();
        setRows(newRows);
        setEditButtonState(true);
    };

    const handleAddRow = () => {
        setRowCount(rowCount + 1);
        setRows([...rows, Array.from({ length: item.players.length }, () => '')]);
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

    const RenderContent = () => {
        return (
            <ScrollView>
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

                <View style={styles.rowContainer}>
                    <View style={styles.smallBox}>
                        <Icon name={'add-circle-outline'} size={30}/>
                    </View>
                            
                    {
                        item.players.length == 3 ?
                        (
                            <View style={{alignItems: 'center'}}>
                                <TouchableOpacity style={[styles.addButton, {width: wp(60)}]} onPress={handleAddRow}>
                                    <Text style={[styles.text, {color: COLORS.WHITE}]}>追        加</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={{alignItems: 'center'}}>
                                <TouchableOpacity style={[styles.addButton, {width: wp(80)}]} onPress={handleAddRow}>
                                    <Text style={[styles.text, {color: COLORS.WHITE}]}>追        加</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }

                </View>
                
            </ScrollView>
        );
    };

    const DesBox = ({title, number} : any) => {
        return (

            <View style={styles.rowContainer}>
                <View style={styles.smallBox}>
                    <Text style={styles.normalText}>{title}</Text>
                </View>

                {
                    item.players.length == 3 ?
                    (
                        <View style={[styles.desBox, {width: wp(60)}]}>
                            <Text>{number}</Text>
                        </View>
                    ) : (
                        <View style={[styles.desBox, {width: wp(80)}]}>
                            <Text>{number}</Text>
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
        newChipMoney[index] = Number(newChipNumber[index]) * 100 * item.score * item.chip ;

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
        <ScrollView>

            <View style={{alignItems: 'center', backgroundColor: 'white', paddingBottom: 20}}>

                <DesBox title={"スコア"} number={item.score} />

                <DesBox title={"チップ"} number={item.chip} />

                <RenderHeader />

                <ScrollView style={{backgroundColor: 'white'}}>

                    <RenderContent />
                    
                    <RenderFooter title={"合計"} type={"score"} />

                    <RenderFooter title={"スコア金   額"} type={"converted_amount"} />

                    <RenderChipNumber title={"チップ(±枚数)"} />

                    <RenderFooter title={"チップ金   額"} type={"chip_money"} />
                    
                    {
                        editButtonState && (
                            <View style={{alignItems: 'center'}}>
                                <TouchableOpacity style={styles.saveButton} onPress={handleSaveScore}>
                                    <Icon name={'save-outline'} size={25} color={COLORS.WHITE}/>
                                    <Text style={[styles.text, {color: COLORS.WHITE}]}>       保        存</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }

                </ScrollView>

            </View>

        </ScrollView>
    )
};

export default ScoreScreen;