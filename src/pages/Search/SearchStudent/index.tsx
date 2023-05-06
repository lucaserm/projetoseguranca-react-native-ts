import {
	View,
	StyleSheet,
	TextInput,
	Text,
	TouchableOpacity,
} from 'react-native';
import Card from '../../../components/Card';
import { useNavigation } from '@react-navigation/native';
import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';
import { useAuth } from '../../../context/AuthProvider/useAuth';
import { propsStack } from '../../mainStackParams';

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

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<>
					{auth.estudante?.length == 1 ? (
						<>
							<View
								style={[styles.cardContainer, specificStyles.cardContainer]}
							>
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
									style={[styles.cardButton, { backgroundColor: '#FF3000' }]}
									onPress={handleOcorrencia}
								>
									<Text style={{ textAlign: 'center', color: '#FAFAFA' }}>
										Ocorrências
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.cardButton, { backgroundColor: '#FF3000' }]}
									onPress={handleRequisicao}
								>
									<Text style={{ textAlign: 'center', color: '#FAFAFA' }}>
										Requisições de Liberação
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.cardButton, { backgroundColor: '#FF3000' }]}
									onPress={handleResponsavel}
								>
									<Text style={{ textAlign: 'center', color: '#FAFAFA' }}>
										Responsável
									</Text>
								</TouchableOpacity>
							</View>
						</>
					) : (
						<>
							<Text style={[styles.cardText, specificStyles.cardText]}></Text>
							<View
								style={[styles.cardContainer, specificStyles.cardContainer]}
							></View>
						</>
					)}
				</>
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
