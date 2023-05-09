import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles as styles } from '../../styles/globalStyles';
import { specificStyles } from './styles';

import Card from '../../components/Card';

import { propsStack } from '../mainStackParams';
import Button from '../../components/Button';

const routes: any = {
	Student: 'InsertStudent',
	Curso: 'InsertCurso',
	Subject: 'InsertSubject',
	SubjectTime: 'InsertSubjectTime',
	User: 'InsertUser',
};

export default function Insert() {
	const navigation = useNavigation<propsStack>();

	const handleNavigation = (route: string) => {
		navigation.navigate(routes[route]);
	};

	return (
		<View style={[styles.container, specificStyles.container]}>
			<Card position='center'>
				<View style={[styles.cardContainer, { marginVertical: 15, gap: 10 }]}>
					<Text style={styles.cardText}>Cadastros</Text>
					<Button
						text={'Estudante'}
						onPress={() => handleNavigation('Student')}
					/>
					<Button text={'Curso'} onPress={() => handleNavigation('Curso')} />
					<Button
						text={'Disciplina'}
						onPress={() => handleNavigation('Subject')}
					/>
					<Button
						text={'Horário'}
						onPress={() => handleNavigation('SubjectTime')}
					/>
					<Button text={'Usuário'} onPress={() => handleNavigation('User')} />
				</View>
			</Card>
		</View>
	);
}
