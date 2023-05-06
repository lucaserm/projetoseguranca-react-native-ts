import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../mainStackParams';

import { AntDesign } from '@expo/vector-icons';

import { globalStyles as styles } from '../../styles/globalStyles';

import Card from '../../components/Card';

export default function Login() {
	const [code, setCode] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const auth = useAuth();
	const navigation = useNavigation<propsStack>();

	async function onFinish(values: { code: string; password: string }) {
		if (code == '') return setMessage('Insira um código de servidor!');
		if (password == '') return setMessage('Insira uma senha!');
		setLoading(true);
		try {
			await auth.authenticate(values.code, values.password);
			navigation.navigate('HomeLogged');
		} catch (e) {
			setMessage('Código de servidor ou senha inválidos');
			setCode('');
			setPassword('');
			setLoading(false);
		}
	}

	return (
		<View style={[styles.container, specificStyles.container]}>
			<>
				{message !== '' && (
					<View style={styles.message}>
						<Text style={styles.messageText}>{message}</Text>
						<TouchableOpacity
							style={styles.messageButton}
							onPress={() => setMessage('')}
						>
							<AntDesign name={'close'} size={20} color={'#FAFAFA'} />
						</TouchableOpacity>
					</View>
				)}
				{auth.loading ? (
					<ActivityIndicator size={'large'} />
				) : (
					<Card position={'center'}>
						<View style={[styles.cardContainer, specificStyles.cardContainer]}>
							<Text>Insira seu código de servidor:</Text>
							<TextInput
								value={code}
								onChangeText={(e) => setCode(e)}
								placeholder='Código:'
								style={specificStyles.inputText}
							/>
							<Text>Insira sua senha:</Text>
							<TextInput
								value={password}
								onChangeText={(e) => setPassword(e)}
								placeholder='Senha:'
								secureTextEntry={true}
								style={specificStyles.inputText}
							/>
							{loading && <ActivityIndicator size={'large'} />}
							<TouchableOpacity
								style={styles.cardButton}
								onPress={() => onFinish({ code, password })}
							>
								<Text style={styles.cardButtonText}>Entrar</Text>
							</TouchableOpacity>
						</View>
					</Card>
				)}
			</>
		</View>
	);
}

const specificStyles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},
	cardContainer: {
		marginVertical: 15,
	},
	inputText: {
		backgroundColor: '#ddd',
		width: '80%',
		paddingVertical: 5,
		borderRadius: 20,
		textAlign: 'center',
	},
});
