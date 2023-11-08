import * as React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();
const ModalStack = createStackNavigator();

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import  Icon  from "react-native-vector-icons/Ionicons";

import COLORS from "../theme/colors";
import MARGIN from '../theme/margin';

import HomeScreen from '../screens/HomeScreen';
import GameEditScreen from '../screens/GameEditScreen';
import PlayerChooseScreen from "../screens/PlayerChooseScreen";
import PlayerEditScreen from "../screens/PlayerEditScreen/index";
import ScoreScreen from "../screens/ScoreScreen";
import ScoreViewScreen from "../screens/ScoreScreen/view";
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setModalState, setAlertModalState } from '../store/global';
import { useUpdatePlayerMutation } from '../api/playerEditApi';
import { setPlayerList } from '../store/global';

const AppStack = () => {

  //ホーム画面のヘッダー画像
  const crown = require("../../assets/6.png");

  //ゲーム編集画面のヘッダー画像
  const heart = require("../../assets/heart.png");

  //プレイヤー選択画面のヘッダー画像
  const setting = require("../../assets/setting.png");
  
  const { playerlist, modalState } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();
  const [ updatePlayer ] = useUpdatePlayerMutation();
  console.log(playerlist);
  return (
    <NavigationContainer>
        <Stack.Navigator>

          {/* ホーム画面 */}
          <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
            options={({navigation})=>({
              headerTitle: "ゲーム一覧",
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerStyle: {
                backgroundColor: COLORS.WHITE
              },
              headerLeft: ()=>(
                <TouchableOpacity
                  onPress={() => navigation.push('PlayerEditScreen')}
                >
                    <Image source={setting} style={[styles.avatarImage_setting, MARGIN.marginLeft10]} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <>
                  <TouchableOpacity
                  onPress={() => {
                      dispatch(setPlayerList([]));
                      navigation.navigate('GameEditScreen');
                    }
                  }>
                    <Icon name="add-outline" size={30}/>
                  </TouchableOpacity>
                </>
              ),
            })}
          />

          {/* ゲーム編集画面 */}
          <Stack.Screen 
            name="GameEditScreen" 
            component={GameEditScreen} 
            options={({navigation})=>({
                headerTitle: "ゲーム編集",
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerStyle: {
                  backgroundColor: COLORS.WHITE
                },
                headerLeft: ()=>(
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                  >
                    <View style={styles.leftSide}>
                      <Icon name="chevron-back-outline" size={30} style={MARGIN.marginLeft5}/>
                      <Text style={{fontSize: 18}}>一覧</Text>
                    </View>
                  </TouchableOpacity>
                )
            })}
          />

          {/* プレイヤー選択画面 */}
          <Stack.Screen 
            name="PlayerChooseScreen" 
            component={PlayerChooseScreen} 
            options={({navigation})=>({
                headerTitle: "プレイヤー選択",
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerStyle: {
                  backgroundColor: COLORS.WHITE
                },
                headerLeft: ()=>(
                  <TouchableOpacity
                    onPress={() => {
                      const count = playerlist.filter((item)=> item.checked == true).length;
                      if (2 < count) {   
                        // updatePlayer(playerlist);           
                        navigation.goBack();
                      }else{
                        dispatch(setAlertModalState(true));
                      }
                    }}
                  >
                    <Icon name="arrow-back-circle" size={30} style={MARGIN.marginLeft5}/>
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <View style={styles.avatarContainer}>
                    <TouchableOpacity
                      onPress={() => navigation.push('PlayerEditScreen')}
                    >
                        <Image source={setting} style={styles.avatarImage_second} />
                    </TouchableOpacity>
                  </View>
                ),
            })}
          />

          {/* プレイヤー編集画面 */}
          <Stack.Screen 
            name="PlayerEditScreen" 
            component={PlayerEditScreen} 
            options={({navigation})=>({
                headerTitle: "プレイヤー編集",
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerStyle: {
                  backgroundColor: COLORS.WHITE
                },
                headerLeft: ()=>(
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.headerText}>完了</Text>
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <View style={styles.avatarContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(setModalState(true));
                      }}
                    >
                      <Icon name="add" size={33}></Icon>
                    </TouchableOpacity>
                  </View>
                ),
                modalState: modalState
            })}
          />

          {/* スコア画面 */}
          <Stack.Screen 
            name="ScoreScreen" 
            component={ScoreScreen} 
            options={({navigation})=>({
                headerTitle: "スコア",
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerStyle: {
                  backgroundColor: COLORS.WHITE
                },
                headerLeft: ()=>(
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                  >
                    <View style={styles.leftSide}>
                      <Icon name="chevron-back-outline" size={30} style={MARGIN.marginLeft5}/>
                      <Text style={{fontSize: 18}}>一覧</Text>
                    </View>
                  </TouchableOpacity>
                )
            })}
          />

          {/* スコアビュー画面 */}
          <Stack.Screen 
            name="ScoreViewScreen" 
            component={ScoreViewScreen} 
            options={({navigation})=>({
                headerTitle: "スコアビュー",
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerStyle: {
                  backgroundColor: COLORS.WHITE
                },
                headerLeft: ()=>(
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                  >
                    <View style={styles.leftSide}>
                      <Icon name="chevron-back-outline" size={30} style={MARGIN.marginLeft5}/>
                      <Text style={{fontSize: 18}}>一覧</Text>
                    </View>
                  </TouchableOpacity>
                )
            })}
          />

        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: 'row'
  },

  avatarImage_first: {
    width: 30,
    height: 30,
    marginRight: 1,
  },
  avatarImage_second: {
    width: 30,
    height: 30,
    marginLeft: 8,
    paddingBottom: 3
  },
  avatarImage_setting: {
    width: 25,
    height: 25,
    paddingBottom: 3
  },
  avatarImage_Left: {
    width: 25,
    height: 25
  },
  headerText: {
    fontSize: 15, 
    fontWeight: '700', 
    letterSpacing: 2
  },
  leftSide: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})