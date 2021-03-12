
import React from 'react';
import { StatusBar,ImageBackground } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Login } from "./src/screens"
import { Register } from './src/screens/'
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { BookDetail, Category } from "./src/screens/";
import { Search } from "./src/screens/";
import { Setting } from "./src/screens/";
import { ListBook } from "./src/screens/";
import { BookChapter } from "./src/screens/";
import { ChapterDetail } from "./src/screens/";
import { ChapterList } from "./src/screens/";
import Tabs from "./src/navigation/tabs";

StatusBar.setHidden(true);

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
        'Nabila': require('./src/assets/fonts/Nabila.ttf'),
        'Roboto-Black': require('./src/assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
        'TheCircous': require('./src/assets/fonts/TheCircous.ttf'),
        'Colus-Regular': require('./src/assets/fonts/Colus-Regular.ttf'),
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
                    initialRouteName={'Login'}
                >
                    {/* Login Screens */}
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    {/* Register Screens */}
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    {/* Home Screens */}
                    <Stack.Screen name="Home" component={Tabs} />
                    {/* Search Screens */}
                    <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
                    {/* Setting Screens */}
                    <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
                    {/* BookDetail Screens */}
                    <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />
                    {/* ListBook Screens */}
                    <Stack.Screen name="ListBook" component={ListBook} options={{ headerShown: false }}/>
                    {/* Category Screens */}
                    <Stack.Screen name="Category" component={Category} options={{ headerShown: false }}/>
                    {/* BookChapter Screens */}
                    <Stack.Screen name="BookChapter" component={BookChapter} options={{ headerShown: false }} />  
                    {/* ChapterDetail Screens */}
                    <Stack.Screen name="ChapterDetail" component={ChapterDetail} options={{ headerShown: false }} />
                    {/* ChapterList Screens */}
                    <Stack.Screen name="ChapterList" component={ChapterList} options={{ headerShown: false }} />
                    
                

                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default App;