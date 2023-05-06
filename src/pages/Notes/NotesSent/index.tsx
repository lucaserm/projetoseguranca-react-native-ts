import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import Card from '../../../components/Card';

export default function NotesSent() {
	const navigation = useNavigation();

	const [message, setMessage] = useState('');

	return (
		<View style={[styles.container, specificStyles.container]}>
			{message !== '' && (
				<View style={styles.message}>
					<Text style={styles.messageText}>{message}</Text>
					<TouchableOpacity
						style={styles.messageButton}
						onPress={() => setMessage('')}
					>
						<AntDesign name={'close'} size={20} color={'#FAFAFA'} />
					</TouchableOpacity>
				</View>
			)}
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={[styles.cardText]}>Ocorrências Encaminhadas</Text>
				</View>
			</Card>
			<TouchableOpacity
				style={[styles.cardButton, { marginTop: 15 }]}
				onPress={() => navigation.goBack()}
			>
				<Text style={styles.cardButtonText}>Voltar</Text>
			</TouchableOpacity>
		</View>
	);
}
