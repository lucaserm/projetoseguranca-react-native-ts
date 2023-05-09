import { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../../styles/globalStyles';

import Card from '../../../../components/Card';

import { specificStyles } from '../../styles';
import { useAuth } from '../../../../context/AuthProvider/useAuth';
import { propsStack } from '../../../mainStackParams';
import { OcorrenciaRequest } from '../../../../context/AuthProvider/util';
import { IOcorrencia } from '../../../../context/AuthProvider/types';
import Separator from '../../../../components/Separator';

export default function SearchStudentNote() {
	const [ocorrencias, setOcorrencia] = useState<IOcorrencia[]>([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation<propsStack>();
	const auth = useAuth();

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		if (!auth.estudante) return;
		const response: IOcorrencia[] = await OcorrenciaRequest(
			auth.estudante[0].id
		);
		setOcorrencia(response);
		setLoading(false);
	}

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={[styles.cardText]}>Ocorrências</Text>
					{loading && <ActivityIndicator />}
					{!ocorrencias && (
						<View>
							<Text>Nenhuma ocorrência encontrada.</Text>
						</View>
					)}
					{ocorrencias && ocorrencias.length > 0 && (
						<FlatList
							data={ocorrencias.reverse()}
							style={styles.list}
							ItemSeparatorComponent={Separator}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={[
										styles.listButton,
										{
											backgroundColor:
												item.status == 'Encaminhada'
													? '#Faca00'
													: item.status == 'Encaminhada'
													? '#2FA34F'
													: item.status == 'Observação'
													? '#00F0FF'
													: '#e32f45',
										},
									]}
								>
									<Text>Data da ocorrência: {item.data_ocorrencia}</Text>
									<Text>Usuário: {item.usuario.nome}</Text>
									<Text>Relatório: {item.relatorio}</Text>
								</TouchableOpacity>
							)}
						/>
					)}
					<TouchableOpacity
						style={[styles.cardButton]}
						onPress={() => navigation.navigate('InsertStudentNotes')}
					>
						<Text style={{ textAlign: 'center', color: '#FAFAFA' }}>
							Criar ocorrência
						</Text>
					</TouchableOpacity>
				</View>
			</Card>
			<TouchableOpacity
				style={[styles.cardButton, specificStyles.cardButton]}
				onPress={handleBack}
			>
				<Text style={{ textAlign: 'center', color: '#FAFAFA' }}>Voltar</Text>
			</TouchableOpacity>
		</View>
	);
}
