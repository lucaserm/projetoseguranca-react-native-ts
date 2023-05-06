import { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/AuthProvider/useAuth';

import { globalStyles as styles } from '../../styles/globalStyles';

import Card from '../../components/Card';
import Api from '../../api';

interface IUser {
	id: string;
	nome: string;
	codigo: string;
	cargo: string;
	ocorrencias: [];
}

export default function Profile() {
	const [user, setUser] = useState<IUser>();
	const [loading, setLoading] = useState(true);
	const auth = useAuth();

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		Api.get(`usuario/listar/`, { params: { id: auth.token } }).then((res) => {
			setUser(res.data[0]);
			setLoading(false);
		});
	}

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					{loading ? (
						<ActivityIndicator size={'large'} />
					) : (
						<>
							<Text style={styles.cardText}>Perfil</Text>
							<Text>{user?.nome}</Text>
							<Text>{user?.codigo}</Text>
							<Text>{user?.cargo}</Text>
						</>
					)}
					<TouchableOpacity
						onPress={() => auth.logout()}
						style={[styles.cardButton, specificStyles.cardButton]}
					>
						<Text style={styles.cardButtonText}>Sair</Text>
					</TouchableOpacity>
				</View>
			</Card>
		</View>
	);
}

const specificStyles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},
	cardContainer: {
		flex: 1,
	},
	cardButton: {
		backgroundColor: '#e32f45',
	},
});
