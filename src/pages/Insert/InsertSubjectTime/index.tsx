import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';
import { IDisciplina } from '../../../context/AuthProvider/types';
import Api from '../../../api';
import Card from '../../../components/Card';
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';

export default function InsertSubjectTime() {
	const navigation = useNavigation();

	const [idDisciplina, setIdDisciplina] = useState('');
	const [disciplinas, setDisciplinas] = useState<IDisciplina[]>([]);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [periodo, setPeriodo] = useState('');
	const [diaSemana, setDiaSemana] = useState('');
	const [tempoInicio, setTempoInicio] = useState('');
	const [tempoFim, setTempoFim] = useState('');

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			const { data } = await Api.get('disciplina/listar');
			setDisciplinas(data);
		} catch (error) {
			setErrorMessage('Ocorreu um erro ao buscar as disciplinas.');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async () => {
		if (!idDisciplina || !periodo || !diaSemana || !tempoInicio || !tempoFim) {
			return setErrorMessage('Por favor, preencha todos os campos.');
		}
		setLoading(true);
		try {
			await Api.post(`horario/salvar/?id=${idDisciplina}`, {
				periodo: periodo.trim(),
				dia_semana: diaSemana.trim(),
				tempo_inicio: tempoInicio.trim(),
				tempo_fim: tempoFim.trim(),
			});
		} catch (error) {
			setErrorMessage('Ocorreu um erro ao cadastrar o horário.');
		} finally {
			setIdDisciplina('');
			setPeriodo('');
			setDiaSemana('');
			setTempoInicio('');
			setTempoFim('');
			setLoading(false);
		}
	};

	const renderItem = ({ item }: { item: IDisciplina }) => (
		<TouchableOpacity
			style={[
				styles.listButton,
				{ backgroundColor: item.id == idDisciplina ? '#2FA34F' : '#999' },
			]}
			onPress={() => setIdDisciplina(item.id)}
		>
			<Text>Disciplina: {item.nome}</Text>
			<Text>{item.semestre} semestre</Text>
			<Text>Turma : {item.turma}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={[styles.container, specificStyles.container]}>
			{errorMessage !== '' && (
				<Message
					message={errorMessage}
					handleClose={() => setErrorMessage('')}
				/>
			)}
			<Card position={'center'}>
				<View
					style={[
						styles.cardContainer,
						specificStyles.cardContainer,
						{ justifyContent: 'center' },
					]}
				>
					<Text style={[styles.cardText]}>Horário à Disciplina</Text>
					{loading ? (
						<Loading />
					) : (
						<>
							<FlatList
								style={{ height: 100, width: '90%' }}
								data={disciplinas}
								ItemSeparatorComponent={Separator}
								renderItem={renderItem}
							/>
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
