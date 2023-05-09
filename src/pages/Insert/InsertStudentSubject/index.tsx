import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';
import Card from '../../../components/Card';
import Api from '../../../api';
import { useAuth } from '../../../context/AuthProvider/useAuth';
import { IDisciplina } from '../../../context/AuthProvider/types';
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';
import Loading from '../../../components/Loading';
import ListEmpty from '../../../components/ListEmpty';
import SubjectItem from '../../../components/SubjectItem';
import Button from '../../../components/Button';

export default function InsertStudentSubject() {
	const navigation = useNavigation();
	const { estudante, getEstudante } = useAuth();
	const [disciplinas, setDisciplinas] = useState<IDisciplina[]>([]);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState('');
	const [idDisciplinas, setIdDisciplinas] = useState<string[]>([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			const { data } = await Api.get<IDisciplina[]>('disciplina/listar');
			setDisciplinas(data);
			const listaDisciplinas = data.filter((disciplina) =>
				estudante[0].disciplinas.some(
					(disciplinaEstudante) => disciplinaEstudante.id === disciplina.id
				)
			);
			setIdDisciplinas(listaDisciplinas.map((disciplina) => disciplina.id));
		} catch (e) {
			setMessage('Ocorreu um erro ao buscar as disciplinas.');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async () => {
		setLoading(true);
		try {
			await Api.post(
				`estudante/disciplina/salvar/?idEstudante=${
					estudante[0].id
				}&id=${idDisciplinas.join(',')}`
			);
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
			setMessage('Ocorreu um erro ao relacionar as disciplinas.');
		} finally {
			setLoading(false);
		}
	};

	function handleDisciplinaPress(disciplina: IDisciplina) {
		const isSelected = idDisciplinas.includes(disciplina.id);
		if (!isSelected) {
			//Se não está relacionado, relaciona
			setIdDisciplinas((ids) => [...ids, disciplina.id]);
		} else {
			//Se já está relacionado, desvincula
			setIdDisciplinas((ids) => ids.filter((id) => id !== disciplina.id));
		}
	}

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
						<Loading />
					) : (
						<>
							<FlatList
								style={{ height: 100, width: '90%' }}
								data={disciplinas}
								ItemSeparatorComponent={Separator}
								renderItem={({ item }) =>
									SubjectItem({
										item,
										idDisciplinas,
										onPress: handleDisciplinaPress,
									})
								}
								ListEmptyComponent={ListEmpty({
									text: 'Nenhuma disciplina registrada.',
								})}
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
