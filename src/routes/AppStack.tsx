import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();
const ModalStack = createStackNavigator();

import { View, Text, Button, Image, StyleSheet } from "react-native";

import COLORS from "../theme/colors";

import HomeScreen from '../screens/HomeScreen/index';
import GameEditScreen from '../screens/GameEditScreen';

// function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//         <Button
//           title="Go to Details"
//           onPress={() => navigation.navigate('Details')}
//         />
//       </View>
//     );
//   }

// function DetailsScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
//   return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//         <Button
//           title="Go to Details... again"
//           onPress={() => navigation.push('Details')}
//         />
//       </View>
//   );
// }

const AppStack = () => {

  //ホーム画面のヘッダー画像
  const crown = require("../../assets/6.png");
  const exclamation = require("../../assets/7.png");

  //ゲーム編集画面のヘッダー画像
  const arrow_left = require("../../assets/left-arrow.png");
  const heart = require("../../assets/heart.png");

  return (
    <NavigationContainer>
        <Stack.Navigator>

            <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                  headerTitle: "ゲーム一覧",
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerStyle: {
                    backgroundColor: '#f7f6f6'
                  },
                  headerLeft: ()=>(
                    null
                  ),
                  headerRight: () => (
                    <View style={styles.avatarContainer}>
                      <Image source={crown} style={styles.avatarImage_first} />
                      <Image source={exclamation} style={styles.avatarImage_second} />
                    </View>
                  ),
                }}
            />

            <Stack.Screen 
                name="GameEditScreen" 
                component={GameEditScreen} 
                options={{
                    headerTitle: "ゲーム編集",
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerStyle: {
                      backgroundColor: COLORS.WHITE
                    },
                    headerLeft: ()=>(
                      null
                    ),
                    headerRight: () => (
                      <Image source={heart} style={styles.avatarImage_first} />
                    ),
                }}
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
    marginRight: 13
  },
  avatarImage_second: {
    width: 30,
    height: 30,
    marginRight: 13,
    paddingBottom: 3
  },
  avatarImage_Left: {
    width: 25,
    height: 25
  }
})