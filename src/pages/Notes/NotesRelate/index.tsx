import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import { RootRouteProps } from '../../mainStackParams';

import Card from '../../../components/Card';
import Button from '../../../components/Button';

interface INotesRelate {
	route?: RootRouteProps<'NotesRelate'>;
}

export default function NotesRelate({ route }: INotesRelate) {
	const navigation = useNavigation();
	const ocorrencia = route?.params;

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<View style={styles.cardContainer}>
					<Text style={[styles.cardText]}>Relatório</Text>
					{ocorrencia && (
						<>
							<Text>{ocorrencia.relatorio}</Text>
							<Text>{ocorrencia.usuario.nome}</Text>
							<Text>{ocorrencia.estudante.nome}</Text>
							<Text>{ocorrencia.data_ocorrencia}</Text>
							{ocorrencia.status == 'Encaminhada' && (
								<>
									<Button text={'Aprovar'} onPress={() => {}} />
									<Button text={'Reprovar'} onPress={() => {}} />
								</>
							)}
							<Text></Text>
						</>
					)}
				</View>
			</Card>
			<Button text={'Voltar'} onPress={handleBack} back={true} />
		</View>
	);
}
