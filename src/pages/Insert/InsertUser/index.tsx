import React, { useState, useCallback } from 'react';
import {
	View,
	Text,
	TextInput,
	ActivityIndicator,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';
import Card from '../../../components/Card';
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';
import Api from '../../../api';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';

export default function InsertUser() {
	const navigation = useNavigation();

	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [nome, setNome] = useState('');
	const [codigo, setCodigo] = useState('');
	const [senha, setSenha] = useState('');
	const [cargo, setCargo] = useState('');
	const cargos = ['Coordenação', 'Assistência', 'Portaria'];

	const handleSubmit = useCallback(async () => {
		if (!nome || !codigo || !senha || !cargo) {
			return setErrorMessage('Por favor, preencha todos os campos.');
		}
		setLoading(true);
		try {
			await Api.post('usuario/salvar', { nome, codigo, senha, cargo });
		} catch (e) {
			console.error(e);
			setErrorMessage('Ocorreu um erro ao salvar o usuário');
		} finally {
			setNome('');
			setCodigo('');
			setSenha('');
			setCargo('');
			setLoading(false);
		}
	}, [nome, codigo, senha, cargo]);

	return (
		<View style={[styles.container, specificStyles.container]}>
			{errorMessage !== '' && (
				<Message
					message={errorMessage}
					handleClose={() => setErrorMessage('')}
				/>
			)}
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={[styles.cardText]}>Inserir Usuário</Text>
					{loading ? (
						<Loading />
					) : (
						<>
							<TextInput
								style={styles.cardInput}
								placeholder='Nome do usuário'
								placeholderTextColor={'#EEE'}
								autoCapitalize='words'
								value={nome}
								onChangeText={(value) => setNome(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='Código de servidor'
								placeholderTextColor={'#EEE'}
								autoCapitalize='characters'
								value={codigo}
								onChangeText={(value) => setCodigo(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='Senha do usuário'
								placeholderTextColor={'#EEE'}
								autoCapitalize='none'
								secureTextEntry={true}
								value={senha}
								onChangeText={(value) => setSenha(value)}
							/>
							<FlatList
								data={cargos}
								ItemSeparatorComponent={Separator}
								renderItem={({ item }) => (
									<TouchableOpacity
										style={[
											styles.cardButton,
											{
												backgroundColor: item === cargo ? '#2Fa33B' : '#999',
												width: '100%',
											},
										]}
										onPress={() => setCargo(item)}
									>
										<Text style={styles.cardButtonText}>{item}</Text>
									</TouchableOpacity>
								)}
							/>
							<Separator />
							<Button text={'Enviar'} onPress={handleSubmit} />
						</>
					)}
				</View>
			</Card>
			<Button text={'Voltar'} onPress={() => navigation.goBack()} back={true} />
		</View>
	);
}
