import React, {useEffect, useState} from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { useGetPlayerQuery, useGetPlayerClassMutation, useGetPlayerMemberMutation } from "../../api/playerEditApi";
import  Icon  from "react-native-vector-icons/Ionicons";
import { CheckBox } from "react-native-btr";
import globalMarginStyles from "../../theme/margin";
import Spinner from 'react-native-loading-spinner-overlay';

const Member : React.FC = () => {
    
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
        console.log(resultsMember.data.grade_data_player, "grade_data_player");
        console.log(resultsMember.data.grade_data_player_sum, "grade_data_player_sum");
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.selectBoxContaier}>
                    
                    <TouchableOpacity onPress={handleSelectBox}>
                        <View style={styles.selectBox}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.smallFontSize}>
                                    {
                                        selectPlayer && selectPlayer
                                    }
                                </Text>
                                <Icon name="caret-down-outline" size={23}/>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {
                        selecetBoxState ? (
                            <View style={styles.selectBoxContent}>
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
                            </View>
                        ) : (
                            <View style={[globalMarginStyles.marginTop20]}>
                                {
                                    resultsMember.data !== undefined ? (
                                        resultsMember.data.dataState ? (
                                            <View>                                             
                                                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                                                    <Text style={[styles.smallFontSizeSecond, styles.middle_width]}>合計</Text>
                                                    <Text style={[styles.smallFontSizeSecond, styles.middle_width]}>{resultsMember.data.grade_data_player_sum}</Text>
                                                </View>

                                                {
                                                    resultsMember.data.grade_data_player.map((_item:any)=>(
                                                        <View style={{flexDirection: 'row', paddingVertical: 5}} key={_item.date}>
                                                            <Text style={[styles.smallFontSizeSecond, styles.middle_width]}>{_item.date}</Text>
                                                            <Text style={[styles.smallFontSizeSecond, styles.middle_width]}>{_item.scores}</Text>
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
                            </View>
                        )
                    }
                </View>
        
            </View>
        </ScrollView>
    )
}

export default Member;