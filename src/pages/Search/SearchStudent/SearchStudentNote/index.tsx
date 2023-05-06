import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../../../styles/globalStyles';

import Card from '../../../../components/Card';
import { specificStyles } from '../../styles';
import { useAuth } from '../../../../context/AuthProvider/useAuth';
import { propsStack } from '../../../mainStackParams';

export default function SearchStudentNote() {
	const navigation = useNavigation<propsStack>();
	const auth = useAuth();

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={[styles.cardText]}>Ocorrências</Text>
					{auth.estudante?.length == 1 && (
						<>
							{auth.estudante[0].ocorrencias.map((ocorrencia) => (
								<Text>Tei</Text>
							))}
						</>
					)}
					<TouchableOpacity
						style={[styles.cardButton, { backgroundColor: '#FF3000' }]}
						onPress={() => navigation.navigate('InsertStudentNotes')}
					>
						<Text style={{ textAlign: 'center', color: '#FAFAFA' }}>
							Criar ocorrência
						</Text>
					</TouchableOpacity>
				</View>
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
