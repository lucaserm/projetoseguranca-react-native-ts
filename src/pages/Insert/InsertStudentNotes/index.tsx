import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import Card from '../../../components/Card';
import Api from '../../../api';
import { useAuth } from '../../../context/AuthProvider/useAuth';

export default function InsertStudentNotes() {
	const auth = useAuth();
	const navigation = useNavigation();

	const [message, setMessage] = useState('');
	const data = new Date();
	const status = 'Encaminhada';
	const [relatorio, setRelatorio] = useState('');
	const [nomeUsuarioRelacionado, setNomeUsuarioRelacionado] = useState('');

	const handleSubmit = async () => {
		await Api.post('ocorrencia/salvar', {
			data_ocorrencia: data,
			nome_usuario_relacionado: nomeUsuarioRelacionado,
			relatorio,
			status,
			estudante: {
				id: auth.estudante ? auth.estudante[0].id : 0,
			},
			usuario: {
				id: auth.token,
			},
		});
	};

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
				<View
					style={[
						styles.cardContainer,
						specificStyles.cardContainer,
						{ justifyContent: 'center', flex: 1 },
					]}
				>
					<Text style={[styles.cardText]}>Inserir Ocorrência</Text>
					<TextInput
						style={styles.cardInput}
						placeholder='NOME USUARIO RELACIONADO'
						placeholderTextColor={'#EEE'}
						value={nomeUsuarioRelacionado}
						onChangeText={(value) => setNomeUsuarioRelacionado(value)}
					/>
					<TextInput
						style={styles.cardInput}
						placeholder='RELATÓRIO'
						placeholderTextColor={'#EEE'}
						value={relatorio}
						onChangeText={(value) => setRelatorio(value)}
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
