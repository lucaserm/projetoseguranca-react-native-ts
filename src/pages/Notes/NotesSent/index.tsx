import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import { IOcorrencia } from '../../../context/AuthProvider/types';
import { propsStack } from '../../mainStackParams';
import Api from '../../../api';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';
import NotesItem from '../../../components/NotesItem';
import ListEmpty from '../../../components/ListEmpty';

export default function NotesSent() {
	const navigation = useNavigation<propsStack>();
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
				(ocorrencia) => ocorrencia.status === 'Encaminhada'
			);
			setOcorrencias(filteredOcorrencias.reverse());
		} catch (error) {
			setMessage('Erro ao buscar as ocorrências');
		} finally {
			setLoading(false);
		}
	};

	const handleRelate = (item: IOcorrencia) => {
		navigation.navigate('NotesRelate', item);
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
					<Text style={[styles.cardText]}>Encaminhadas</Text>
					{loading ? (
						<Loading />
					) : (
						<FlatList
							style={styles.list}
							data={ocorrencias}
							ItemSeparatorComponent={Separator}
							renderItem={({ item }) =>
								NotesItem({ item, onPress: handleRelate })
							}
							ListEmptyComponent={ListEmpty({
								text: 'Nenhuma ocorrência encaminhada.',
							})}
						/>
					)}
				</View>
			</Card>
			<Button text={'Voltar'} onPress={() => navigation.goBack()} back={true} />
		</View>
	);
}
