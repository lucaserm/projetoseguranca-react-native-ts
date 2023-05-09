import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../mainStackParams';
import { AntDesign } from '@expo/vector-icons';
import { globalStyles as styles } from '../../styles/globalStyles';
import Card from '../../components/Card';
import Message from '../../components/Message';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

export default function Login() {
	const [code, setCode] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const auth = useAuth();
	const navigation = useNavigation<propsStack>();

	const handleFinish = async () => {
		if (!code || !!password) {
			return setMessage('Por favor, preencha todos os campos.');
		}
		setLoading(true);
		try {
			await auth.authenticate(code, password);
			navigation.navigate('HomeLogged');
		} catch (error) {
			setMessage('Código de servidor ou senha inválidos');
			setCode('');
			setPassword('');
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			{message ? (
				<Message message={message} handleClose={() => setMessage('')} />
			) : null}
			{auth.loading ? (
				<Loading />
			) : (
				<Card position='center'>
					<View style={[styles.cardContainer, specificStyles.cardContainer]}>
						<Text>Insira seu código de servidor:</Text>
						<TextInput
							value={code}
							onChangeText={setCode}
							placeholder='Código:'
							style={specificStyles.inputText}
						/>
						<Text>Insira sua senha:</Text>
						<TextInput
							value={password}
							onChangeText={setPassword}
							placeholder='Senha:'
							secureTextEntry={true}
							style={specificStyles.inputText}
						/>
						{loading ? (
							<ActivityIndicator size='large' />
						) : (
							<Button text={'Entrar'} onPress={handleFinish} back={true} />
						)}
					</View>
				</Card>
			)}
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
