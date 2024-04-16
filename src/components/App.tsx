import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import AuthScreen from "./AuthScreen"
import CameraScreen from "./CameraScreen"
import ShootingSessionScreen from "./ShootingSessionScreen"
import ShootingSessionsScreen from "./ShootingSessionsScreen"
import CreateSessionScreen from "./CreateSessionScreen"

const Stack = createNativeStackNavigator()

function App(): React.JSX.Element {

    return (
        <NavigationContainer initialRouteName='AuthScreen'>
            <Stack.Navigator>
                <Stack.Screen name='SignIn' component={AuthScreen}/>
                <Stack.Screen name='Shooting session' component={ShootingSessionScreen} options={{headerShown: false}}/>
                <Stack.Screen name='Shooting sessions' component={ShootingSessionsScreen} options={{headerShown: false}}/>
                <Stack.Screen name='Create new session' component={CreateSessionScreen} options={{headerShown: false}}/>
                <Stack.Screen name='Camera' component={CameraScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App