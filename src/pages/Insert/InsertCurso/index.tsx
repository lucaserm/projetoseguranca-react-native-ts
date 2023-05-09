import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import Card from '../../../components/Card';
import Api from '../../../api';
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';

export default function InsertCurso() {
	const navigation = useNavigation();

	const [message, setMessage] = useState('');
	const [nome, setNome] = useState('');
	const [periodo, setPeriodo] = useState('');

	const handleSubmit = async () => {
		if (nome == '') return setMessage('Insira um nome para o curso.');
		if (periodo == '') return setMessage('Insira o período do curso.');
		await Api.post('curso/salvar', { nome, periodo });
		setNome('');
		setPeriodo('');
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			{message !== '' && (
				<Message message={message} handleClose={() => setMessage('')} />
			)}
			<Card position={'center'}>
				<View
					style={[
						styles.cardContainer,
						specificStyles.cardContainer,
						{ justifyContent: 'center', flex: 1 },
					]}
				>
					<Text style={[styles.cardText]}>Inserir Curso</Text>
					<TextInput
						style={styles.cardInput}
						placeholder='NOME DO CURSO'
						placeholderTextColor={'#EEE'}
						value={nome}
						onChangeText={(value) => setNome(value)}
					/>
					<TextInput
						style={styles.cardInput}
						placeholder='PERIODO DO CURSO'
						placeholderTextColor={'#EEE'}
						value={periodo}
						onChangeText={(value) => setPeriodo(value)}
					/>
					<Separator />
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
