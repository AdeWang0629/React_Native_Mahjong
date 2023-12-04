import React, { useState, useEffect, useRef} from 'react'
import { 
    View, 
    ScrollView, 
    Text,
    TouchableOpacity, 
    TextInput, 
    Platform,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import COLORS from '../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useCreateTotalScoreMutation } from '../../api/scoreEditApi';
import { useGetTotalScoreQuery } from '../../api/scoreEditApi';
import { useCreateGameScoreMutation } from '../../api/gameEditApi';
import { useCreateGameChipMutation } from '../../api/gameEditApi';
import { setCurrentScore } from '../../store/global'
import { useDispatch } from 'react-redux';
import { convertAbsoluteToRem } from 'native-base/lib/typescript/theme/tools';

const ScoreScreen: React.FC<any> = ({route}) => {
    const {item} = route.params;

    const navigation = useNavigation<{[x: string]: any}>();
    const dispatch = useDispatch();

    const [ createTotalScore ] = useCreateTotalScoreMutation();
    const { data: scores, refetch, isLoading, isFetching } = useGetTotalScoreQuery(item.id);

    const [ createGameScore, results ] = useCreateGameScoreMutation();
    const [ createGameChip ] = useCreateGameChipMutation();

    const [rowCount, setRowCount] = useState(20);
    const [rows, setRows] = useState<string[][]>(Array.from({ length: rowCount }, () => ['']));

    const [ score, setScore ] = useState<string[]>([]);
    const [ convertedAmount, setConvertedAmount ] =  useState<string[]>([]);
    const [ chipNumber, setChipNumber ] = useState<string[]>([]);
    const [ chipMoney, setChipMoney ] = useState<string[]>([]);

    const [gameScore, setGameScore] = useState(item.score < 1 ? item.score : item.score.toFixed(1));
    const [gameChip, setGameChip] = useState(item.chip.toFixed(1));
    const [gameTempScore, setGameTempScore] = useState(item.score < 1 ? item.score : item.score.toFixed(1));

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(()=>{
        setGameScore(item.score < 1 ? item.score : item.score.toFixed(1));
        setGameChip(item.chip.toFixed(1));
        dispatch(setCurrentScore(item));
    },[item]);
    
    useEffect(()=>{
        
        const newRows = [...rows];
        const newChipNumber = [...chipNumber];
        const newScore: string[] = [];
        const newConvertedAmount: string[] = [];
        const newChipMoney: string[] = [];
                
        scores && scores.map((row: any, index: number) => {

            row['normal_scores'].map((data: any, id:number) => {
            
                newRows[id][index] = data['score'].toString();
                console.log(data['score'].toString(), "asd");
            })

        });
        console.log(newRows, 'hello234567890-');
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
            for (let j = 0; j < rows.length; j++) {
                // totalScore += parseInt(rows[j][i]) || 0;
                if (rows[j][i] && rows[j][i].length / 3 >= 1) {
                    const stringWithDots = rows[j][i];
                    const numericValue = parseFloat(stringWithDots.replace(/,/g, ''));
                    totalScore += numericValue;
                }else{
                    totalScore += parseInt(rows[j][i]) || 0;
                }
            }
            const numericScore = totalScore.toString().replace(/[^0-9.-]/g, '');
            const numberScore = parseInt(numericScore, 10);
            newScore.push(numberScore.toLocaleString());

            const numericAmount = (totalScore * 100 * gameScore).toString().replace(/[^0-9.-]/g, '');
            const numberAmount = parseInt(numericAmount, 10);
            newConvertedAmount.push(numberAmount.toLocaleString());

            if (newChipNumber[i]) {
                const numericNewChipNumber = parseFloat(newChipNumber[i].replace(/,/g, ''));
                const numericChipMoney = (totalScore * 100 * gameScore + numericNewChipNumber * 100 * gameChip * gameScore).toString().replace(/[^0-9.-]/g, '');
                const numberChipMoney = parseInt(numericChipMoney, 10);
                newChipMoney.push(numberChipMoney.toLocaleString());
            }
        }
        console.log(newRows, "234567890");
        setRows(newRows);
        setScore(newScore);
        setConvertedAmount(newConvertedAmount);
        setChipNumber(newChipNumber);
        setChipMoney(newChipMoney);

    },[]);

    useEffect(()=>{
        
        const newChipNumber = [...chipNumber];
        const newConvertedAmount: string[] = [];
        const newChipMoney: string[] = [];
                
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
            for (let j = 0; j < rows.length; j++) {
                // totalScore += parseInt(rows[j][i]) || 0;
                if (rows[j][i] && rows[j][i].length / 3 >= 1) {
                    const stringWithDots = rows[j][i];
                    const numericValue = parseFloat(stringWithDots.replace(/,/g, ''));
                    totalScore += numericValue;
                }else{
                    totalScore += parseInt(rows[j][i]) || 0;
                }
            }
            const numericScore = totalScore.toString().replace(/[^0-9.-]/g, '');
            const numberScore = parseInt(numericScore, 10);

            const numericAmount = (totalScore * 100 * gameScore).toString().replace(/[^0-9.-]/g, '');
            const numberAmount = parseInt(numericAmount, 10);
            newConvertedAmount.push(numberAmount.toLocaleString());

            if (newChipNumber[i]) {
                const numericNewChipNumber = parseFloat(newChipNumber[i].replace(/,/g, ''));
                const numericChipMoney = (totalScore * 100 * gameScore + numericNewChipNumber * 100 * gameChip * gameScore).toString().replace(/[^0-9.-]/g, '');
                const numberChipMoney = parseInt(numericChipMoney, 10);
                newChipMoney.push(numberChipMoney.toLocaleString());
            }
        }

        setConvertedAmount(newConvertedAmount);
        setChipNumber(newChipNumber);
        setChipMoney(newChipMoney);

    },[gameScore, gameChip]);


    useEffect(()=>{
        dispatch(setCurrentScore(item));
    },[]);

    const handleInputChange = (text: string, index: number, id:number) => {

        let isValid;

        if (text.length < 4) {
            const regex = /^[-\d]+$/; // regular expression to match only numbers and minus signs
            isValid = regex.test(text); // test if randomString matches the regular expression
        }else{
            const regex = /^[-\d.,]+$/; // regular expression to match only numbers and minus signs and comma symbol
            isValid = regex.test(text); // test if randomString matches the regular expression
        }


        const numericText = text.replace(/[^0-9.-]/g, '');
        const numberValue = parseInt(numericText, 10);
        // Format the number with commas for values above 1000
        const formattedValue = numberValue.toLocaleString();

        const newRows = [...rows];

        if (text == '-') {
            newRows[index][id] = text;          
        }else if (text == '') {
            newRows[index][id] = text; 
        }else if(isValid){
            newRows[index][id] = formattedValue;
        }

        setRows(newRows);
    }

    const handleInputChangeSubmit = () => {

        const newRows = [...rows];

        newRows.map(data => {

            let valueCount = 0;

            for (let i = 0; i < data.length; i++) {
                if (data[i] && typeof data[i] !== 'undefined') {
                    valueCount++;
                }
            }

            if (valueCount == item.players.length - 1) {

                for (let i = 0; i < item.players.length; i++) {
                    if (data[i] == undefined || data[i] == '') {
                        if (data.length == item.players.length) {
                            let sum = 0;
                            for (let j = 0; j < data.length; j++) {
                                if (j === i) {
                                    continue; // Skip the i-th element
                                }
                                const value = parseFloat(data[j].replace(/,/g, ''));

                                if (!isNaN(value)) {
                                    sum += value;
                                }
                            }
                            const text = (sum * (-1)).toString();
                            const numericText = text.replace(/[^0-9.-]/g, '');
                            const numberValue = parseInt(numericText, 10);
                            // Format the number with commas for values above 1000
                            const formattedValue = numberValue.toLocaleString();
                            data[i] = formattedValue;
                        }
                    }
                }
            }
            
            if ((item.players.length == 4)) {
                if (data[0] != "" && data[1] != "" && data[2] != "" &&  data.length == 3 && !data[3]) {
                    const text = ((parseFloat(data[0].replace(/,/g, '')) + parseFloat(data[1].replace(/,/g, '')) + parseFloat(data[2].replace(/,/g, ''))) * (-1)).toString();
                    const numericText = text.replace(/[^0-9.-]/g, '');
                    const numberValue = parseInt(numericText, 10);
                    // Format the number with commas for values above 1000
                    const formattedValue = numberValue.toLocaleString();
                    data[3] = formattedValue;
                }
            }

            if ((item.players.length == 3)) {
                if (data[0] != "" && data[1] != "" && data.length == 2 && !data[2]) {
                    const text = ((parseFloat(data[0].replace(/,/g, '')) + parseFloat(data[1].replace(/,/g, ''))) * (-1)).toString();
                    const numericText = text.replace(/[^0-9.-]/g, '');
                    const numberValue = parseInt(numericText, 10);
                    // Format the number with commas for values above 1000
                    const formattedValue = numberValue.toLocaleString();
                    data[2] = formattedValue;
                }
            }
        });

        const newScore: string[] = [];
        const newConvertedAmount: string[] = [];
        const newChipMoney: string[] = [];
        const newChipNumber = [...chipNumber];

        for (let i = 0; i < item.players.length; i++) {

            let totalScore = 0;
            for (let j = 0; j < newRows.length; j++) {
                // totalScore += parseInt(rows[j][i]) || 0;
                if (newRows[j][i] && newRows[j][i].length / 3 >= 1) {
                    const stringWithDots = newRows[j][i];
                    const numericValue = parseFloat(stringWithDots.replace(/,/g, ''));
                    totalScore += numericValue;
                }else{
                    totalScore += parseInt(newRows[j][i]) || 0;
                }
            }
            const numericScore = totalScore.toString().replace(/[^0-9.-]/g, '');
            const numberScore = parseInt(numericScore, 10);
            newScore.push(numberScore.toLocaleString());

            const numericAmount = (totalScore * 100 * gameScore).toString().replace(/[^0-9.-]/g, '');
            const numberAmount = parseInt(numericAmount, 10);
            newConvertedAmount.push(numberAmount.toLocaleString());

            if (newChipNumber[i]) {
                const numericNewChipNumber = parseFloat(newChipNumber[i].replace(/,/g, ''));
                const numericChipMoney = (totalScore * 100 * gameScore + numericNewChipNumber * 100 * gameChip * gameScore).toString().replace(/[^0-9.-]/g, '');
                const numberChipMoney = parseInt(numericChipMoney, 10);
                newChipMoney.push(numberChipMoney.toLocaleString());
            }
        }

        setRows(newRows);
        setScore(newScore);
        setConvertedAmount(newConvertedAmount);
        setChipMoney(newChipMoney);

        const totalBody = {
            game_id: item.id,
            score: newScore,
            scoreMoney: newConvertedAmount,
            chipNumber: chipNumber,
            chipMoney: newChipMoney,
            rows: newRows
        };

        const result = createTotalScore(totalBody);
        // refetch();
        
    }
    
    const handleInputChipChange = (text: string, index: number) => {

        let isValid;

        if (text.length < 4) {
            const regex = /^[-\d]+$/; // regular expression to match only numbers and minus signs
            isValid = regex.test(text); // test if randomString matches the regular expression
        }else{
            const regex = /^[-\d.,]+$/; // regular expression to match only numbers and minus signs and comma symbol
            isValid = regex.test(text); // test if randomString matches the regular expression
        }

        const numericText = text.replace(/[^0-9.-]/g, '');
        const numberValue = parseInt(numericText, 10);
        // Format the number with commas for values above 1000
        const formattedValue = numberValue.toLocaleString();
       
        const newChipNumber = [...chipNumber];

        if (text == '-') {
            newChipNumber[index] = text;          
        }else if (text == '') {
            newChipNumber[index]  = text; 
        }else if(isValid){
            newChipNumber[index] = formattedValue;
        }else{
            return null;
        }

        setChipNumber(newChipNumber);
    };

    const handleInputChipChangeSubmit = () => {

        const newChipNumber = [...chipNumber];
        const newChipMoney = [...chipMoney];

        let valueCount = 0;

        for (let i = 0; i < newChipNumber.length; i++) {
            if (newChipNumber[i] && typeof newChipNumber[i] !== 'undefined') {
                valueCount++;
            }
        }

        if (valueCount == item.players.length - 1) {

            for (let i = 0; i < item.players.length; i++) {
                if (newChipNumber[i] == undefined || newChipNumber[i] == '') {
                    if (newChipNumber.length == item.players.length) {
                        let sum = 0;
                        for (let j = 0; j < newChipNumber.length; j++) {
                            if (j === i) {
                                continue; // Skip the i-th element
                            }
                            const value = parseFloat(newChipNumber[j].replace(/,/g, ''));

                            if (!isNaN(value)) {
                                sum += value;
                            }
                        }
                        const text = (sum * (-1)).toString();
                        const numericText = text.replace(/[^0-9.-]/g, '');
                        const numberValue = parseInt(numericText, 10);
                        // Format the number with commas for values above 1000
                        const formattedValue = numberValue.toLocaleString();
                        newChipNumber[i] = formattedValue;
                    }
                }
            }
        }
        
        if ((item.players.length == 4)) {
            if (newChipNumber[0] != "" && newChipNumber[1] != "" && newChipNumber[2] != "" &&  newChipNumber.length == 3 && !newChipNumber[3]) {
                const text = ((parseFloat(newChipNumber[0].replace(/,/g, '')) + parseFloat(newChipNumber[1].replace(/,/g, '')) + parseFloat(newChipNumber[2].replace(/,/g, ''))) * (-1)).toString();
                const numericText = text.replace(/[^0-9.-]/g, '');
                const numberValue = parseInt(numericText, 10);
                // Format the number with commas for values above 1000
                const formattedValue = numberValue.toLocaleString();
                newChipNumber[3] = formattedValue;
            }
        }

        if ((item.players.length == 3)) {
            if (newChipNumber[0] != "" && newChipNumber[1] != "" && newChipNumber.length == 2 && !newChipNumber[2]) {
                const text = ((parseFloat(newChipNumber[0].replace(/,/g, '')) + parseFloat(newChipNumber[1].replace(/,/g, ''))) * (-1)).toString();
                const numericText = text.replace(/[^0-9.-]/g, '');
                const numberValue = parseInt(numericText, 10);
                // Format the number with commas for values above 1000
                const formattedValue = numberValue.toLocaleString();
                newChipNumber[2] = formattedValue;
            }
        }


        newChipNumber.map((data, index) => {
            let numericChipNumberValue;

            // if (data) {

            //     numericChipNumberValue = parseFloat(data.replace(/,/g, ''));
                
            // }else{

            //     numericChipNumberValue = 0;
            // }

            if(convertedAmount[index]){
                
                const numericAmount = parseFloat(convertedAmount[index].replace(/,/g, ''));
                numericChipNumberValue = parseFloat(data.replace(/,/g, ''));
                
                const numericMoney = (numericChipNumberValue * 100 * gameScore * gameChip + numericAmount).toString().replace(/[^0-9.-]/g, '');
                const numberMoney = parseInt(numericMoney, 10);
    
                newChipMoney[index] = numberMoney.toLocaleString();
    
            }else{
                numericChipNumberValue = parseFloat(data.replace(/,/g, ''));
                const numericMoney = (numericChipNumberValue * 100 * gameScore * gameChip).toString().replace(/[^0-9.-]/g, '');
                const numberMoney = parseInt(numericMoney, 10);
    
                newChipMoney[index] = numberMoney.toLocaleString();
            }
        });
        
        setChipNumber(newChipNumber);
        setChipMoney(newChipMoney);

        const totalBody = {
            game_id: item.id,
            score: score,
            scoreMoney: convertedAmount,
            chipNumber: newChipNumber,
            chipMoney: newChipMoney,
            rows: rows
        };

        createTotalScore(totalBody);
        // refetch();
    }

    const handleAddRow = async () => {
        setRows([...rows, [""]])
    };

    const RenderHeader = () => {
        return (
            <View style={styles.rowContainer}>

                <View style={[styles.smallBox, {borderLeftWidth: 3}]}>
                    <Text style={styles.numberText}>No.</Text>
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
                                        
                                    {type == "score" ? (
                                        <Text style={[styles.customText,existMinus(score[index] ? score[index] : '') && {color: 'red'}]}>  {score[index]} </Text>
                                        ) : 
                                        type == "converted_amount" ? (
                                            <Text style={[styles.customText,existMinus(convertedAmount[index] ? convertedAmount[index] : '') && {color: 'red'}]}>  {convertedAmount[index]} </Text>
                                            ) : 
                                            type == "chip_money" ? (
                                                <Text style={[styles.customText,existMinus(chipMoney[index] ? chipMoney[index] : '') && {color: 'red'}]}>  {chipMoney[index]} </Text>
                                            ) : ''}                                
                            </View>

                        )
                    })
                }
            </View>
        )
    }

    const existMinus = (str:string) => {
        return str.indexOf('-') !== -1;
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
        style={{flex:1}}>
        <ScrollView>
            <View style={{alignItems: 'center', backgroundColor: COLORS.WHITE, paddingTop: 10, paddingBottom: 30, height: hp(88), flex: 1,justifyContent: 'space-around',}}>

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
                                <Text style={styles.numberText}>{gameScore}</Text>
                                {/* <TextInput value={gameTempScore} onChangeText={(text) => handleInputScoreChange(text)} onBlur={handleInputScoreChangeSubmit} keyboardType = 'numeric' style={{textAlign: 'center', width: '100%'}} /> */}
                            </View>
                        ) : (
                            <View style={[styles.desBox, {width: wp(32.5), borderTopWidth: 3}]}>
                                <Text style={styles.numberText}>{gameScore}</Text>
                                {/* <TextInput value={gameTempScore} onChangeText={(text) => handleInputScoreChange(text)} onBlur={handleInputScoreChangeSubmit} keyboardType = 'numeric' style={{textAlign: 'center', width: '100%'}} /> */}
                            </View>
                        )
                    }

                    <View style={[styles.smallBox, {borderTopWidth: 3}]}>
                        <Text style={styles.normalText}>{ ("チップ") }</Text>
                    </View>
                    
                    {
                        item.players.length == 3 ?
                        (
                            <View style={[styles.desBox, {width: wp(22.5), borderTopWidth: 3, borderRightWidth: 3}]}>
                                <Text>{gameChip}</Text>
                                {/* <TextInput value={gameChip} onChangeText={(text) => handleInputGameChipChange(text)} keyboardType = 'numeric' style={{textAlign: 'center'}} /> */}
                            </View>
                        ) : (
                            <View style={[styles.desBox, {width: wp(32.5), borderTopWidth: 3, borderRightWidth: 3}]}>
                                <Text>{gameChip}</Text>
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

                <ScrollView style={{flex:1, height: hp(30)}} nestedScrollEnabled={true} ref={scrollViewRef}>

                    {rows.map((row: string[], index: number) => {

                        return (

                            <View style={styles.rowContainer} key={index}>

                                <View style={[styles.smallBox, {borderLeftWidth: 3}]}>
                                    <Text style={styles.numberText}>{index + 1}</Text>
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
                                                    keyboardType='numbers-and-punctuation'
                                                    style={[styles.customTextInput, existMinus(row[id] ? row[id] : '') && {color: 'red'}]}
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
                            <Text style={[styles.numberText, {color: COLORS.WHITE}]}>追                            加</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={[styles.addButton, {width: wp(95), borderRadius: 0}]} onPress={handleAddRow}>
                            <Text style={[styles.numberText, {color: COLORS.WHITE}]}>追                                     加</Text>
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
                                <TextInput value={chipNumber[index]} onChangeText={(text) => handleInputChipChange(text, index)} onBlur={handleInputChipChangeSubmit} keyboardType = 'numbers-and-punctuation' style={[styles.customTextInput, existMinus(chipNumber[index] ? chipNumber[index] : '') && {color: 'red'}]} />
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
        </KeyboardAvoidingView>
    )
};

export default ScoreScreen;