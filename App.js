import React from 'react';
import { StatusBar, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Login } from './src/screens';
import { Register } from './src/screens/';
import { BookDetail, Category } from './src/screens/';
import { Search } from './src/screens/';
import { Setting } from './src/screens/';
import { Profile } from './src/screens/';
import { ListBook } from './src/screens/';
import { ChapterDetail } from './src/screens/';
import Tabs from './src/navigation/tabs';

StatusBar.setHidden(true);

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		border: 'transparent',
	},
};

const Stack = createStackNavigator();

const App = () => {
	let [fontsLoaded] = useFonts({
		'Literata-Regular': require('./src/assets/fonts/Literata-Regular.ttf'),
		'Roboto-Black': require('./src/assets/fonts/Roboto-Black.ttf'),
		'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
		'Museo-Sans': require('./src/assets/fonts/MuseoSansCyrl.otf'),
		'Pala-tino': require('./src/assets/fonts/Palatino.ttf'),
		'Product-Sans': require('./src/assets/fonts/Product-Sans-Regular.ttf'),
		'Colus-Regular': require('./src/assets/fonts/Colus-Regular.ttf'),
		'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
		'Traveling-Typewriter': require('./src/assets/fonts/TravelingTypewriter.ttf'),
	});
	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<NavigationContainer theme={theme}>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
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
					{/* Profile Screens */}
					<Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
					{/* BookDetail Screens */}
					<Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />
					{/* ListBook Screens */}
					<Stack.Screen name="ListBook" component={ListBook} options={{ headerShown: false }} />
					{/* Category Screens */}
					<Stack.Screen name="Category" component={Category} options={{ headerShown: false }} />
					{/* ChapterDetail Screens */}
					<Stack.Screen name="ChapterDetail" component={ChapterDetail} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
};

export default App;
