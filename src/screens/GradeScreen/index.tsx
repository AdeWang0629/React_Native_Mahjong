import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./style";
import Player from "./Memeber";
import Member from "./Player";
import COLORS from "../../theme/colors";

const GradeScreen : React.FC = () => {
    const [selectTap, setSelecteTap] = useState(0);

    return (
        <View>

            <View style={styles.rowContainer}>

                <TouchableOpacity onPress={()=>setSelecteTap(0)}>
                    <View style={[styles.headerTap, selectTap == 0 && {backgroundColor: COLORS.SORREL}]}>
                        <Text style={styles.normalFontSize}>メンバー成績</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setSelecteTap(1)}>
                    <View style={[styles.headerTap, selectTap == 1 && {backgroundColor: COLORS.SORREL}]}>
                        <Text style={styles.normalFontSize}>プレイヤーの成績</Text>
                    </View>
                </TouchableOpacity>

            </View>

            {selectTap == 0 ? <Player /> : <Member />}
        </View>
    )
}

export default GradeScreen;