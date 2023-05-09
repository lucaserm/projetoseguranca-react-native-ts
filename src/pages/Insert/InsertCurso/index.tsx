import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import Card from '../../../components/Card';
import Api from '../../../api';
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';

export default function InsertCurso() {
	const navigation = useNavigation();

	const [message, setMessage] = useState('');
	const [nome, setNome] = useState('');
	const [periodo, setPeriodo] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (!nome || !periodo)
			return setMessage('Por favor, preencha todos os campos.');
		setLoading(true);
		try {
			await Api.post('curso/salvar', { nome, periodo });
		} catch (e) {
			setMessage('Ocorreu um erro ao salvar o curso.');
		} finally {
			setNome('');
			setPeriodo('');
			setLoading(false);
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
					<Text style={[styles.cardText]}>Inserir Curso</Text>
					{loading ? (
						<Loading />
					) : (
						<>
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
							<Button text={'Enviar'} onPress={handleSubmit} back={true} />
						</>
					)}
				</View>
			</Card>
			<Button text={'Voltar'} onPress={() => navigation.goBack()} back={true} />
		</View>
	);
}
