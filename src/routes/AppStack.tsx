import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();
const ModalStack = createStackNavigator();

import Message from '../components/Message';
import Users from '../components/Users';
import { View, Text, Button, Image, StyleSheet } from "react-native";

import HomeScreen from '../screens/HomeScreen/index'

type RootStackParamList = {
  Home: undefined;
  Message: undefined;
  Users: undefined;
};

type HomeScreenNavigationProp = {
    [x: string]: any;
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  };

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
  const crown = require("../../assets/6.png");
  const exclamation = require("../../assets/7.png");

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
                  name="Details" 
                  component={HomeScreen} 
                  options={{
                      headerTitle: "5656",
                      headerRight: () => (
                        <Button
                          onPress={() => alert('This is a button!')}
                          title="Info"
                          color="#fff"
                        />
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
})