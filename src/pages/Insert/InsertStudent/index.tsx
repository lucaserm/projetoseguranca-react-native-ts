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

	const handleSubmit = async () => {
		if (
			nome == '' &&
			ra == '' &&
			cpf == '' &&
			email == '' &&
			nomeResponsavel == '' &&
			telefoneResponsavel == '' &&
			emailResponsavel == ''
		)
			return setMessage('Insira algum dado!');
		if (nome == '') return setMessage('Insira um nome para o estudante!');
		if (ra == '') return setMessage('Insira um RA para o estudante!');
		if (cpf == '') return setMessage('Insira um CPF para o estudante!');
		if (email == '') return setMessage('Insira um email para o estudante!');
		if (nomeResponsavel == '')
			return setMessage('Insira um nome para o responsável!');
		if (telefoneResponsavel == '')
			return setMessage('Insira um telefone para o responsável!');
		if (emailResponsavel == '')
			return setMessage('Insira um email para o responsável!');
		Api.post('responsavel/salvar', {
			nome: nomeResponsavel,
			telefone: telefoneResponsavel,
			email: emailResponsavel,
		})
			.then(({ data }) => {
				Api.post('estudante/salvar', {
					nome,
					cpf,
					ra,
					email_institucional: email,
					responsavel: { id: data.id },
				})
					.then(() => {
						setNome('');
						setRa('');
						setCpf('');
						setEmail('');
						setNomeResponsavel('');
						setTelefoneResponsavel('');
						setEmailResponsavel('');
					})
					.catch((e) => {
						console.log('estudante: ' + e);
					});
			})
			.catch((e) => {
				console.log('responsável: ' + e);
			});
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			{message !== '' && (
				<Message message={message} handleClose={() => setMessage('')} />
			)}
			<Card position={'center'}>
				<View style={[styles.cardContainer, specificStyles.cardContainer]}>
					<Text style={[styles.cardText]}>Inserir Estudante</Text>
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
