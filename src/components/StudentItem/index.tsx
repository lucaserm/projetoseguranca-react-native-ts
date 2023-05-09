import { TouchableOpacity, Text } from 'react-native';
import { globalStyles as styles } from '../../styles/globalStyles';
import { IEstudante } from '../../context/AuthProvider/types';

interface IStudentItem {
	item: IEstudante;
	onPress?: (estudante: IEstudante) => void;
}

export default function StudentItem({ item, onPress }: IStudentItem) {
	return (
		<TouchableOpacity
			style={styles.listButton}
			onPress={() => (onPress ? onPress(item) : {})}
		>
			<Text>{item.nome}</Text>
			<Text>{item.ra}</Text>
			<Text>{item.cpf}</Text>
		</TouchableOpacity>
	);
}
