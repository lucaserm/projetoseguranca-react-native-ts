import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../../styles/globalStyles';

import { specificStyles } from '../../styles';
import { useAuth } from '../../../../context/AuthProvider/useAuth';
import { propsStack } from '../../../mainStackParams';
import { OcorrenciaRequest } from '../../../../context/AuthProvider/util';
import { IOcorrencia } from '../../../../context/AuthProvider/types';

import Card from '../../../../components/Card';
import Separator from '../../../../components/Separator';
import Button from '../../../../components/Button';
import ListEmpty from '../../../../components/ListEmpty';
import Loading from '../../../../components/Loading';
import NotesItem from '../../../../components/NotesItem';

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

	const handleRelate = (item: IOcorrencia) => {
		navigation.navigate('NotesRelate', item);
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={[styles.cardText]}>Ocorrências</Text>
					{loading ? (
						<Loading />
					) : (
						<FlatList
							data={ocorrencias.reverse()}
							style={styles.list}
							ItemSeparatorComponent={Separator}
							ListEmptyComponent={ListEmpty({
								text: 'Nenhuma ocorrência encontrada.',
							})}
							renderItem={({ item }) =>
								NotesItem({ item, status: item.status, onPress: handleRelate })
							}
						/>
					)}
					<Button
						text={'Criar ocorrência'}
						onPress={() => navigation.navigate('InsertStudentNotes')}
					/>
				</View>
			</Card>
			<Button text={'Voltar'} onPress={handleBack} back={true} />
		</View>
	);
}
