import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import Card from '../../../components/Card';
import Api from '../../../api';
import { useAuth } from '../../../context/AuthProvider/useAuth';
import { IDisciplina } from '../../../context/AuthProvider/types';
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';

export default function InsertStudentSubject() {
	const navigation = useNavigation();
	const auth = useAuth();

	const [idDisciplinaInicial, setIdDisciplinaInicial] = useState<string[]>([]);
	const [idDisciplina, setIdDisciplina] = useState<string[]>([]);
	const [disciplinas, setDisciplinas] = useState<IDisciplina[]>([]);
	const [loading, setLoading] = useState(true);

	const [message, setMessage] = useState('');

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const { data } = await Api.get('disciplina/listar');
		setLoading(false);
		setDisciplinas(data);
		setIds(data);
	};

	const setIds = (list: IDisciplina[]) => {
		const lista: string[] = [];
		list.map((disciplina) => {
			auth.estudante[0].disciplinas.map((disciplinasEstudante) => {
				if (disciplinasEstudante.id == disciplina.id) {
					lista.push(disciplina.id);
				}
			});
		});
		setIdDisciplina(lista);
		setIdDisciplinaInicial(lista);
	};

	const handleSubmit = async () => {
		if (idDisciplina.length == 0)
			return setMessage('Selecione pelo menos uma disciplina.');
		if (idDisciplina == idDisciplinaInicial)
			return setMessage('Nenhuma alteração .');
		let formattedID = '';
		idDisciplina.map((id) => {
			return (formattedID += id + ' ');
		});
		formattedID = formattedID.trim();
		formattedID = formattedID.replace(' ', ',');
		setLoading(true);
		await Api.post(
			'estudante/disciplina/salvar/?idEstudante=' +
				auth.estudante[0].id +
				'&id=' +
				formattedID
		);
		await auth.getEstudante({
			ra: '',
			nome: auth.estudante[0].nome,
			cpf: '',
		});
		setLoading(false);
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
					<Text style={[styles.cardText]}>Relacionar disciplinas</Text>
					{loading ? (
						<ActivityIndicator />
					) : (
						<>
							<FlatList
								style={{ height: 100, width: '90%' }}
								data={disciplinas}
								ItemSeparatorComponent={Separator}
								renderItem={({ item }) => (
									<TouchableOpacity
										style={[
											styles.listButton,
											{
												backgroundColor: idDisciplina.includes(item.id)
													? '#2FF31F'
													: '#2FA34F',
											},
										]}
										onPress={() =>
											setIdDisciplina(
												idDisciplina.includes(item.id)
													? idDisciplina.filter((i) => {
															return i != item.id;
													  })
													: [...idDisciplina, item.id]
											)
										}
									>
										<Text>Disciplina: {item.nome}</Text>
										<Text>{item.semestre} semestre</Text>
										<Text>Turma : {item.turma}</Text>
									</TouchableOpacity>
								)}
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
