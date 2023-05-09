import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import Card from '../../../components/Card';
import Api from '../../../api';
import { useAuth } from '../../../context/AuthProvider/useAuth';
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';

export default function InsertStudentRegistro() {
	const navigation = useNavigation();
	const auth = useAuth();
	const [message, setMessage] = useState('');
	const [descricao, setDescricao] = useState('');
	const [diaLiberacao, setDiaLiberacao] = useState('');

	const handleSubmit = async () => {
		if (descricao == '') return setMessage('Insira uma descrição.');
		if (diaLiberacao == '')
			return setMessage('Insira uma data para liberação.');
		try {
			await Api.post('/estudante/registro/salvar/?id=' + auth.estudante[0].id, {
				descricao,
				dia_liberacao: diaLiberacao,
			});
			await auth.getEstudante({
				ra: '',
				nome: auth.estudante[0].nome,
				cpf: '',
			});
			setDescricao('');
			setDiaLiberacao('');
		} catch (e) {
			return;
		}
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
					<Text style={[styles.cardText]}>Inserir Registro</Text>
					<TextInput
						style={styles.cardInput}
						placeholder='DESCRIÇÃO'
						placeholderTextColor={'#EEE'}
						value={descricao}
						onChangeText={(value) => setDescricao(value)}
					/>
					<TextInput
						style={styles.cardInput}
						placeholder='DIA DA LIBERAÇÃO'
						placeholderTextColor={'#EEE'}
						value={diaLiberacao}
						onChangeText={(value) => setDiaLiberacao(value)}
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
