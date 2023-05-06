import 'react-native-reanimated';
import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider } from './src/context/AuthProvider';
import { useAuth } from './src/context/AuthProvider/useAuth';
import Login from './src/pages/Login';
import AuthTab from './src/navigation/AuthTab';

const Stack = createStackNavigator();

export default function App() {
	return (
		<AuthProvider>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{ headerShown: false }}
					initialRouteName='HomeLogged'
				>
					<Stack.Screen name='HomeLogged' component={AuthTab} />
					<Stack.Screen name='Login' component={Login} />
				</Stack.Navigator>
			</NavigationContainer>
		</AuthProvider>
	);
}
