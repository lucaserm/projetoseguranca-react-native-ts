import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import Card from '../../../components/Card';
import { useNavigation } from '@react-navigation/native';
import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';
import { useAuth } from '../../../context/AuthProvider/useAuth';
import { propsStack } from '../../mainStackParams';
import Separator from '../../../components/Separator';
import { IEstudante } from '../../../context/AuthProvider/types';
import Button from '../../../components/Button';
import StudentItem from '../../../components/StudentItem';
import Actions from '../../../components/Actions';

const routes: any = {
	Cursos: 'SearchStudentCurso',
	Disciplinas: 'SearchStudentSubject',
	Responsável: 'SearchStudentParent',
	Liberação: 'SearchStudentReq',
	Ocorrências: 'SearchStudentNote',
};

export default function SearchStudent() {
	const navigation = useNavigation<propsStack>();
	const auth = useAuth();

	const handleBack = () => {
		navigation.goBack();
	};

	const handleNavigate = (route: string) => {
		navigation.navigate(routes[route]);
	};

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
							<Text>RA: {auth.estudante[0].ra}</Text>
							<Text>CPF: {auth.estudante[0].cpf}</Text>
							<Text>E-mail: {auth.estudante[0].email_institucional}</Text>
							<Text>
								Quantidade de disciplinas atreladas:{' '}
								{auth.estudante[0].disciplinas.length}
							</Text>
							<Text>
								Quantidade de pedidos de liberação:{' '}
								{auth.estudante[0].registros.length}
							</Text>
							<Actions onPress={handleNavigate} />
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
								renderItem={({ item }) =>
									StudentItem({ item, onPress: auth.setStudent })
								}
							/>
						</>
					)}
				</View>
			</Card>
			<Button text={'Voltar'} onPress={handleBack} back={true} />
		</View>
	);
}
