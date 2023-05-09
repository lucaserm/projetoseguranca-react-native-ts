import React, { useState, useCallback } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import Card from '../../../components/Card';
import Api from '../../../api';
import { useAuth } from '../../../context/AuthProvider/useAuth';
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';

export default function InsertStudentNotes() {
	const navigation = useNavigation();
	const { token, estudante, getEstudante } = useAuth();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [status, setStatus] = useState('Encaminhada');
	const [relatorio, setRelatorio] = useState('');
	const [nomeUsuarioRelacionado, setNomeUsuarioRelacionado] = useState('');

	const handleSubmit = useCallback(async () => {
		if (!relatorio || !nomeUsuarioRelacionado) {
			return setMessage('Por favor, preencha todos os campos.');
		}
		setLoading(true);
		try {
			await Api.post('ocorrencia/salvar', {
				data_ocorrencia: new Date(),
				nome_usuario_relacionado: nomeUsuarioRelacionado,
				relatorio,
				status,
				estudante: {
					id: estudante?.[0]?.id || 0,
				},
				usuario: {
					id: token,
				},
			});
			try {
				await getEstudante({
					ra: '',
					nome: estudante?.[0]?.nome || '0',
					cpf: '',
				});
			} catch (e) {
				setMessage('Ocorreu um erro ao renovar o estudante.');
			}
		} catch (e) {
			setMessage('Ocorreu um erro ao salvar a ocorrência.');
		} finally {
			setRelatorio('');
			setNomeUsuarioRelacionado('');
			setLoading(false);
		}
	}, [
		relatorio,
		nomeUsuarioRelacionado,
		estudante,
		token,
		getEstudante,
		status,
	]);

	const handleSetStatus = () => {
		if (status === 'Encaminhada') return setStatus('Observação');
		if (status === 'Observação') return setStatus('Encaminhada');
	};

	const specificStylesStudentNote = StyleSheet.create({
		statusButton: {
			width: '90%',
			backgroundColor: status === 'Encaminhada' ? '#e32f45' : '#999',
		},
	});

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
					<Text style={[styles.cardText]}>Inserir Ocorrência</Text>
					{loading ? (
						<Loading />
					) : (
						<>
							<TextInput
								style={styles.cardInput}
								placeholder='RELATÓRIO'
								placeholderTextColor={'#EEE'}
								value={relatorio}
								onChangeText={(value) => setRelatorio(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='NOME USUARIO RELACIONADO'
								placeholderTextColor={'#EEE'}
								value={nomeUsuarioRelacionado}
								onChangeText={(value) => setNomeUsuarioRelacionado(value)}
							/>
							<TouchableOpacity
								style={[
									styles.cardButton,
									specificStylesStudentNote.statusButton,
								]}
								onPress={handleSetStatus}
							>
								<Text style={styles.cardButtonText}>
									[ {status === 'Encaminhada' ? 'Ocorrência' : status} ]
								</Text>
							</TouchableOpacity>
							<Separator />
							<Button text={'Enviar'} onPress={handleSubmit} />
						</>
					)}
				</View>
			</Card>
			<Button text={'Voltar'} onPress={() => navigation.goBack()} back={true} />
		</View>
	);
}
