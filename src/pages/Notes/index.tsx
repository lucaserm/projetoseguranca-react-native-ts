import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { globalStyles as styles } from '../../styles/globalStyles';
import { specificStyles } from './styles';

import Card from '../../components/Card';
import { propsStack } from '../mainStackParams';
import { useNavigation } from '@react-navigation/native';
import NotesButton from '../../components/NotesButton';

const routes: any = {
	Sent: 'NotesSent',
	Approved: 'NotesApproved',
	Repproved: 'NotesRepproved',
	Obs: 'NotesObs',
};

export default function Notes() {
	const navigation = useNavigation<propsStack>();
	const handleNavigate = (route: string) => {
		navigation.navigate(routes[route]);
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={styles.cardText}>Ocorrências</Text>
					<NotesButton
						backgroundColor='#Faaa00'
						text='Encaminhadas'
						onPress={() => handleNavigate('Sent')}
					/>
					<NotesButton
						backgroundColor='#2Fa33B'
						text='Aprovadas'
						onPress={() => handleNavigate('Approved')}
					/>
					<NotesButton
						backgroundColor='#e32f45'
						text='Reprovadas'
						onPress={() => handleNavigate('Repproved')}
					/>
					<NotesButton
						backgroundColor='#0050FF'
						text='Observações'
						onPress={() => handleNavigate('Obs')}
					/>
				</View>
			</Card>
		</View>
	);
}
