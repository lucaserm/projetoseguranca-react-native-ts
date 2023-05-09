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
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';

export default function InsertSubject() {
	const navigation = useNavigation();

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [nome, setNome] = useState('');
	const [semestre, setSemestre] = useState('');
	const [turma, setTurma] = useState('');

	const handleSubmit = async () => {
		if (!nome || !semestre || !turma) {
			return setMessage('Por favor, preencha todos os campos.');
		}
		if (isNaN(parseInt(semestre)))
			return setMessage('O semestre deve conter apenas números.');
		setLoading(true);
		try {
			await Api.post('disciplina/salvar', { nome, semestre, turma });
		} catch (e) {
			return setMessage('Ocorreu um erro ao cadastrar a disciplina.');
		} finally {
			setNome('');
			setSemestre('');
			setTurma('');
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
					<Text style={[styles.cardText]}>Inserir Disciplina</Text>
					{loading ? (
						<Loading />
					) : (
						<>
							<TextInput
								style={styles.cardInput}
								placeholder='NOME DA DISCIPLINA'
								placeholderTextColor={'#EEE'}
								value={nome}
								onChangeText={(value) => setNome(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='SEMESTRE'
								placeholderTextColor={'#EEE'}
								value={semestre}
								onChangeText={(value) => setSemestre(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='TURMA'
								placeholderTextColor={'#EEE'}
								value={turma}
								onChangeText={(value) => setTurma(value)}
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
