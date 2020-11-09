import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Login from './screens/Login'
import Register from './screens/Register'
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { BookDetail, Category } from "./screens/";
import { Search } from "./screens/";
import { Setting } from "./screens/";
import { ListBook } from "./screens/";
import Tabs from "./navigation/tabs";


const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}

const Stack = createStackNavigator();

const App = () => {

    let [fontsLoaded] = useFonts({
        'Nabila': require('./assets/fonts/Nabila.ttf'),
        'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'TheCircous': require('./assets/fonts/TheCircous.ttf'),
        'Colus-Regular': require('./assets/fonts/Colus-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            
            <NavigationContainer theme={theme}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'Home'}
                >
                    <Stack.Screen name="ListBook" component={ListBook} />
                    <Stack.Screen name="Category" component={Category} />

                    <Stack.Screen name="Home" component={Tabs} /> 
                    
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    
                    {/* Screens */}
                    <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />

                    <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />

                    <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
                    
                    
                

                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default App;