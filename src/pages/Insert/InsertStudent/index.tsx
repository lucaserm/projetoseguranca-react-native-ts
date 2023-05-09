import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import Card from '../../../components/Card';

import { globalStyles as styles } from '../../../styles/globalStyles';
import { specificStyles } from '../styles';
import Api from '../../../api';
import Message from '../../../components/Message';
import Separator from '../../../components/Separator';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';

export default function InsertStudent() {
	const navigation = useNavigation();
	const [message, setMessage] = useState('');
	const [nome, setNome] = useState('');
	const [ra, setRa] = useState('');
	const [cpf, setCpf] = useState('');
	const [email, setEmail] = useState('');
	const [nomeResponsavel, setNomeResponsavel] = useState('');
	const [telefoneResponsavel, setTelefoneResponsavel] = useState('');
	const [emailResponsavel, setEmailResponsavel] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (
			!nome ||
			!ra ||
			!cpf ||
			!email ||
			!nomeResponsavel ||
			!telefoneResponsavel ||
			!emailResponsavel
		)
			return setMessage('Por favor, preencha todos os campos.');
		setLoading(true);
		try {
			const { data } = await Api.post('responsavel/salvar', {
				nome: nomeResponsavel,
				telefone: telefoneResponsavel,
				email: emailResponsavel,
			});
			try {
				await Api.post('estudante/salvar', {
					nome,
					cpf,
					ra,
					email_institucional: email,
					responsavel: { id: data.id },
				});
			} catch (e) {
				setMessage('Ocorreu um erro ao salvar o estudante.');
			}
		} catch (e) {
			setMessage('Ocorreu um erro ao salvar o responsável.');
		} finally {
			setNome('');
			setRa('');
			setCpf('');
			setEmail('');
			setNomeResponsavel('');
			setTelefoneResponsavel('');
			setEmailResponsavel('');
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
					<Text style={[styles.cardText]}>Inserir Estudante</Text>
					{loading ? (
						<Loading />
					) : (
						<>
							<TextInput
								style={styles.cardInput}
								placeholder='NOME ESTUDANTE'
								placeholderTextColor={'#EEE'}
								value={nome}
								onChangeText={(value) => setNome(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='RA ESTUDANTE'
								placeholderTextColor={'#EEE'}
								value={ra}
								onChangeText={(value) => setRa(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='CPF ESTUDANTE'
								placeholderTextColor={'#EEE'}
								value={cpf}
								onChangeText={(value) => setCpf(value)}
							/>
							<TextInput
								style={[styles.cardInput]}
								placeholder='E-MAIL ESTUDANTE'
								placeholderTextColor={'#EEE'}
								value={email}
								onChangeText={(value) => setEmail(value)}
							/>
							<Separator />
							<TextInput
								style={styles.cardInput}
								placeholder='NOME RESPONSÁVEL'
								placeholderTextColor={'#EEE'}
								value={nomeResponsavel}
								onChangeText={(value) => setNomeResponsavel(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='TELEFONE RESPONSÁVEL'
								placeholderTextColor={'#EEE'}
								value={telefoneResponsavel}
								onChangeText={(value) => setTelefoneResponsavel(value)}
							/>
							<TextInput
								style={styles.cardInput}
								placeholder='E-MAIL RESPONSÁVEL'
								placeholderTextColor={'#EEE'}
								value={emailResponsavel}
								onChangeText={(value) => setEmailResponsavel(value)}
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
