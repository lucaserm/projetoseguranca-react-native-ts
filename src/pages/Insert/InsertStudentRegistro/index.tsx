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
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';

export default function InsertStudentRegistro() {
	const navigation = useNavigation();
	const { estudante, getEstudante } = useAuth();
	const [message, setMessage] = useState('');
	const [descricao, setDescricao] = useState('');
	const [diaLiberacao, setDiaLiberacao] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (!descricao || !diaLiberacao)
			return setMessage('Por favor, preencha todos os campos.');
		setLoading(true);
		try {
			await Api.post('/estudante/registro/salvar/?id=' + estudante[0].id, {
				descricao,
				dia_liberacao: diaLiberacao,
			});
			try {
				await getEstudante({
					ra: '',
					nome: estudante[0].nome,
					cpf: '',
				});
			} catch (e) {
				setMessage('Ocorreu um erro ao renovar o estudante.');
			}
		} catch (e) {
			setMessage('Ocorreu um erro ao salvar o registro.');
		} finally {
			setDescricao('');
			setDiaLiberacao('');
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
					<Text style={[styles.cardText]}>Inserir Registro</Text>
					{loading ? (
						<Loading />
					) : (
						<>
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
							<Button text={'Enviar'} onPress={handleSubmit} />
						</>
					)}
				</View>
			</Card>
			<Button text={'Voltar'} onPress={() => navigation.goBack()} back={true} />
		</View>
	);
}
