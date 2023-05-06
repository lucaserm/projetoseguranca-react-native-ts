import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import Card from '../../../components/Card';

export default function InsertSubjectTime() {
	const navigation = useNavigation();

	const [message, setMessage] = useState('');
	const [periodo, setPeriodo] = useState('');
	const [diaSemana, setDiaSemana] = useState('');
	const [tempoInicio, setTempoInicio] = useState('');
	const [tempoFim, setTempoFim] = useState('');

	const handleSubmit = () => {};

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
					<Text style={[styles.cardText]}>Inserir Curso</Text>
					<TextInput
						style={styles.cardInput}
						placeholder='PERIODO'
						placeholderTextColor={'#EEE'}
						value={periodo}
						onChangeText={(value) => setPeriodo(value)}
					/>
					<TextInput
						style={styles.cardInput}
						placeholder='DIA DA SEMANA'
						placeholderTextColor={'#EEE'}
						value={diaSemana}
						onChangeText={(value) => setDiaSemana(value)}
					/>
					<TextInput
						style={styles.cardInput}
						placeholder='TEMPO INÍCIO'
						placeholderTextColor={'#EEE'}
						value={tempoInicio}
						onChangeText={(value) => setTempoInicio(value)}
					/>
					<TextInput
						style={styles.cardInput}
						placeholder='TEMPO FIM'
						placeholderTextColor={'#EEE'}
						value={tempoFim}
						onChangeText={(value) => setTempoFim(value)}
					/>
					<Text
						style={{ backgroundColor: '#DDD', height: 1, width: '80%' }}
					></Text>
					<TouchableOpacity style={[styles.cardButton]} onPress={handleSubmit}>
						<Text style={styles.cardButtonText}>Enviar</Text>
					</TouchableOpacity>
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
