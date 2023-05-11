import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../../styles/globalStyles';

import Card from '../../../../components/Card';
import { specificStyles } from '../../styles';
import { useAuth } from '../../../../context/AuthProvider/useAuth';
import { propsStack } from '../../../mainStackParams';
import Separator from '../../../../components/Separator';
import SubjectItem from '../../../../components/SubjectItem';
import ListEmpty from '../../../../components/ListEmpty';
import Button from '../../../../components/Button';

export default function SearchStudentCurso() {
	const navigation = useNavigation<propsStack>();
	const auth = useAuth();

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<View
					style={[
						styles.cardContainer,
						specificStyles.cardContainer,
						{ justifyContent: 'center' },
					]}
				>
					<Text style={[styles.cardText]}>Cursos</Text>
					<FlatList
						style={styles.list}
						data={auth.estudante[0].disciplinas.reverse()}
						ItemSeparatorComponent={Separator}
						renderItem={SubjectItem}
						ListEmptyComponent={ListEmpty({
							text: 'Nenhuma disciplina relacionada ao estudante.',
						})}
					/>
					<Button
						text={'Registrar disciplina'}
						backgroundColor='#FF3000'
						onPress={() => navigation.navigate('InsertStudentSubject')}
					/>
				</View>
			</Card>
			<Button text={'Voltar'} onPress={handleBack} back={true} />
		</View>
	);
}
