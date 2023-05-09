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

export default function InsertSubject() {
	const navigation = useNavigation();

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [nome, setNome] = useState('');
	const [semestre, setSemestre] = useState('');
	const [turma, setTurma] = useState('');

	const handleSubmit = async () => {
		if (nome == '') return setMessage('Insira o nome da disciplina.');
		if (semestre == '') return setMessage('Insira o semestre da disciplina.');
		if (turma == '') return setMessage('Insira a turma da disciplina.');
		if (isNaN(parseInt(semestre)))
			return setMessage('O semestre deve ser só números.');
		setLoading(true);
		await Api.post('disciplina/salvar', { nome, semestre, turma });
		setLoading(false);
		setNome('');
		setSemestre('');
		setTurma('');
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
						<ActivityIndicator />
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
