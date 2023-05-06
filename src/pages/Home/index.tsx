import React, { useState } from 'react';
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import Card from '../../components/Card';
import { propsBottom } from '../mainBottomTabParams';
import { useNavigation } from '@react-navigation/native';
import { globalStyles as styles } from '../../styles/globalStyles';
import { specificStyles } from './styles';

export default function Home() {
	const navigation = useNavigation<propsBottom>();

	const handleNavigate = (place: string) => {
		switch (place) {
			case 'Search':
				navigation.navigate('Search');
				break;
			case 'Add':
				navigation.navigate('Add');
				break;
			case 'Rel':
				navigation.navigate('Rel');
				break;
			case 'Profile':
				navigation.navigate('Profile');
				break;
		}
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Card position={'right'}>
					<View style={[styles.cardContainer, specificStyles.cardContainer]}>
						<Text style={styles.cardText}>Procurar</Text>
						<TouchableOpacity
							style={[styles.cardButton, specificStyles.cardButton]}
							onPress={() => handleNavigate('Search')}
						>
							<Text style={styles.cardButtonText}>Ver</Text>
						</TouchableOpacity>
					</View>
				</Card>
				<Card position={'left'}>
					<View style={[styles.cardContainer, specificStyles.cardContainer]}>
						<Text style={styles.cardText}>Cadastros</Text>
						<TouchableOpacity
							style={[styles.cardButton, specificStyles.cardButton]}
							onPress={() => handleNavigate('Add')}
						>
							<Text style={styles.cardButtonText}>Ver</Text>
						</TouchableOpacity>
					</View>
				</Card>
				<Card position={'right'}>
					<View style={[styles.cardContainer, specificStyles.cardContainer]}>
						<Text style={styles.cardText}>Ocorrências</Text>
						<TouchableOpacity
							style={[styles.cardButton, specificStyles.cardButton]}
							onPress={() => handleNavigate('Rel')}
						>
							<Text style={styles.cardButtonText}>Ver</Text>
						</TouchableOpacity>
					</View>
				</Card>
				<Card position={'left'}>
					<View style={[styles.cardContainer, specificStyles.cardContainer]}>
						<Text style={styles.cardText}>Perfil</Text>
						<TouchableOpacity
							style={[styles.cardButton, specificStyles.cardButton]}
							onPress={() => handleNavigate('Profile')}
						>
							<Text style={styles.cardButtonText}>Ver</Text>
						</TouchableOpacity>
					</View>
				</Card>
			</View>
		</ScrollView>
	);
}
