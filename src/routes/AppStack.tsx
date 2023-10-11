import * as React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();
const ModalStack = createStackNavigator();

import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import  Icon  from "react-native-vector-icons/Ionicons";

import COLORS from "../theme/colors";
import MARGIN from '../theme/margin';

import HomeScreen from '../screens/HomeScreen/index';
import GameEditScreen from '../screens/GameEditScreen';
import PlayerChooseScreen from "../screens/PlayerChooseScreen";
import PlayerEditScreen from "../screens/PlayerEditScreen";
import ScoreScreen from "../screens/ScoreScreen";

import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setModalState } from '../store/global';

const AppStack = () => {

  //ホーム画面のヘッダー画像
  const crown = require("../../assets/6.png");

  //ゲーム編集画面のヘッダー画像
  const heart = require("../../assets/heart.png");

  //プレイヤー選択画面のヘッダー画像
  const setting = require("../../assets/setting.png");
  
  const { modalState } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();

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
                backgroundColor: '#f7f6f6'
              },
              headerLeft: ()=>(
                <TouchableOpacity
                  onPress={() => navigation.push('PlayerEditScreen')}
                >
                    <Image source={setting} style={styles.avatarImage_second} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <>
                  <View style={styles.avatarContainer}>
                    <Image source={crown} style={styles.avatarImage_first} />
                  </View>
                  <TouchableOpacity
                  onPress={() => navigation.navigate('GameEditScreen')}
                  >
                    <Icon name="add-circle-outline" size={30} style={MARGIN.marginLeft5}/>
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
                    <Icon name="arrow-back-circle" size={30} style={MARGIN.marginLeft5}/>
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
                    onPress={() => navigation.goBack()}
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
                      onPress={() => {dispatch(setModalState(true));}}
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
                    <Icon name="arrow-back-circle" size={30} style={MARGIN.marginLeft5}/>
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
  avatarImage_Left: {
    width: 25,
    height: 25
  },
  headerText: {
    fontSize: 15, 
    fontWeight: '700', 
    letterSpacing: 2
  }
})