import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../../styles/globalStyles';

import Card from '../../../../components/Card';
import { specificStyles } from '../../styles';
import { useAuth } from '../../../../context/AuthProvider/useAuth';

export default function SearchStudentParent() {
	const navigation = useNavigation();
	const auth = useAuth();

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<>
					<View style={styles.cardContainer}>
						<Text style={[styles.cardText]}>Responsável</Text>

						{auth.estudante?.length == 1 && (
							<>
								<Text>{auth.estudante[0].responsavel.nome}</Text>
								<Text>{auth.estudante[0].responsavel.email}</Text>
								<Text>{auth.estudante[0].responsavel.telefone}</Text>
							</>
						)}
					</View>
				</>
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
