import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../../styles/globalStyles';

import Card from '../../../../components/Card';
import { specificStyles } from '../../styles';
import { useAuth } from '../../../../context/AuthProvider/useAuth';
import { propsStack } from '../../../mainStackParams';
import Separator from '../../../../components/Separator';
import Button from '../../../../components/Button';

export default function SearchStudentReq() {
	const navigation = useNavigation<propsStack>();
	const auth = useAuth();

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={[styles.cardText]}>Liberações</Text>
					{auth.estudante[0].registros.length == 0 ? (
						<View>
							<Text>Nenhum registro encontrado.</Text>
						</View>
					) : (
						<FlatList
							style={styles.list}
							data={auth.estudante[0].registros.reverse()}
							ItemSeparatorComponent={Separator}
							renderItem={({ item }) => (
								<TouchableOpacity style={styles.listButton}>
									<Text>{item.descricao}</Text>
									<Text>{item.dia_liberacao}</Text>
								</TouchableOpacity>
							)}
						/>
					)}
					<Button
						text={'Criar registro'}
						backgroundColor='#FF3000'
						onPress={() => navigation.navigate('InsertStudentRegistro')}
					/>
				</View>
			</Card>
			<Button text={'Voltar'} onPress={handleBack} back={true} />
		</View>
	);
}
