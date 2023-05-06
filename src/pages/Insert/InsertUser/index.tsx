import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';

import Card from '../../../components/Card';

export default function InsertUser() {
	const navigation = useNavigation();

	const [message, setMessage] = useState('');
	const [nome, setNome] = useState('');
	const [codigo, setCodigo] = useState('');
	const [senha, setSenha] = useState('');
	const [cargo, setCargo] = useState('');

	const handleSubmit = () => {};

	return (
		<View style={[styles.container, specificStyles.container]}>
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
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={[styles.cardText]}>Inserir Usuário</Text>
					<TextInput
						style={styles.cardInput}
						placeholder='NOME USUÁRIO'
						placeholderTextColor={'#EEE'}
						value={nome}
						onChangeText={(value) => setNome(value)}
					/>
					<TextInput
						style={styles.cardInput}
						placeholder='CODIGO DE SERVIDOR'
						placeholderTextColor={'#EEE'}
						value={codigo}
						onChangeText={(value) => setCodigo(value)}
					/>
					<TextInput
						style={styles.cardInput}
						placeholder='SENHA DO USUÁRIO'
						placeholderTextColor={'#EEE'}
						value={senha}
						onChangeText={(value) => setSenha(value)}
					/>
					<TextInput
						style={styles.cardInput}
						placeholder='CARGO DO SERVIDOR'
						placeholderTextColor={'#EEE'}
						value={cargo}
						onChangeText={(value) => setCargo(value)}
					/>
					<Text
						style={{ backgroundColor: '#DDD', height: 1, width: '80%' }}
					></Text>
					<TouchableOpacity style={[styles.cardButton]} onPress={handleSubmit}>
						<Text style={styles.cardButtonText}>Enviar</Text>
					</TouchableOpacity>
				</View>
			</Card>
			<TouchableOpacity
				style={[styles.cardButton, { marginTop: 15 }]}
				onPress={() => navigation.goBack()}
			>
				<Text style={styles.cardButtonText}>Voltar</Text>
			</TouchableOpacity>
		</View>
	);
}
