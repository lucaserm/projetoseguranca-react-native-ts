import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import Card from '../../../components/Card';
import Api from '../../../api';
import { useAuth } from '../../../context/AuthProvider/useAuth';
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';

export default function InsertStudentNotes() {
	const auth = useAuth();
	const navigation = useNavigation();

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const data = new Date();
	const [status, setStatus] = useState('Encaminhada');
	const [relatorio, setRelatorio] = useState('');
	const [nomeUsuarioRelacionado, setNomeUsuarioRelacionado] = useState('');

	const handleSubmit = async () => {
		if (relatorio == '') return setMessage('Insira dados no relatório.');
		if (nomeUsuarioRelacionado == '')
			return setMessage('Insira algum servidor relacionado.');
		setLoading(true);
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
		await auth.getEstudante({
			ra: '',
			nome: auth.estudante[0].nome,
			cpf: '',
		});
		setLoading(false);
		setRelatorio('');
		setNomeUsuarioRelacionado('');
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
					<Text style={[styles.cardText]}>Inserir Ocorrência</Text>
					{loading ? (
						<ActivityIndicator />
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
							{status == 'Encaminhada' ? (
								<TouchableOpacity
									style={[styles.cardButton, { width: '90%' }]}
									onPress={() => setStatus('Observação')}
								>
									<Text style={styles.cardButtonText}>[ Ocorrência ]</Text>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									style={[
										styles.cardButton,
										{ width: '90%', backgroundColor: '#003ff3' },
									]}
									onPress={() => setStatus('Encaminhada')}
								>
									<Text style={styles.cardButtonText}>[ Observação ]</Text>
								</TouchableOpacity>
							)}
							<Separator />
							<TouchableOpacity
								style={[styles.cardButton]}
								onPress={handleSubmit}
							>
								<Text style={styles.cardButtonText}>Enviar</Text>
							</TouchableOpacity>
						</>
					)}
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
