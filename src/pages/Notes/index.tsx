import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { globalStyles as styles } from '../../styles/globalStyles';
import { specificStyles } from './styles';

import Card from '../../components/Card';
import { propsStack } from '../mainStackParams';
import { useNavigation } from '@react-navigation/native';

export default function Notes() {
	const navigation = useNavigation<propsStack>();
	const handleNavigate = (route: string) => {
		switch (route) {
			case 'Sent':
				navigation.navigate('NotesSent');
				break;
			case 'Approved':
				navigation.navigate('NotesApproved');
				break;
			case 'Repproved':
				navigation.navigate('NotesRepproved');
				break;
			case 'Obs':
				navigation.navigate('NotesObs');
				break;
		}
	};
	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={styles.cardText}>Ocorrências</Text>
					<TouchableOpacity
						style={[
							styles.cardButton,
							specificStyles.cardButton,
							{ backgroundColor: '#Faaa00' },
						]}
						onPress={() => handleNavigate('Sent')}
					>
						<Text style={styles.cardButtonText}>Encaminhadas</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.cardButton,
							specificStyles.cardButton,
							{ backgroundColor: '#2Fa33B' },
						]}
						onPress={() => handleNavigate('Approved')}
					>
						<Text style={styles.cardButtonText}>Aprovadas</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.cardButton, specificStyles.cardButton]}
						onPress={() => handleNavigate('Repproved')}
					>
						<Text style={styles.cardButtonText}>Reprovadas</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.cardButton,
							specificStyles.cardButton,
							{ backgroundColor: '#0050FF' },
						]}
						onPress={() => handleNavigate('Obs')}
					>
						<Text style={styles.cardButtonText}>Observações</Text>
					</TouchableOpacity>
				</View>
			</Card>
		</View>
	);
}
