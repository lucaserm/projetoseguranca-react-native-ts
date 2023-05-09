import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import Card from '../../../components/Card';
import Api from '../../../api';
import { IOcorrencia } from '../../../context/AuthProvider/types';
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';
import ListEmpty from '../../../components/ListEmpty';
import NotesItem from '../../../components/NotesItem';
import Button from '../../../components/Button';

export default function NotesRepproved() {
	const navigation = useNavigation();

	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(true);
	const [ocorrencias, setOcorrencias] = useState<IOcorrencia[]>([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			const { data }: { data: IOcorrencia[] } = await Api.get(
				'ocorrencia/listar'
			);
			const filteredOcorrencias = data.filter(
				(ocorrencia) => ocorrencia.status === 'Reprovada'
			);
			setOcorrencias(filteredOcorrencias);
		} catch (error) {
			setMessage('Erro ao buscar as ocorrências');
		} finally {
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
					<Text style={[styles.cardText]}>Reprovadas</Text>
					{loading ? (
						<ActivityIndicator />
					) : (
						<FlatList
							style={styles.list}
							data={ocorrencias}
							ItemSeparatorComponent={Separator}
							renderItem={NotesItem}
							ListEmptyComponent={ListEmpty({
								text: 'Nenhuma ocorrência reprovada.',
							})}
						/>
					)}
				</View>
			</Card>
			<Button text={'Voltar'} onPress={() => navigation.goBack()} back={true} />
		</View>
	);
}
