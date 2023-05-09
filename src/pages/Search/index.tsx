import React, { useState } from 'react';
import { useAuth } from '../../context/AuthProvider/useAuth';

import {
	View,
	TextInput,
	Text,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../mainStackParams';

import { specificStyles } from './styles';
import { globalStyles as styles } from '../../styles/globalStyles';
import { AntDesign } from '@expo/vector-icons';

import Card from '../../components/Card';
import Message from '../../components/Message';
import Button from '../../components/Button';

export default function Search() {
	const [ra, setRa] = useState('');
	const [cpf, setCpf] = useState('');
	const [nome, setNome] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const auth = useAuth();
	const navigation = useNavigation<propsStack>();

	const handleSubmit = async () => {
		if (!ra && !nome && !cpf)
			return setMessage('Por favor, preencha algum campo.');
		setLoading(true);
		try {
			await auth.getEstudante({
				ra: ra.trim(),
				nome: nome.trim() != '' ? nome.trim().replace(' ', '%') : '0',
				cpf: cpf.trim().replace(' ', '%'),
			});
			navigation.navigate('SearchStudent');
		} catch (error) {
			setMessage('Estudante não encontrado.');
		} finally {
			setRa('');
			setCpf('');
			setNome('');
			setMessage('');
			setLoading(false);
		}
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			{message !== '' && (
				<Message message={message} handleClose={() => setMessage('')} />
			)}
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={[styles.cardText]}>Buscar Estudante</Text>
					{loading ? (
						<ActivityIndicator size={'large'} />
					) : (
						<>
							<TextInput
								style={styles.cardInput}
								placeholder='RA'
								placeholderTextColor={'#F2F4F3'}
								value={ra}
								onChangeText={(value) => setRa(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='CPF'
								placeholderTextColor={'#F2F4F3'}
								value={cpf}
								onChangeText={(value) => setCpf(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='Nome'
								placeholderTextColor={'#F2F4F3'}
								value={nome}
								onChangeText={(value) => setNome(value)}
							/>
						</>
					)}
				</View>
			</Card>
			<Button text={'Ver'} onPress={handleSubmit} back={true} />
		</View>
	);
}
