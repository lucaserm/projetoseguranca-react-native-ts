import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import Card from '../../../components/Card';
import { useNavigation } from '@react-navigation/native';
import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';
import { useAuth } from '../../../context/AuthProvider/useAuth';
import { propsStack } from '../../mainStackParams';
import Separator from '../../../components/Separator';
import { IEstudante } from '../../../context/AuthProvider/types';

export default function SearchStudent() {
	const navigation = useNavigation<propsStack>();
	const auth = useAuth();

	const handleBack = () => {
		navigation.goBack();
	};

	const handleOcorrencia = () => {
		navigation.navigate('SearchStudentNote');
	};

	const handleRequisicao = () => {
		navigation.navigate('SearchStudentReq');
	};

	const handleResponsavel = () => {
		navigation.navigate('SearchStudentParent');
	};

	const handleDisciplinas = () => {
		navigation.navigate('SearchStudentSubject');
	};

	const Lista = ({ item }: { item: IEstudante }) => (
		<TouchableOpacity
			style={styles.listButton}
			onPress={() => {
				auth.setStudent(item);
			}}
		>
			<Text>{item.nome}</Text>
			<Text>{item.ra}</Text>
			<Text>{item.cpf}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					{auth.estudante.length == 1 && (
						<>
							<Text
								style={[
									styles.cardText,
									{ marginHorizontal: 10, textAlign: 'center' },
								]}
							>
								{auth.estudante[0].nome}
							</Text>
							<Text>{auth.estudante[0].cpf}</Text>
							<Text>{auth.estudante[0].ra}</Text>
							<Text>{auth.estudante[0].email_institucional}</Text>
							<TouchableOpacity
								style={[
									styles.cardButton,
									{ backgroundColor: '#FF3000', width: '100%' },
								]}
								onPress={handleOcorrencia}
							>
								<Text style={styles.cardButtonText}>Ocorrências</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.cardButton,
									{ backgroundColor: '#FF3000', width: '100%' },
								]}
								onPress={handleRequisicao}
							>
								<Text style={styles.cardButtonText}>Liberações</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.cardButton,
									{ backgroundColor: '#FF3000', width: '100%' },
								]}
								onPress={handleResponsavel}
							>
								<Text style={styles.cardButtonText}>Responsável</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.cardButton,
									{ backgroundColor: '#FF3000', width: '100%' },
								]}
								onPress={handleDisciplinas}
							>
								<Text style={styles.cardButtonText}>Disciplinas</Text>
							</TouchableOpacity>
						</>
					)}
					{auth.estudante.length > 1 && (
						<>
							<Text
								style={[styles.cardText, { margin: 10, textAlign: 'center' }]}
							>
								Escolha o estudante
							</Text>
							<FlatList
								style={styles.list}
								data={auth.estudante}
								ItemSeparatorComponent={Separator}
								renderItem={Lista}
							/>
						</>
					)}
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
