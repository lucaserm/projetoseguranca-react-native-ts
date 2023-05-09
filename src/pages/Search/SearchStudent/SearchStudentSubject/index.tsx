import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../../styles/globalStyles';

import Card from '../../../../components/Card';
import { specificStyles } from '../../styles';
import { useAuth } from '../../../../context/AuthProvider/useAuth';
import { propsStack } from '../../../mainStackParams';
import Separator from '../../../../components/Separator';

export default function SearchStudentSubject() {
	const navigation = useNavigation<propsStack>();
	const auth = useAuth();

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={[styles.cardText]}>Disciplinas</Text>
					{auth.estudante[0].disciplinas.length == 0 ? (
						<View>
							<Text>Nenhuma disciplina encontrada.</Text>
						</View>
					) : (
						<FlatList
							style={styles.list}
							data={auth.estudante[0].disciplinas.reverse()}
							ItemSeparatorComponent={Separator}
							renderItem={({ item }) => (
								<View style={styles.listButton}>
									<Text style={styles.cardButtonText}>
										Matéria : {item.nome}
									</Text>
									<Text style={styles.cardButtonText}>
										{item.semestre}° semestre
									</Text>
									<Text style={styles.cardButtonText}>
										Turma : {item.turma}
									</Text>
								</View>
							)}
						/>
					)}
					<TouchableOpacity
						style={[styles.cardButton, { backgroundColor: '#FF3000' }]}
						onPress={() => navigation.navigate('InsertStudentSubject')}
					>
						<Text style={styles.cardButtonText}>Registrar disciplina</Text>
					</TouchableOpacity>
				</View>
			</Card>
			<TouchableOpacity
				style={[styles.cardButton, specificStyles.cardButton]}
				onPress={handleBack}
			>
				<Text style={styles.cardButtonText}>Voltar</Text>
			</TouchableOpacity>
		</View>
	);
}
