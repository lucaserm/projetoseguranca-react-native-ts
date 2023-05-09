import { TouchableOpacity, Text } from 'react-native';
import { IDisciplina } from '../../context/AuthProvider/types';
import { globalStyles as styles } from '../../styles/globalStyles';

interface ISubjectItem {
	item: IDisciplina;
	idDisciplinas?: string[];
	onPress?: (disciplina: IDisciplina) => void;
}

export default function SubjectItem({
	item,
	idDisciplinas,
	onPress,
}: ISubjectItem) {
	const isSelected = idDisciplinas ? idDisciplinas.includes(item.id) : true;
	return (
		<TouchableOpacity
			style={[
				styles.listButton,
				{
					backgroundColor: isSelected ? '#2FA34F' : '#999',
				},
			]}
			onPress={() => (onPress ? onPress(item) : {})}
		>
			<Text>Disciplina: {item.nome}</Text>
			<Text>{item.semestre} semestre</Text>
			<Text>Turma : {item.turma}</Text>
		</TouchableOpacity>
	);
}
