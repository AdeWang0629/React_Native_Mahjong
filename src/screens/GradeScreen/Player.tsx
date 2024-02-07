import React, {useEffect, useState} from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./style";
import { useGetPlayerQuery, useGetPlayerClassMutation, useGetPlayerMemberMutation } from "../../api/playerEditApi";
import  Icon  from "react-native-vector-icons/Ionicons";
import globalMarginStyles from "../../theme/margin";
import Spinner from 'react-native-loading-spinner-overlay';
import { existMinus } from "../../util/global";

const Player : React.FC = () => {
    
    const {data:getPlayer, isLoading} = useGetPlayerQuery(1);
    const [ getPlayerMember, resultsMember] = useGetPlayerMemberMutation();

    const [player, setPlayer] = useState<any>([]);
    const [selecetBoxState, setSelecteBoxState] = useState(false);
    const [selectPlayer, setSelectePlayer] = useState<string>("");

    useEffect(()=>{
        setPlayer(getPlayer);
    }, [getPlayer]);
    
    useEffect(()=>{
        if (player.length && player !== undefined) {
            const data = {
                'id' : player[0]['id'],
            }
            getPlayerMember(data);
            setSelectePlayer(player[0]['name']);
        }
    }, [player]);

    const handleSelectBox = async () => {
        setSelecteBoxState(!selecetBoxState);
    }

    const toggle = (id:number, name:string) => {
        const data = {
            'id' : id,
        }
        getPlayerMember(data);
        setSelecteBoxState(!selecetBoxState);
        setSelectePlayer(name);
    }

    if (isLoading) {
        return <Spinner visible={true} />;
    }

    if (resultsMember.data !== undefined) {
        console.log(resultsMember.data.grade_data_player_sum, "grade_data_player_sum");
        // console.log(existMinus(resultsMember.data.grade_data_player_sum.toLocaleString()));
        console.log(resultsMember.data.grade_data_player, "grade_data_player");
        console.log(resultsMember.data.grade_data_player_sum, "grade_data_player_sum");
    }

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.selectBoxContaier}>
                    
                    <TouchableOpacity onPress={handleSelectBox}>
                        <View style={styles.selectBox}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.smallFontSize}>
                                    {
                                        selectPlayer && selectPlayer
                                    }
                                </Text>
                                <Icon name="caret-down-outline" size={38} style={{marginTop: 2}} />
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
                                                <TouchableOpacity key={item.id} onPress={()=>toggle(item.id, item.name)}>
                                                    <View style={styles.playerItem}>
                                                        <Text style={styles.smallFontSize}>{item.name}</Text>
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
                                    resultsMember.data !== undefined ? (
                                        resultsMember.data.dataState ? (
                                            <View>                                             
                                                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                                                    <Text style={[styles.smallFontSizeSecond, styles.middle_width]}>合計</Text>
                                                    <Text style={[styles.smallFontSizeSecond, styles.middle_width, existMinus(resultsMember.data.grade_data_player_sum.toLocaleString()) && {color: 'red'}]}>
                                                        {!existMinus(resultsMember.data.grade_data_player_sum.toLocaleString()) && "+"}
                                                        {parseInt(resultsMember.data.grade_data_player_sum, 10).toLocaleString()}</Text>
                                                </View>

                                                {
                                                    resultsMember.data.grade_data_player.map((_item:any)=>(
                                                        <View style={{flexDirection: 'row', paddingVertical: 5}} key={_item.date}>
                                                            <Text style={[styles.smallFontSizeSecond, styles.middle_width]}>{_item.date}</Text>
                                                            <Text style={[styles.smallFontSizeSecond, styles.middle_width, existMinus(_item.scores.toLocaleString()) && {color: 'red'}]}>
                                                                {!existMinus(_item.scores.toLocaleString()) && "+"}
                                                                {_item.scores.toLocaleString()}
                                                            </Text>
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

export default Player;