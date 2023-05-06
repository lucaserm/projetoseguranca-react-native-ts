import React, { ReactNode } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../context/AuthProvider/useAuth';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Notes from '../../pages/Notes';
import Profile from '../../pages/Profile';
import SearchStack from '../SearchStack';
import InsertStack from '../InsertStack';
import NotesStack from '../NotesStack';

const Tab = createBottomTabNavigator();

export default function AuthTab() {
	const auth = useAuth();
	return (
		<>
			{auth.token ? (
				<Tab.Navigator
					screenOptions={{
						headerShown: false,
						tabBarStyle: [styles.navigator, styles.shadow],
						tabBarShowLabel: false,
					}}
					initialRouteName='Home'
				>
					<Tab.Screen
						name='Search'
						component={SearchStack}
						options={{
							tabBarIcon: ({ focused }): ReactNode => {
								return (
									<View style={styles.viewIcon}>
										<Ionicons
											name='search'
											size={25}
											color={focused ? '#2Fa33B' : '#748c94'}
										/>
										<Text
											style={{
												color: focused ? '#2Fa33B' : '#748c94',
												fontSize: 12,
											}}
										>
											Procurar
										</Text>
									</View>
								);
							},
						}}
					/>
					<Tab.Screen
						name='Add'
						component={InsertStack}
						options={{
							tabBarIcon: ({ focused }): ReactNode => {
								return (
									<View style={styles.viewIcon}>
										<Ionicons
											name='add-circle'
											size={25}
											color={focused ? '#2Fa33B' : '#748c94'}
										/>
										<Text
											style={{
												color: focused ? '#2Fa33B' : '#748c94',
												fontSize: 12,
											}}
										>
											Cadastros
										</Text>
									</View>
								);
							},
						}}
					/>
					<Tab.Screen
						name='Home'
						component={Home}
						options={{
							tabBarIcon: ({ focused }): ReactNode => {
								return (
									<View style={[styles.centerIcon, styles.shadow]}>
										<AntDesign
											name='home'
											size={25}
											color={focused ? '#2Fa33B' : '#748c94'}
										/>
									</View>
								);
							},
						}}
					/>
					<Tab.Screen
						name='Rel'
						component={NotesStack}
						options={{
							tabBarIcon: ({ focused }): ReactNode => {
								return (
									<View style={styles.viewIcon}>
										<Ionicons
											name='paper-plane-outline'
											size={25}
											color={focused ? '#2Fa33B' : '#748c94'}
										/>
										<Text
											style={{
												color: focused ? '#2Fa33B' : '#748c94',
												fontSize: 12,
											}}
										>
											Ocorrências
										</Text>
									</View>
								);
							},
						}}
					/>
					<Tab.Screen
						name='Profile'
						component={Profile}
						options={{
							tabBarIcon: ({ focused }): ReactNode => {
								return (
									<View style={styles.viewIcon}>
										<Ionicons
											name='person-circle'
											size={25}
											color={focused ? '#2Fa33B' : '#748c94'}
										/>
										<Text
											style={{
												color: focused ? '#2Fa33B' : '#748c94',
												fontSize: 12,
											}}
										>
											Perfil
										</Text>
									</View>
								);
							},
						}}
					/>
				</Tab.Navigator>
			) : (
				<Login />
			)}
		</>
	);
}

const styles = StyleSheet.create({
	viewIcon: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	centerIcon: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF',
		width: 60,
		height: 60,
		borderRadius: 30,
		marginTop: -30,
	},
	navigator: {
		position: 'absolute',
		bottom: 25,
		left: 20,
		right: 20,
		backgroundColor: '#FFF',
		borderRadius: 15,
	},
	shadow: {
		shadowColor: '#7F6DF0',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
});
