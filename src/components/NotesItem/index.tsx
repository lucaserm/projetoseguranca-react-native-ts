import { TouchableOpacity, Text } from 'react-native';

import { IOcorrencia } from '../../context/AuthProvider/types';
import { globalStyles as styles } from '../../styles/globalStyles';

function formatDate(date: string) {
	let formattedDate = '';
	formattedDate += date.substring(8, 10);
	formattedDate += '/';
	formattedDate += date.substring(5, 7);
	formattedDate += '/';
	formattedDate += date.substring(0, 4);
	return formattedDate;
}

export default function NotesItem({
	item: { usuario, estudante, data_ocorrencia, relatorio },
}: {
	item: IOcorrencia;
}) {
	return (
		<TouchableOpacity style={styles.listButton}>
			<Text>{usuario.nome}</Text>
			<Text>{estudante.nome}</Text>
			<Text>{formatDate(data_ocorrencia)}</Text>
			<Text>{relatorio}</Text>
		</TouchableOpacity>
	);
}
