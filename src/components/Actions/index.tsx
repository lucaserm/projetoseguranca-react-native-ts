import {
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	View,
	Text,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

interface IActions {
	onPress?: (name: string) => void;
}

export default function Actions({ onPress }: IActions) {
	return (
		<ScrollView style={styles.container}>
			<TouchableOpacity
				style={styles.actionButton}
				onPress={() => (onPress ? onPress('Cursos') : {})}
			>
				<View style={styles.areaButton}>
					<Ionicons name='school' size={26} color={'#FAFAFA'} />
				</View>
				<Text style={styles.labelButton}>Cursos</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.actionButton}
				onPress={() => (onPress ? onPress('Disciplinas') : {})}
			>
				<View style={styles.areaButton}>
					<Ionicons name='ios-book' size={26} color={'#FAFAFA'} />
				</View>
				<Text style={styles.labelButton}>Disciplinas</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.actionButton}
				onPress={() => (onPress ? onPress('Responsável') : {})}
			>
				<View style={styles.areaButton}>
					<Ionicons name='person-circle-sharp' size={26} color={'#FAFAFA'} />
				</View>
				<Text style={styles.labelButton}>Responsável</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.actionButton}
				onPress={() => (onPress ? onPress('Liberação') : {})}
			>
				<View style={styles.areaButton}>
					<Ionicons name='checkmark' size={26} color={'#FAFAFA'} />
				</View>
				<Text style={styles.labelButton}>Liberação</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.actionButton}
				onPress={() => (onPress ? onPress('Ocorrências') : {})}
			>
				<View style={styles.areaButton}>
					<Ionicons name='warning-outline' size={26} color={'#FAFAFA'} />
				</View>
				<Text style={styles.labelButton}>Ocorrências</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		maxHeight: 120,
		minWidth: 200,
		marginBottom: 20,
		marginTop: 18,
		paddingStart: 14,
		paddingEnd: 14,
	},
	actionButton: {
		alignItems: 'center',
		marginBottom: 16,
	},
	areaButton: {
		backgroundColor: '#2Fa33B',
		height: 60,
		width: 60,
		borderRadius: 60 / 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	labelButton: {
		marginTop: 4,
		textAlign: 'center',
		fontWeight: 'bold',
	},
});
