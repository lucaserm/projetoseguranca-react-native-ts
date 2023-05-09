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

export default function NotesRepproved() {
	const navigation = useNavigation();

	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(true);
	const [ocorrencias, setOcorrencias] = useState<IOcorrencia[]>([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const { data }: { data: IOcorrencia[] } = await Api.get(
			'ocorrencia/listar'
		);
		setOcorrencias(
			data.filter((ocorrencia) => {
				return ocorrencia.status == 'Reprovada';
			})
		);
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
					<Text style={[styles.cardText]}>Reprovadas</Text>
					{loading ? (
						<ActivityIndicator />
					) : (
						<>
							{ocorrencias.length == 0 ? (
								<Text> Nenhuma ocorrência reprovada.</Text>
							) : (
								<FlatList
									style={styles.list}
									data={ocorrencias}
									ItemSeparatorComponent={Separator}
									renderItem={({ item }) => (
										<TouchableOpacity style={styles.listButton}>
											<Text>{item.relatorio}</Text>
											<Text>{item.estudante.nome}</Text>
										</TouchableOpacity>
									)}
								/>
							)}
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
