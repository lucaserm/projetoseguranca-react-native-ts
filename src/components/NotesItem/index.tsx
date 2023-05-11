import { TouchableOpacity, Text } from 'react-native';
import { IOcorrencia } from '../../context/AuthProvider/types';
import { globalStyles as styles } from '../../styles/globalStyles';

interface INotesItem {
	item: IOcorrencia;
	status?: string;
	onPress: (item: IOcorrencia) => void;
}

function formatDate(date: string) {
	let formattedDate = '';
	formattedDate += date.substring(8, 10);
	formattedDate += '/';
	formattedDate += date.substring(5, 7);
	formattedDate += '/';
	formattedDate += date.substring(0, 4);
	return formattedDate;
}

export default function NotesItem({ item, status, onPress }: INotesItem) {
	return (
		<TouchableOpacity
			style={[
				styles.listButton,
				{
					backgroundColor:
						status === 'Encaminhada'
							? '#Faca00'
							: status === 'Aprovada'
							? '#2FA34F'
							: status === 'Observação'
							? '#00F0FF'
							: status === 'Reprovada'
							? '#e32f45'
							: '#2FA34F',
				},
			]}
			onPress={() => onPress(item)}
		>
			<Text>{item.usuario.nome}</Text>
			{!status && <Text>{item.estudante.nome}</Text>}
			<Text>{formatDate(item.data_ocorrencia)}</Text>
			<Text>{item.relatorio}</Text>
		</TouchableOpacity>
	);
}
