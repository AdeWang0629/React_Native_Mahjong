import React, {useEffect, useState} from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./style";
import { useGetPlayerQuery, useGetPlayerClassMutation } from "../../api/playerEditApi";
import  Icon  from "react-native-vector-icons/Ionicons";
import { CheckBox } from "react-native-btr";
import globalMarginStyles from "../../theme/margin";
import Spinner from 'react-native-loading-spinner-overlay';
import { existMinus } from "../../util/global";

const Member : React.FC = () => {
    
    const {data:getPlayer, isLoading} = useGetPlayerQuery(1);
    const [ getPlayerClass, results ] = useGetPlayerClassMutation();

    const [player, setPlayer] = useState<any>([]);
    const [selecetBoxState, setSelecteBoxState] = useState(false);

    useEffect(()=>{
        setPlayer(getPlayer);
    }, [getPlayer]);
 
    const handleSelectBox = async () => {
        setSelecteBoxState(!selecetBoxState);
        if (selecetBoxState) {
            if (player.length) {
                const newData: any[] = [];
                const data = player.map((item:any)=>{
                    if (item.checked) {
                        newData.push(item);
                    }
                    return item;
                }); 

                if (newData.length == 3 || newData.length == 4) {
                    await getPlayerClass(data);
                }
            }
        }
    }

    const toggle = (id:number) => {
        const oldPlayer = [...player];
        const newPlayer = oldPlayer.map((item:any)=>{
            if (item.id == id) {
                item.checked = !item.checked;
                return item;
            } else {
                return item;
            }
        });
        setPlayer(newPlayer);
    }

    if (isLoading) {
        return <Spinner visible={true} />;
    }

    if (results.data !== undefined) {
        console.log(results.data.grade_data_month, "grade_data_month");
        console.log(results.data.grade_data_month_sum, "grade_data_month_sum");
    }

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.selectBoxContaier}>
                    
                    <TouchableOpacity onPress={handleSelectBox}>
                        <View style={styles.selectBox}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.smallFontSize}>3~4人を選択</Text>
                                <Icon name="caret-down-outline" size={38} style={{marginTop: 1}} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {
                        selecetBoxState ? (
                            <SafeAreaView style={styles.customHeight}>
                                <ScrollView style={styles.selectBoxContent}>
                                    {
                                        player && player.map((item:any) => {
                                            return (
                                                <TouchableOpacity key={item.id} onPress={()=>toggle(item.id)}>
                                                    <View style={styles.playerItem}>
                                                        <Text style={styles.smallFontSize}>{item.name}</Text>
                                                        <CheckBox 
                                                            checked = {item.checked}
                                                            onPress={() => toggle(item.id)}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </SafeAreaView>
                        ) : (
                            <ScrollView style={[globalMarginStyles.marginTop20]}>
                                {
                                    results.data !== undefined ? (
                                        results.data.selectGameIds.length ? (
                                            <View>
                                                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                                                    <Text style={[styles.smallFontSizeSecond, styles.middle_width]}></Text>
                                                    {
                                                        results.data.grade_data_month_sum.map((_item:any)=>(
                                                            <Text key={_item.name} style={[styles.smallFontSizeSecond, styles.middle_width]}>
                                                                {_item.name}
                                                            </Text>
                                                        ))
                                                    }
                                                </View>
                                                
                                                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                                                    <Text style={[styles.smallFontSizeSecond, styles.middle_width]}>合計</Text>
                                                    {
                                                        results.data.grade_data_month_sum.map((_item:any)=>(
                                                            <Text key={_item.name} style={[styles.smallFontSizeSecond, styles.middle_width, existMinus(_item.scores.toLocaleString()) && {color: 'red'}]}>
                                                                {!existMinus(_item.scores.toLocaleString()) && "+"}
                                                                {_item.scores.toLocaleString()}
                                                            </Text>
                                                        ))
                                                    }
                                                </View>

                                                {
                                                    results.data.grade_data_month.map((_item:any)=>(
                                                        <View style={{flexDirection: 'row', paddingVertical: 5}} key={_item.date}>
                                                            <Text style={[styles.smallFontSizeSecond, styles.middle_width]}>{_item.date}</Text>
                                                            <Text style={[styles.smallFontSizeSecond, styles.middle_width, existMinus(_item[0].scores.toLocaleString()) && {color: 'red'}]}>
                                                                {!existMinus(_item[0].scores.toLocaleString()) && "+"}
                                                                {_item[0].scores.toLocaleString()}
                                                            </Text>
                                                            <Text style={[styles.smallFontSizeSecond, styles.middle_width, existMinus(_item[1].scores.toLocaleString()) && {color: 'red'}]}>
                                                                {!existMinus(_item[1].scores.toLocaleString()) && "+"}
                                                                {_item[1].scores.toLocaleString()}
                                                            </Text>
                                                            <Text style={[styles.smallFontSizeSecond, styles.middle_width, existMinus(_item[2].scores.toLocaleString()) && {color: 'red'}]}>
                                                                {!existMinus(_item[2].scores.toLocaleString()) && "+"}
                                                                {_item[2].scores.toLocaleString()}
                                                            </Text>
                                                            {_item[3] && (<Text style={[styles.smallFontSizeSecond, styles.middle_width, existMinus(_item[3].scores.toLocaleString()) && {color: 'red'}]}>
                                                                {!existMinus(_item[3].scores.toLocaleString()) && "+"}
                                                                {_item[3].scores.toLocaleString()}
                                                            </Text>)}
                                                        </View>
                                                    ))
                                                }
                                            </View>
                                        ) : (
                                            <Text style={styles.smallFontSize}>データがありません</Text>
                                        )
                                    ) : (
                                        ''
                                    )
                                }
                            </ScrollView>
                        )
                    }
                </View>
        
            </View>
        </View>
    )
}

export default Member;