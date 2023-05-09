import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { globalStyles as styles } from '../../styles/globalStyles';
import Card from '../../components/Card';
import Api from '../../api';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

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
		try {
			const res = await Api.get(`usuario/listar/`, {
				params: { id: auth.token },
			});
			setUser(res.data[0]);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position='center'>
				<View style={specificStyles.cardContainer}>
					<View style={specificStyles.infoContainer}>
						{loading ? (
							<Loading />
						) : (
							<>
								<Text style={specificStyles.infoTitle}>Nome:</Text>
								<Text style={specificStyles.infoText}>{user?.nome}</Text>
								<Text style={specificStyles.infoTitle}>Código:</Text>
								<Text style={specificStyles.infoText}>{user?.codigo}</Text>
								<Text style={specificStyles.infoTitle}>Cargo:</Text>
								<Text style={specificStyles.infoText}>{user?.cargo}</Text>
							</>
						)}
					</View>
				</View>
			</Card>
			<Button
				text={'Sair'}
				backgroundColor='#E32F45'
				onPress={() => auth.logout()}
				back={true}
			/>
		</View>
	);
}

const specificStyles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},
	cardContainer: {
		flex: 1,
		justifyContent: 'space-between',
	},
	infoContainer: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
	},
	infoTitle: {
		fontWeight: 'bold',
		fontSize: 18,
		marginBottom: 5,
	},
	infoText: {
		fontSize: 16,
		marginBottom: 20,
	},
	logoutButton: {
		backgroundColor: '#E32F45',
		paddingVertical: 10,
		borderRadius: 10,
		alignItems: 'center',
	},
	logoutButtonText: {
		color: '#FFF',
		fontSize: 18,
	},
});
